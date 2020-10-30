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
    defaultValue?: string
    help?: string
    info?: string
    size?: Sizes
    optional?: boolean
    disabled?: boolean
    hideIcon?: boolean

    formSync?: FormSync
}

export const SearchInput = (props: Props): JSX.Element => {
    const { label } = props
    return (
        <TextInput
            id={props.id}
            label={label}
            name={props.name ?? 'search'}
            type='search'
            placeholder={props.placeholder ?? 'Search'}
            defaultValue={props.defaultValue}
            help={props.help}
            info={props.info}
            size={props.size}
            disabled={props.disabled}
            prefix={props.hideIcon ? '' : <Search />}
            autoComplete='off'
            keyboard='search'
            optional
            hideOptionalLabel
            formSync={props.formSync}
        />
    )
}

export type SearchInput = ReturnType<typeof SearchInput>
