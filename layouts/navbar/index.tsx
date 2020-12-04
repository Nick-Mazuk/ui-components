import type { ReactNode } from 'react'
import { useContext, createContext, useCallback, useState } from 'react'

import classNames from 'classnames'

import type { BrandProps } from './helpers/brand'
import { Brand } from './helpers/brand'
import { Hamburger } from './helpers/hamburger'
import { JumpToContent } from './helpers/jump-to-content'
import { MobileContainer } from './helpers/mobile-container'

type Size = 'small' | 'default'
type Props = {
    children?: never
    brand: BrandProps
    left?: ReactNode | ReactNode[]
    right?: ReactNode | ReactNode[]
    mobile: ReactNode | ReactNode[]
    small?: boolean
    fullWidth?: boolean
}

const getLeftClasses = (active: boolean): string => {
    return classNames('h-full hidden sm:grid grid-flow-col items-center gap-4 ml-8', {
        hidden: !active,
    })
}

const getRightClasses = (active: boolean): string => {
    return classNames('h-full ml-auto hidden sm:grid grid-flow-col items-center gap-4', {
        hidden: !active,
    })
}

type Context = { size: Size }

const NavbarContext = createContext<Context>({
    size: 'default',
})

export const Navbar = ({
    right,
    left,
    mobile,
    small = false,
    brand,
    fullWidth = false,
}: Props): JSX.Element => {
    const [active, setActive] = useState(false)

    const toggleActiveState = useCallback((): void => {
        setActive(!active)
    }, [active])

    const rightClasses = getRightClasses(active)
    const leftClasses = getLeftClasses(active)

    const navClasses = classNames('relative wrapper flex items-center', {
        'h-16': !small,
        'h-12 text-sm': small,
        'max-w-none': fullWidth,
    })

    return (
        <nav className={navClasses} role='navigation'>
            <NavbarContext.Provider value={{ size: small ? 'small' : 'default' }}>
                <JumpToContent />

                <Brand content={brand.content} href={brand.href} />
                <div className={leftClasses}>{left}</div>
                <div className={rightClasses}>{right}</div>
                <Hamburger toggle={toggleActiveState} />
                <MobileContainer active={active} toggle={toggleActiveState}>
                    {mobile}
                </MobileContainer>
            </NavbarContext.Provider>
        </nav>
    )
}

export type Navbar = ReturnType<typeof Navbar>

export const useNavbarContext = (): Context => {
    return useContext(NavbarContext)
}
