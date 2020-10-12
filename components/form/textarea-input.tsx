import type { FormSync } from '.'
import type { Sizes } from './helpers/text-input-base'
import type { Formatter, Parser, Progress, Updater, ValidationRules } from './text-input'
import { TextInput } from './text-input'

type Props = {
    children?: never
    label?: string
    name?: string
    id?: string

    placeholder?: string
    size?: Sizes
    optional?: boolean
    disabled?: boolean
    readonly?: boolean
    defaultValue?: string

    successMessage?: string
    requiredMessage?: string
    onUpdate?: Updater
    validationRules?: ValidationRules
    parser?: Parser
    formatter?: Formatter
    progress?: Progress

    formSync?: FormSync
}

export const TextAreaInput = (props: Props): JSX.Element => {
    return (
        <TextInput
            id={props.id}
            label={props.label ?? 'Content'}
            name={props.name}
            type='textarea'
            placeholder={props.placeholder}
            size={props.size}
            optional={props.optional}
            readonly={props.readonly}
            disabled={props.disabled}
            autoComplete='off'
            successMessage={props.successMessage}
            requiredMessage={props.requiredMessage}
            onUpdate={props.onUpdate}
            validationRules={props.validationRules}
            parser={props.parser}
            formatter={props.formatter}
            progress={props.progress}
            formSync={props.formSync}
            defaultValue={props.defaultValue}
        />
    )
}

export type TextAreaInput = ReturnType<typeof TextAreaInput>
