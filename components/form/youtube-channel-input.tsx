import {
    isYouTubeVideoUrl,
    getYouTubeChannelId,
    isYouTubeChannelUrl,
    isYouTubeUrl,
} from '@nick-mazuk/lib/youtube'
import isURL from 'validator/lib/isURL'

import type { FormSync } from '.'
import type { Icon } from '../../elements/icon'
import { YouTube } from '../../elements/icon'
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

export const YouTubeChannelInput = (props: Props): JSX.Element => {
    const label = props.label ?? 'YouTube Channel'
    const icon = props.icon ?? <YouTube />
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
            requiredMessage={props.requiredMessage ?? `Enter a YouTube channel url`}
            successMessage={props.successMessage ?? ''}
            validationRules={[
                {
                    assert: (value: string) => isURL(value, { protocols: ['http', 'https'] }),
                    error: `Enter a valid url`,
                },
                {
                    assert: (value: string) => isYouTubeUrl(value),
                    error: 'Must be a YouTube url',
                },
                {
                    assert: (value: string) => !isYouTubeVideoUrl(value),
                    error: 'Cannot be a video url',
                },
                {
                    assert: (value: string) => isYouTubeChannelUrl(value),
                    error: 'Enter a valid channel url',
                },
            ]}
            parser={getYouTubeChannelId}
            keyboard='url'
            formSync={props.formSync}
        />
    )
}

export type YouTubeChannelInput = ReturnType<typeof YouTubeChannelInput>
