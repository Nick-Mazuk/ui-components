import type { ReactNode } from 'react'

import classNames from 'classnames'

import type { DropdownDivider } from './dropdown-divider'
import type { DropdownItem } from './dropdown-item'

type DropdownChildren = DropdownDivider | DropdownItem

type Props = {
    children: DropdownChildren | DropdownChildren[]
    item: ReactNode
    width?: string
    align?: 'left' | 'right'
}

// top-12 for small size

// top-16 for large size

export const NavbarDropdown = ({
    children,
    item,
    width = 'w-64',
    align = 'left',
}: Props): JSX.Element => {
    const dropdownClasses = classNames(
        'absolute group-hover:block overflow-hidden bg-white hidden shadow-lg rounded-b-lg border border-t-0 border-gray-50 top-12',
        width,
        { 'right-0': align === 'right' }
    )
    return (
        <div className='relative group self-stretch flex'>
            <div className={dropdownClasses}>{children}</div>
            <div className='flex items-center cursor-pointer pl-3'>{item}</div>
        </div>
    )
}
