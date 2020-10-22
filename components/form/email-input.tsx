import isEmail from 'validator/lib/isEmail'
import normalizeEmail from 'validator/lib/normalizeEmail'

import type { FormSync } from '.'
import { Mail } from '../../elements/icon'
import type { Sizes } from './helpers/text-input-base'
import { TextInput } from './text-input'

type Props = {
    children?: never
    label?: string
    name?: string
    id?: string

    placeholder?: string
    defaultValue?: string
    help?: string
    size?: Sizes
    optional?: boolean
    readonly?: boolean
    disabled?: boolean

    hideIcon?: boolean
    requiredMessage?: string
    disableAutocomplete?: boolean

    formSync?: FormSync
}

const parser = (email: string): string => {
    if (!isEmail(email)) return email
    /* eslint-disable camelcase -- 3rd-party api */
    const parsedEmail = normalizeEmail(email, {
        gmail_lowercase: true,
        outlookdotcom_lowercase: true,
        yahoo_lowercase: true,
        icloud_lowercase: true,
        all_lowercase: false,
    })
    /* eslint-enable camelcase -- 3rd-party api */
    if (parsedEmail) return parsedEmail
    return email
}

export const EmailInput = (props: Props): JSX.Element => {
    return (
        <TextInput
            id={props.id}
            label={props.label ?? 'Email'}
            name={props.name}
            type='text'
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            help={props.help}
            size={props.size}
            optional={props.optional}
            readonly={props.readonly}
            disabled={props.disabled}
            prefix={props.hideIcon === true ? '' : <Mail />}
            requiredMessage={props.requiredMessage ?? 'Enter your email'}
            validationRules={[
                {
                    assert: (value: string) => isEmail(value),
                    error: 'Email is invalid. Enter a valid email.',
                },
            ]}
            parser={parser}
            autoComplete={props.disableAutocomplete ? '' : 'email'}
            keyboard='email'
            formSync={props.formSync}
        />
    )
}

export type EmailInput = ReturnType<typeof EmailInput>
