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
    callback: WithClickCallback
    tabIndex?: number
    key?: string
    role?: string
    className?: string
    as?: 'span' | 'div' | 'button'
}

export const WithClick = ({
    children,
    callback,
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
            if (event.key === key) callback(event)
        },
        [callback, key]
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
            onClick={callback}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            role={role}
            tabIndex={tabIndex}
            className={className}
            type='button'
        >
            {children}
        </Tag>
    )
}
