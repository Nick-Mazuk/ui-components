import type { ReactNode } from 'react'

import classNames from 'classnames'

// eslint-disable-next-line import/exports-last -- going to be used by most navbar items
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'none'

type Props = {
    children: ReactNode | ReactNode[]
    breakpoint?: Breakpoint
}

const BREAKPOINT_MAP: Record<Breakpoint, string> = {
    none: 'flex',
    sm: 'hidden sm:flex',
    md: 'hidden md:flex',
    lg: 'hidden lg:flex',
    xl: 'hidden xl:flex',
}

export const NavbarItemWrapper = ({ breakpoint = 'sm', children }: Props): JSX.Element => {
    const classes = classNames('self-stretch items-center', BREAKPOINT_MAP[breakpoint])

    return <div className={classes}>{children}</div>
}
export type NavbarItemWrapper = ReturnType<typeof NavbarItemWrapper>
