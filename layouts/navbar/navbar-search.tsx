import classNames from 'classnames'

import { Search } from '../../elements/icon'
import type { Color } from '../header'
import { useHeaderContext } from '../header'

type Props = {
    placeholder?: string
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

export const NavbarSearch = ({ placeholder }: Props): JSX.Element => {
    const { color } = useHeaderContext()
    const wrapperClasses = classNames(
        'rounded flex items-center transition-color duration-150',
        COLOR_MAP[color].wrapper
    )
    const inputClasses = classNames(
        'outline-none bg-transparent py-2 text-sm pr-3 w-64',
        COLOR_MAP[color].input
    )
    return (
        <div className='px-3'>
            <div className={wrapperClasses}>
                <span className='pl-2 mx-1 pr-1'>
                    <Search width='w-4' />
                </span>
                <input type='text' className={inputClasses} placeholder={placeholder ?? 'Search'} />
            </div>
        </div>
    )
}

export type NavbarSearch = ReturnType<typeof NavbarSearch>
