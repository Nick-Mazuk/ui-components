import type { ReactNode } from 'react'

import classNames from 'classnames'

import { useNavbarContext } from '..'
import type { Color } from '../../header'
import { useHeaderContext } from '../../header'
import type { DropdownDivider } from './dropdown-divider'
import type { DropdownItem } from './dropdown-item'

type DropdownChildren = DropdownDivider | DropdownItem

type Props = {
    children: DropdownChildren | DropdownChildren[]
    item: ReactNode
    width?: string
    align?: 'left' | 'right'
}

const COLOR_MAP: Record<Color, string> = {
    white: 'bg-white border',
    dark: 'bg-gray-800',
    primary: 'bg-primary',
}

export const NavbarDropdown = ({
    children,
    item,
    width = 'w-64',
    align = 'left',
}: Props): JSX.Element => {
    const { size } = useNavbarContext()
    const { color } = useHeaderContext()
    const dropdownClasses = classNames(
        'absolute group-hover:block overflow-hidden hidden shadow-md rounded-b-lg border-t-0 border-gray-50',
        width,
        COLOR_MAP[color],
        {
            'right-0': align === 'right',
            'top-12': size === 'small',
            'top-16': size === 'default',
        }
    )
    return (
        <div className='relative group self-stretch flex'>
            <div className={dropdownClasses}>{children}</div>
            <div className='flex items-center cursor-pointer pl-3'>{item}</div>
        </div>
    )
}
