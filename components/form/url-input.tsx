import isEmail from 'validator/lib/isEmail'
import isURL from 'validator/lib/isURL'

import type { FormSync } from '.'
import type { Icon } from '../../elements/icon'
import { Url } from '../../elements/icon'
import type { Sizes } from './helpers/text-input-base'
import { TextInput } from './text-input'

type Props = {
    children?: never
    label?: string
    name?: string
    id?: string

    placeholder?: string
    defaultValue?: string
    size?: Sizes
    optional?: boolean
    readonly?: boolean
    disabled?: boolean
    icon?: Icon

    hideIcon?: boolean
    requiredMessage?: string
    disableAutocomplete?: boolean

    formSync?: FormSync
}

export const UrlInput = (props: Props): JSX.Element => {
    const label = props.label ?? 'URL'
    const icon = props.icon ?? <Url />
    return (
        <TextInput
            id={props.id}
            label={label}
            name={props.name}
            type='url'
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            size={props.size}
            optional={props.optional}
            readonly={props.readonly}
            disabled={props.disabled}
            prefix={props.hideIcon === true ? '' : icon}
            successMessage='URL looks valid'
            requiredMessage={props.requiredMessage ?? `Enter a ${label}`}
            validationRules={[
                {
                    assert: (value: string) => isURL(value, { protocols: ['http', 'https'] }),
                    error: `Enter a valid ${label}`,
                },
                { assert: (value: string) => !isEmail(value), error: 'Cannot be an email' },
            ]}
            autoComplete={props.disableAutocomplete ? '' : 'url'}
            keyboard='url'
            formSync={props.formSync}
        />
    )
}

export type UrlInput = ReturnType<typeof UrlInput>
