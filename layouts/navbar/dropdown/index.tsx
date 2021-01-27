import type { ReactNode } from 'react'

import classNames from 'classnames'

import { useNavbarContext } from '..'
import type { Color } from '../../header'
import { useHeaderContext } from '../../header'

type Props = {
    children: ReactNode | ReactNode[]
    item: ReactNode
    width?: string
    align?: 'left' | 'right'
    fullWidth?: boolean
    isVisible?: boolean
}

const COLOR_MAP: Record<Color, string> = {
    white: 'bg-white border border-gray-50',
    dark: 'bg-gray-800',
    primary: 'bg-primary',
}

export const NavbarDropdown = ({
    children,
    item,
    width = 'w-64',
    align = 'left',
    fullWidth = false,
    isVisible,
}: Props): JSX.Element => {
    const { size } = useNavbarContext()
    const { color } = useHeaderContext()
    const containerClasses = classNames('group self-stretch flex', { relative: !fullWidth })
    const dropdownClasses = classNames(
        'absolute shadow-md overflow-hidden rounded-b-lg border-t-0',
        fullWidth ? '' : width,
        COLOR_MAP[color],
        {
            'right-0': align === 'right' && !fullWidth,
            'top-12': size === 'small',
            'top-16': size === 'default',
            'left-0 right-0': fullWidth,
            'group-hover:block hidden': typeof isVisible === 'undefined',
            block: isVisible === true,
            hidden: isVisible === false,
        }
    )
    return (
        <div className={containerClasses}>
            <div className={dropdownClasses}>{children}</div>
            <div className='flex items-center cursor-pointer'>{item}</div>
        </div>
    )
}
