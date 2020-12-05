import type { ReactNode } from 'react'
import { useContext, createContext, useCallback, useState } from 'react'

import classNames from 'classnames'

import type { BrandProps } from './helpers/brand'
import { Brand } from './helpers/brand'
import { Hamburger } from './helpers/hamburger'
import { JumpToContent } from './helpers/jump-to-content'
import { MobileContainer } from './helpers/mobile-container'

// eslint-disable-next-line import/exports-last -- used in other navbar components
export type Size = 'small' | 'default'

type Props = {
    children?: never
    brand: BrandProps
    left?: ReactNode | ReactNode[]
    right?: ReactNode | ReactNode[]
    mobile?: ReactNode | ReactNode[]
    small?: boolean
    fullWidth?: boolean
}

const getNavClasses = (small: boolean, fullWidth: boolean): string => {
    return classNames('relative wrapper flex items-center', {
        'h-16': !small,
        'h-12 text-sm': small,
        'max-w-none': fullWidth,
    })
}

const getLeftClasses = (): string => {
    return 'h-full grid grid-flow-col items-center gap-4 ml-8'
}

const getRightClasses = (): string => {
    return 'h-full ml-auto grid grid-flow-col items-center gap-4'
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

    const navClasses = getNavClasses(small, fullWidth)
    const rightClasses = getRightClasses()
    const leftClasses = getLeftClasses()

    return (
        <nav className={navClasses} role='navigation'>
            <NavbarContext.Provider value={{ size: small ? 'small' : 'default' }}>
                <JumpToContent />

                <Brand
                    text={brand.text}
                    href={brand.href}
                    icon={brand.icon}
                    breakpoint={brand.breakpoint}
                />
                {left && <div className={leftClasses}>{left}</div>}
                {right && <div className={rightClasses}>{right}</div>}
                {mobile && (
                    <>
                        <Hamburger toggle={toggleActiveState} />
                        <MobileContainer active={active} toggle={toggleActiveState}>
                            {mobile}
                        </MobileContainer>
                    </>
                )}
            </NavbarContext.Provider>
        </nav>
    )
}

export type Navbar = ReturnType<typeof Navbar>

export const useNavbarContext = (): Context => {
    return useContext(NavbarContext)
}
