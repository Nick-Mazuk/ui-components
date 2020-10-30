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
    help?: string
    info?: string
    size?: Sizes
    optional?: boolean
    hideOptionalLabel?: boolean
    readonly?: boolean
    disabled?: boolean
    icon?: Icon

    hideIcon?: boolean
    requiredMessage?: string
    successMessage?: string
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
            help={props.help}
            info={props.info}
            size={props.size}
            optional={props.optional}
            hideOptionalLabel={props.hideOptionalLabel}
            readonly={props.readonly}
            disabled={props.disabled}
            prefix={props.hideIcon ? '' : icon}
            requiredMessage={props.requiredMessage ?? `Enter a ${label}`}
            successMessage={props.successMessage ?? ''}
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
