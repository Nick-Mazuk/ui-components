import type { ReactNode } from 'react'

import classNames from 'classnames'

// eslint-disable-next-line import/exports-last -- going to be used by most navbar items
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'none'

type Props = {
    children: ReactNode | ReactNode[]
    breakpoint?: Breakpoint
}

const BREAKPOINT_MAP: Record<Breakpoint, string> = {
    none: '',
    sm: 'hidden sm:block',
    md: 'hidden md:block',
    lg: 'hidden lg:block',
    xl: 'hidden xl:block',
}

export const NavbarItemWrapper = ({ breakpoint = 'sm', children }: Props): JSX.Element => {
    const classes = classNames('flex self-stretch items-stretch', BREAKPOINT_MAP[breakpoint])

    return <div className={classes}>{children}</div>
}
export type NavbarItemWrapper = ReturnType<typeof NavbarItemWrapper>
