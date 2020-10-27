import { isYouTubeVideoUrl, getYouTubeVideoId } from '@nick-mazuk/lib/youtube'
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

export const YouTubeVideoInput = (props: Props): JSX.Element => {
    const label = props.label ?? 'YouTube Video'
    const icon = props.icon ?? <YouTube />
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
            requiredMessage={props.requiredMessage ?? `Enter a YouTube video url`}
            validationRules={[
                {
                    assert: (value: string) => isURL(value, { protocols: ['http', 'https'] }),
                    error: `Enter a valid url`,
                },
                {
                    assert: (value: string) => !isYouTubeVideoUrl(value),
                    error: 'Enter a valid video url',
                },
            ]}
            parser={getYouTubeVideoId}
            keyboard='url'
            formSync={props.formSync}
        />
    )
}

export type YouTubeVideoInput = ReturnType<typeof YouTubeVideoInput>
