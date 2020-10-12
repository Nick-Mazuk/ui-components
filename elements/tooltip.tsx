import type { ReactNode } from 'react'

import classNames from 'classnames'

import { SIZE_MAP, WEIGHT_MAP } from './text'

type Colors = 'default' | 'white' | 'primary' | 'error' | 'warning' | 'success' | 'highlight'
type Positions = 'left' | 'right' | 'top' | 'bottom'

type Props = {
    children: ReactNode | ReactNode[]
    content: ReactNode | ReactNode[] | string
    invert?: boolean
    color?: Colors
    instant?: boolean
    center?: boolean
    position?: Positions
}

const POSITION_MAP: Record<Positions, string> = {
    top: 'bottom-full left-1/2 transform pb-4 -translate-x-1/2',
    bottom: 'top-full left-1/2 transform pt-4 -translate-x-1/2',
    left: 'right-full bottom-1/2 transform pr-4 translate-y-1/2',
    right: 'left-full bottom-1/2 transform pl-4 translate-y-1/2',
}

const COLOR_MAP: Record<Colors, string> = {
    default: 'text-white bg-gray-700',
    white: 'text-gray-900 bg-white',
    primary: 'text-white bg-primary',
    error: 'text-white bg-error',
    warning: 'text-white bg-warning-300',
    success: 'text-white bg-success',
    highlight: 'text-white bg-highlight',
}

export const Tooltip = ({
    children,
    content,
    color = 'default',
    center = false,
    position = 'top',
}: Props): JSX.Element => {
    const tooltipContainerClasses = classNames(
        'absolute',
        'z-40 hidden group-hover:inline-block group-focus:inline-block',
        POSITION_MAP[position]
    )

    const tooltipClasses = classNames(
        'w-content max-w-xs px-2 py-1 text-sm rounded shadow-lg',
        WEIGHT_MAP.semibold,
        SIZE_MAP.p.small,
        COLOR_MAP[color],
        {
            'text-center': center,
            'text-left': !center,
        }
    )

    return (
        <div
            className='relative inline-block cursor-default group focus:outline-none'
            style={{ lineHeight: 0 }}
            tabIndex={0}
            role='button'
        >
            <div className={tooltipContainerClasses}>
                <div className={tooltipClasses}>{content}</div>
            </div>
            <span className='inline-block'>{children}</span>
        </div>
    )
}

export type Tooltip = ReturnType<typeof Tooltip>
