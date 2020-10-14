import { parseFullName } from 'parse-full-name'

import type { FormSync } from '.'
import { User } from '../../elements/icon'
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

    hideIcon?: boolean
    requiredMessage?: string

    formSync?: FormSync
}

const parser = (name: string): Record<string, string> | string => {
    const parsedName = parseFullName(name)
    if (parsedName.error?.length !== 0) return name
    return {
        title: parsedName.title ?? '',
        first: parsedName.first ?? '',
        middle: parsedName.middle ?? '',
        last: parsedName.last ?? '',
        nick: parsedName.nick ?? '',
        suffix: parsedName.suffix ?? '',
        full: name,
    }
}

export const NameInput = (props: Props): JSX.Element => {
    return (
        <TextInput
            id={props.id}
            label={props.label ?? 'Full name'}
            name={props.name}
            type='text'
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            size={props.size}
            optional={props.optional}
            readonly={props.readonly}
            disabled={props.disabled}
            prefix={props.hideIcon === true ? '' : <User />}
            requiredMessage={props.requiredMessage ?? 'Enter your name'}
            parser={parser}
            formSync={props.formSync}
        />
    )
}

export type NameInput = ReturnType<typeof NameInput>