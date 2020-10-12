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
    size?: Sizes
    optional?: boolean
    readonly?: boolean
    disabled?: boolean

    hideIcon?: boolean
    requiredMessage?: string
    disableAutocomplete?: boolean

    formSync?: FormSync
}

export const PasswordInput = (props: Props): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword])
    return (
        <TextInput
            id={props.id}
            label={props.label ?? 'Password'}
            name={props.name}
            type={showPassword ? 'text' : 'password'}
            placeholder={props.placeholder}
            size={props.size}
            optional={props.optional}
            readonly={props.readonly}
            disabled={props.disabled}
            prefix={props.hideIcon === true ? '' : <Lock />}
            suffix={showPassword ? <EyeOff /> : <Eye />}
            suffixOnClick={toggleShowPassword}
            requiredMessage={props.requiredMessage ?? 'Enter your password'}
            autoComplete={props.disableAutocomplete ? '' : 'current-password'}
            formSync={props.formSync}
        />
    )
}

export type PasswordInput = ReturnType<typeof PasswordInput>
