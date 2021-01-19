import { useCallback } from 'react'

import type { FormSync } from '.'
import { Refresh, Search } from '../../elements/icon'
import { TextInput } from './text-input'
import type { Sizes } from './text-input-helpers/text-input-base'

export type Props = {
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

    maxCharacters?: number
    suggestions?: string[]

    isSearching?: boolean

    onChange?: (value: string) => void

    formSync?: FormSync
}

export const SearchInput = (props: Props): JSX.Element => {
    const { label, onChange } = props

    const handleUpdate = useCallback(
        (value: string) => {
            if (onChange) onChange(value)
            return value
        },
        [onChange]
    )

    const icon = props.isSearching ? (
        <div className='animate-spin'>
            <Refresh />
        </div>
    ) : (
        <Search />
    )

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
            prefix={props.hideIcon ? '' : icon}
            suggestions={props.suggestions}
            autoComplete='off'
            keyboard='search'
            optional
            hideOptionalLabel
            onUpdate={handleUpdate}
            maxCharacters={props.maxCharacters}
            formSync={props.formSync}
        />
    )
}

export type SearchInput = ReturnType<typeof SearchInput>
