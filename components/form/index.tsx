import type { ReactNode } from 'react'
import { useCallback, useMemo, useRef, useState } from 'react'

import HCaptcha from '@hcaptcha/react-hcaptcha'
import type { Node } from 'slate/dist/interfaces/node'

type State = 'ready' | 'submitted' | 'submitting' | 'error'

// eslint-disable-next-line import/exports-last -- used in many input component files
export type FormDataValue = string | Record<string, string> | Node[]

/* eslint-disable import/exports-last -- used in text-input component */
export type ClearFunction = () => void
export type ValidateFunction = (newValue?: string) => boolean
/* eslint-enable import/exports-last -- used in text-input component */

// validate: unknown; clear: unknown;
type FormDataObject = {
    data: FormDataValue
    validate: ValidateFunction
    clear: ClearFunction
}

type FormData = Record<string, FormDataObject>

type UpdateForm = (
    name: string,
    data: FormDataValue,
    validate: ValidateFunction,
    clear: ClearFunction
) => void

type HandleSubmit = (data: Record<string, FormDataValue>) => void

// eslint-disable-next-line import/exports-last -- used in every input component file
export type FormSync = {
    state: State
    updateForm: UpdateForm
}

type Methods = 'post' | 'get'

type SubmitResponse = {
    data: Record<string, FormDataValue>
    response: Record<string, unknown>
    status: number
}

type OnError = (error: unknown) => void
type OnSuccess = (response: SubmitResponse) => void

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

const clearInputs = (formData: FormData): void => {
    for (const inputName in formData)
        if (Object.prototype.hasOwnProperty.call(formData, inputName)) formData[inputName].clear()
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

const submitForm = (
    formData: FormData,
    onSuccess: OnSuccess,
    onError: OnError,
    method?: Methods,
    action?: string,
    handleSubmit?: HandleSubmit,
    token?: string
): void => {
    const data: Record<string, FormDataValue> = {}
    for (const inputName in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, inputName))
            data[inputName] = formData[inputName].data
    }
    if (token) data.captchaToken = token
    if (method && action) {
        fetch(action, {
            method: method,
            body: JSON.stringify(data),
        })
            .then(async (response) => {
                const json = await response.json()
                onSuccess({ response: json, status: response.status, data: data })
                return { data: json, status: response.status }
            })
            .catch((error) => {
                onError(error)
            })
    } else if (handleSubmit) {
        handleSubmit(data)
    }
}

// eslint-disable-next-line max-lines-per-function -- long because it has several short hooks
export const Form = (props: Props): JSX.Element => {
    const [state, setState] = useState<State>('ready')
    // eslint-disable-next-line unicorn/no-null -- null necessary
    const hcaptcha = useRef<any>(null)
    const formData: FormData = useMemo(() => {
        return {}
    }, [])

    const { onSuccess, onError } = props

    const updateForm: UpdateForm = useCallback(
        (name, data, validate, clear) => {
            formData[name] = { data: data, validate: validate, clear: clear }
            setState('ready')
        },
        [formData]
    )

    const handleSuccessfulSubmit = useCallback(
        (data: SubmitResponse): void => {
            setState('submitted')
            clearInputs(formData)
            if (onSuccess) onSuccess(data)
        },
        [formData, onSuccess]
    )

    const handleErrorSubmit = useCallback(
        (error: unknown) => {
            setState('error')
            if (onError) onError(error)
        },
        [onError]
    )

    const handleSubmit = useCallback(
        (event?: React.FormEvent<HTMLFormElement>): void => {
            event?.preventDefault()
            const canSubmit = validateInputs(formData)
            if (canSubmit) {
                setState('submitting')
                if (props.captcha && event && process.env.NODE_ENV === 'production') {
                    hcaptcha.current?.execute()
                    return
                }
                submitForm(
                    formData,
                    handleSuccessfulSubmit,
                    handleErrorSubmit,
                    props.method,
                    props.action,
                    props.handleSubmit
                )
            }
        },
        [
            formData,
            handleErrorSubmit,
            handleSuccessfulSubmit,
            props.action,
            props.captcha,
            props.handleSubmit,
            props.method,
        ]
    )

    const handleSubmitWithToken = useCallback(
        (token: string) => {
            setState('submitting')
            submitForm(
                formData,
                handleSuccessfulSubmit,
                handleErrorSubmit,
                props.method,
                props.action,
                props.handleSubmit,
                token
            )
        },
        [
            formData,
            handleErrorSubmit,
            handleSuccessfulSubmit,
            props.action,
            props.handleSubmit,
            props.method,
        ]
    )

    return (
        <form method={props.method} action={props.action} onSubmit={handleSubmit} noValidate>
            {props.children({ state, updateForm })}
            {props.captcha && process.env.NODE_ENV === 'production' && (
                <HCaptcha
                    sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY ?? ''}
                    size='invisible'
                    id={props.captcha}
                    ref={hcaptcha}
                    onVerify={handleSubmitWithToken}
                    onError={handleErrorSubmit}
                />
            )}
        </form>
    )
}
