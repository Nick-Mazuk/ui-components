import type { AnchorHTMLAttributes, ReactNode } from 'react'

import classNames from 'classnames'

import NextLink from 'next/link'

import { WEIGHT_MAP } from './text'

type Props = {
    href: string
    children: ReactNode | ReactNode[]
    title?: string
    className?: string
    onClick?: () => void
    styled?: boolean
    download?: boolean
    newTab?: boolean
}

const getStyles = (styled: boolean): string => {
    if (styled) return `${WEIGHT_MAP.bold} text-link`
    return ''
}

export const Link = ({
    href,
    children,
    title = '',
    className = '',
    onClick,
    styled = false,
    download = false,
    newTab = false,
}: Props): JSX.Element => {
    const classes = classNames(className, getStyles(styled))
    const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
        title: title,
        className: classes,
        download: download,
    }
    if (onClick) {
        anchorProps.onClick = onClick
        anchorProps.onKeyPress = (event: React.KeyboardEvent): void => {
            if (event.key === 'enter') onClick()
        }
    }
    if (newTab) {
        anchorProps.target = '_blank'
        anchorProps.rel = 'noreferrer'
    }

    return (
        <NextLink href={href}>
            <a {...anchorProps}>{children}</a>
        </NextLink>
    )
}

export type Link = ReturnType<typeof Link>
