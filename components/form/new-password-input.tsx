import { useCallback, useState } from 'react'

import type { FormSync } from '.'
import { Eye, EyeOff, Lock } from '../../elements/icon'
import type { Sizes } from './helpers/text-input-base'
import { TextInput } from './text-input'

type Props = {
    children?: never
    label?: string
    name?: string
    id?: string

    placeholder?: string
    help?: string
    info?: string
    size?: Sizes
    optional?: boolean
    hideOptionalLabel?: boolean
    readonly?: boolean
    disabled?: boolean

    hideIcon?: boolean
    requiredMessage?: string
    successMessage?: string
    disableAutocomplete?: boolean

    formSync?: FormSync
}

export const NewPasswordInput = (props: Props): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword])
    return (
        <TextInput
            id={props.id}
            label={props.label ?? 'Password'}
            name={props.name}
            type={showPassword ? 'text' : 'password'}
            placeholder={props.placeholder}
            help={props.help}
            info={props.info}
            size={props.size}
            optional={props.optional}
            hideOptionalLabel={props.hideOptionalLabel}
            readonly={props.readonly}
            disabled={props.disabled}
            prefix={props.hideIcon ? '' : <Lock />}
            suffix={showPassword ? <EyeOff /> : <Eye />}
            suffixOnClick={toggleShowPassword}
            requiredMessage={props.requiredMessage ?? 'Enter your password'}
            successMessage={props.successMessage ?? ''}
            autoComplete={props.disableAutocomplete ? '' : 'new-password'}
            formSync={props.formSync}
        />
    )
}

export type NewPasswordInput = ReturnType<typeof NewPasswordInput>
