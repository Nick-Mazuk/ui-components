import type { ReactNode } from 'react'
import { useCallback, useState } from 'react'

// eslint-disable-next-line import/exports-last -- used by other components
export type WithClickCallback = (
    event:
        | React.MouseEvent<HTMLDivElement | HTMLButtonElement | HTMLSpanElement>
        | React.KeyboardEvent<HTMLDivElement | HTMLButtonElement | HTMLSpanElement>
) => void

type Props = {
    children: ReactNode | ReactNode[]
    onClick: WithClickCallback
    name: string
    tabIndex?: number
    key?: string
    role?: string
    className?: string
    as?: 'span' | 'div' | 'button'
}

export const WithClick = ({
    children,
    onClick,
    name,
    tabIndex = 0,
    key = 'Enter',
    role = 'button',
    className = '',
    as = 'button',
}: Props): JSX.Element => {
    const [mouseIsDown, setMouseIsDown] = useState(false)
    const Tag = as

    const handleKeyPress = useCallback(
        (event) => {
            if (event.key === key) onClick(event)
        },
        [onClick, key]
    )
    const handleFocus = useCallback(
        (event) => {
            if (mouseIsDown) event.currentTarget.blur()
        },
        [mouseIsDown]
    )
    const handleMouseDown = useCallback(() => setMouseIsDown(true), [])
    const handleMouseUp = useCallback(() => setMouseIsDown(false), [])

    return (
        <Tag
            onClick={onClick}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            role={role}
            tabIndex={tabIndex}
            className={className}
            aria-label={name}
            // eslint-disable-next-line no-undefined -- necessary
            type={Tag === 'button' ? 'button' : undefined}
        >
            {children}
        </Tag>
    )
}
