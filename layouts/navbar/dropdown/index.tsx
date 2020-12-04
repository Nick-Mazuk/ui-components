import type { ReactNode } from 'react'

import classNames from 'classnames'

import { useNavbarContext } from '..'
import type { DropdownDivider } from './dropdown-divider'
import type { DropdownItem } from './dropdown-item'

type DropdownChildren = DropdownDivider | DropdownItem

type Props = {
    children: DropdownChildren | DropdownChildren[]
    item: ReactNode
    width?: string
    align?: 'left' | 'right'
}

export const NavbarDropdown = ({
    children,
    item,
    width = 'w-64',
    align = 'left',
}: Props): JSX.Element => {
    const { size } = useNavbarContext()
    const dropdownClasses = classNames(
        'absolute group-hover:block overflow-hidden bg-white hidden shadow-md rounded-b-lg border border-t-0 border-gray-50',
        width,
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
