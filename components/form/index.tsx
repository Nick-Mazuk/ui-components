import type { Dispatch, MutableRefObject, ReactNode, SetStateAction } from 'react'
import { useMemo, useCallback, useRef, useState } from 'react'

import HCaptcha from '@hcaptcha/react-hcaptcha'

type State = 'ready' | 'submitted' | 'submitting' | 'error'

/* eslint-disable import/exports-last -- used in many inputs */
export type FormDataValue = string | Record<string, string> | boolean | string[]
export type ClearFunction = () => void
export type ValidateFunction = ((newValue?: string) => boolean) | (() => boolean)
/* eslint-enable import/exports-last -- used in many inputs */

type FormDataObject = {
    data: FormDataValue
    validate: ValidateFunction
    clear: ClearFunction
}

type FormData = Record<string, FormDataObject>
type PublicFormData = Record<string, FormDataValue>

type UpdateForm = (
    name: string,
    data: FormDataValue,
    validate: ValidateFunction,
    clear: ClearFunction
) => void

// eslint-disable-next-line import/exports-last -- used in production for form submit functions
export type HandleSubmit = (data: PublicFormData) => Promise<boolean>

type Methods = 'post' | 'get'

type SubmitResponse = {
    data: PublicFormData
    response?: Record<string, unknown>
    status?: number
}

type OnError = (error: unknown) => void
type OnSuccess = (response?: SubmitResponse) => void

// eslint-disable-next-line import/exports-last -- used in every input component file
export type FormSync = {
    state: State
    updateForm: UpdateForm
    data: PublicFormData
}

type Props = {
    children: (formSync: FormSync) => ReactNode | ReactNode[]
    method?: Methods
    action?: string
    clearOnSubmit?: boolean
    onError?: OnError
    onSuccess?: OnSuccess
    captcha?: string
    handleSubmit?: HandleSubmit
}

const createPublicFormData = (formData: FormData): PublicFormData => {
    const publicFormData: PublicFormData = {}
    for (const inputName in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, inputName))
            publicFormData[inputName] = formData[inputName].data
    }
    return publicFormData
}

const clearInputs = (
    formData: FormData,
    setPublicFormData: Dispatch<SetStateAction<Record<string, FormDataValue>>>
): void => {
    for (const inputName in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, inputName)) {
            formData[inputName].clear()
            formData[inputName].data = ''
        }
    }
    setPublicFormData(createPublicFormData(formData))
}

const validateInputs = (formData: FormData): boolean => {
    let allInputsValid = true
    for (const inputName in formData) {
        if (
            Object.prototype.hasOwnProperty.call(formData, inputName) &&
            !formData[inputName].validate()
        )
            allInputsValid = false
    }
    return allInputsValid
}

const formatDataForSubmit = (formData: FormData, token?: string): PublicFormData => {
    const data: PublicFormData = {}
    for (const inputName in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, inputName))
            data[inputName] = formData[inputName].data
    }
    if (token) data.captchaToken = token
    return data
}

const successfulSubmit = (
    props: Props,
    setState: Dispatch<SetStateAction<State>>,
    formData: FormData,
    setPublicFormData: Dispatch<SetStateAction<Record<string, FormDataValue>>>,
    data?: SubmitResponse
) => {
    setState('submitted')
    if (props.clearOnSubmit) clearInputs(formData, setPublicFormData)
    if (props.onSuccess) props.onSuccess(data)
}

const errorSubmit = (props: Props, error: unknown, setState: Dispatch<SetStateAction<State>>) => {
    setState('error')
    if (props.onError) props.onError(error)
}

const handleCustomSubmit = async (
    props: Props,
    data: PublicFormData,
    setState: Dispatch<SetStateAction<State>>,
    formData: FormData,
    setPublicFormData: Dispatch<SetStateAction<Record<string, FormDataValue>>>
) => {
    if (!props.handleSubmit) return
    const success = await props.handleSubmit(data)
    if (success) successfulSubmit(props, setState, formData, setPublicFormData)
    else errorSubmit(props, '', setState)
}

const handleInternalSubmit = (
    props: Props,
    data: PublicFormData,
    setState: Dispatch<SetStateAction<State>>,
    formData: FormData,
    setPublicFormData: Dispatch<SetStateAction<Record<string, FormDataValue>>>
) => {
    if (!props.action || !props.method) return
    fetch(props.action, {
        method: props.method,
        body: JSON.stringify(data),
    })
        .then(async (response) => {
            const json = await response.json()
            successfulSubmit(props, setState, formData, setPublicFormData, {
                response: json,
                status: response.status,
                data: data,
            })
            return { data: json, status: response.status }
        })
        .catch((error) => {
            errorSubmit(props, error, setState)
        })
}

const onSubmit = (
    props: Props,
    formData: FormData,
    hcaptcha: MutableRefObject<HCaptcha | null>,
    setState: Dispatch<SetStateAction<State>>,
    setPublicFormData: Dispatch<SetStateAction<Record<string, FormDataValue>>>,
    options: {
        event?: React.FormEvent<HTMLFormElement>
        token?: string
    }
) => {
    options.event?.preventDefault()

    const canSubmit = validateInputs(formData)
    if (!canSubmit) return
    setState('submitting')
    if (hcaptcha.current && options.event && process.env.NODE_ENV === 'production') {
        hcaptcha.current.execute()
        return
    }
    const data = formatDataForSubmit(formData, options.token)
    if (props.handleSubmit) handleCustomSubmit(props, data, setState, formData, setPublicFormData)
    else if (props.method && props.action)
        handleInternalSubmit(props, data, setState, formData, setPublicFormData)
    else setState('ready')
}

export const Form = (props: Props): JSX.Element => {
    const [state, setState] = useState<State>('ready')
    const captchaRef = useRef<HCaptcha>(null)
    const [publicFormData, setPublicFormData] = useState<PublicFormData>({})
    const formData: FormData = useMemo(() => {
        return {}
    }, [])

    const updateForm: UpdateForm = useCallback(
        (name, data, validate, clear) => {
            formData[name] = { data: data, validate: validate, clear: clear }
            setPublicFormData(createPublicFormData(formData))
            setState('ready')
        },
        [formData]
    )

    return (
        <form
            method={props.method}
            action={props.action}
            onSubmit={(event) => {
                onSubmit(props, formData, captchaRef, setState, setPublicFormData, { event: event })
            }}
            noValidate
        >
            {props.children({
                state,
                updateForm,
                data: publicFormData,
            })}
            {props.captcha && process.env.NODE_ENV === 'production' && (
                <HCaptcha
                    sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY ?? ''}
                    size='invisible'
                    id={props.captcha}
                    ref={captchaRef}
                    onVerify={(token) => {
                        onSubmit(props, formData, captchaRef, setState, setPublicFormData, {
                            token: token,
                        })
                    }}
                    onError={(event) => {
                        errorSubmit(props, event, setState)
                    }}
                />
            )}
        </form>
    )
}
