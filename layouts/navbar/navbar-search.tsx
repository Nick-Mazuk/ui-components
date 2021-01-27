import type { ChangeEvent, ReactNode } from 'react'
import { useState } from 'react'

import classNames from 'classnames'

import { Search } from '../../elements/icon'
import type { Color } from '../header'
import { useHeaderContext } from '../header'
import { NavbarDropdown } from './dropdown'
import type { Breakpoint } from './navbar-item-wrapper'
import { NavbarItemWrapper } from './navbar-item-wrapper'

type Props = {
    children: ReactNode | ReactNode[]
    placeholder?: string
    breakpoint?: Breakpoint
    fullWidthResults?: boolean
    onChange?: (value: string) => void
    name?: string
}

type ElementColors = {
    wrapper: string
    input: string
}

const COLOR_MAP: Record<Color, ElementColors> = {
    white: {
        wrapper: 'bg-gray-30 text-gray-500 focus-within:text-gray-900',
        input: 'placeholder-gray-500',
    },
    dark: {
        wrapper: 'bg-gray-700 text-gray-200 focus-within:text-white',
        input: 'placeholder-gray-200',
    },
    primary: {
        wrapper: 'bg-primary-600 text-primary-100 focus-within:text-white',
        input: 'placeholder-primary-100',
    },
}

export const NavbarSearch = ({
    placeholder,
    breakpoint,
    children,
    fullWidthResults,
    onChange,
    name,
}: Props): JSX.Element => {
    const [isFocused, setIsFocused] = useState(false)
    const { color } = useHeaderContext()
    const wrapperClasses = classNames(
        'rounded flex items-center transition-color duration-150',
        COLOR_MAP[color].wrapper
    )
    const inputClasses = classNames(
        'outline-none bg-transparent py-2 text-sm pr-3 w-64',
        COLOR_MAP[color].input
    )
    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(event.target.value)
    }
    return (
        <NavbarDropdown
            item={
                <NavbarItemWrapper breakpoint={breakpoint}>
                    <div className={wrapperClasses}>
                        <span className='pl-2 mx-1 pr-1'>
                            <Search width='w-4' />
                        </span>
                        <input
                            type='text'
                            name={name ?? 'site-search'}
                            className={inputClasses}
                            placeholder={placeholder ?? 'Search'}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                    </div>
                </NavbarItemWrapper>
            }
            isVisible={isFocused}
            fullWidth={fullWidthResults}
        >
            {children}
        </NavbarDropdown>
    )
}

export type NavbarSearch = ReturnType<typeof NavbarSearch>
