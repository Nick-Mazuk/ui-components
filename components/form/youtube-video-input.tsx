import { useCallback } from 'react'

import {
    isYouTubeVideoUrl,
    getYouTubeVideoId,
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

    onChange?: (value: string) => void

    formSync?: FormSync
}

const validationRules = [
    {
        assert: (value: string) => isURL(value, { protocols: ['http', 'https'] }),
        error: `Enter a valid url`,
    },
    {
        assert: (value: string) => isYouTubeUrl(value),
        error: 'Must be a YouTube url',
    },
    {
        assert: (value: string) => !isYouTubeChannelUrl(value),
        error: 'Cannot be a channel url',
    },
    {
        assert: (value: string) => isYouTubeVideoUrl(value),
        error: 'Enter a valid video url',
    },
]

export const YouTubeVideoInput = (props: Props): JSX.Element => {
    const label = props.label ?? 'YouTube video'
    const icon = props.icon ?? <YouTube />

    const { onChange } = props
    const handleChange = useCallback(
        (value: string): string => {
            if (onChange) onChange(value)
            return value
        },
        [onChange]
    )
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
            requiredMessage={props.requiredMessage ?? `Enter a YouTube video url`}
            successMessage={props.successMessage ?? ''}
            validationRules={validationRules}
            parser={getYouTubeVideoId}
            onUpdate={handleChange}
            keyboard='url'
            formSync={props.formSync}
        />
    )
}

export type YouTubeVideoInput = ReturnType<typeof YouTubeVideoInput>
