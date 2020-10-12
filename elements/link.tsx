import type { ReactNode } from 'react'

import classNames from 'classnames'

import Link from 'next/link'

import { WEIGHT_MAP } from './text'

type Properties = {
    href: string
    children: ReactNode | ReactNode[]
    title?: string
    className?: string
    onClick?: () => void
    styled?: boolean
    download?: boolean
}

const getStyles = (styled: boolean): string => {
    if (styled) return `${WEIGHT_MAP.bold} text-link`
    return ''
}

const Linker = ({
    href,
    children,
    title = '',
    className = '',
    onClick,
    styled = false,
    download = false,
}: Properties): JSX.Element => {
    const classes = classNames(className, getStyles(styled))
    const anchorProperties: Record<string, unknown> = {
        title: title,
        className: classes,
        download: download,
    }
    if (onClick) {
        anchorProperties.onClick = onClick
        anchorProperties.onKeyPress = (event: React.KeyboardEvent): void => {
            if (event.key === 'enter') onClick()
        }
    }

    return (
        <Link href={href}>
            <a {...anchorProperties}>{children}</a>
        </Link>
    )
}

export { Linker as Link }

export type LinkType = ReturnType<typeof Linker>
