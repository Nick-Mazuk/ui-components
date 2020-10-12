import type { FormSync } from '.'
import { Search } from '../../elements/icon'
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
    disabled?: boolean

    formSync?: FormSync
}

export const SearchInput = (props: Props): JSX.Element => {
    const { label } = props
    return (
        <TextInput
            id={props.id}
            label={label}
            name={props.name}
            type='search'
            placeholder={props.placeholder ?? 'Search'}
            size={props.size}
            disabled={props.disabled}
            prefix={<Search />}
            autoComplete='off'
            keyboard='search'
            optional
            hideOptionalLabel
            formSync={props.formSync}
        />
    )
}

export type SearchInput = ReturnType<typeof SearchInput>
