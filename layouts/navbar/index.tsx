import type { ReactNode } from 'react'
import { useContext, createContext, useCallback, useState } from 'react'

import classNames from 'classnames'

import type { BrandProps } from './helpers/brand'
import { Brand } from './helpers/brand'
import { Hamburger } from './helpers/hamburger'
import { JumpToContent } from './helpers/jump-to-content'
import { MobileContainer } from './helpers/mobile-container'

type Color = 'white' | 'dark' | 'primary'
type Size = 'small' | 'default'
type Props = {
    children?: never
    brand: BrandProps
    right?: ReactNode | ReactNode[]
    mobile: ReactNode | ReactNode[]
    small?: boolean
    fullWidth?: boolean
    color?: Color
}

const getLinksClasses = (active: boolean): string => {
    return classNames(
        'bg-white dark:bg-black h-full ml-auto hidden sm:grid grid-flow-col items-center gap-4',
        {
            hidden: !active,
        }
    )
}

type Context = { color: Color; size: Size }

const NavbarContext = createContext<Context>({
    color: 'white',
    size: 'default',
})

export const Navbar = ({
    right,
    mobile,
    small = false,
    brand,
    fullWidth = false,
    color = 'white',
}: Props): JSX.Element => {
    const [active, setActive] = useState(false)

    const toggleActiveState = useCallback((): void => {
        setActive(!active)
    }, [active])

    const linksClasses = getLinksClasses(active)

    const navClasses = classNames('relative wrapper flex items-center', {
        'h-16': !small,
        'h-12 text-sm': small,
        'max-w-none': fullWidth,
    })

    return (
        <nav className={navClasses} role='navigation'>
            <NavbarContext.Provider value={{ size: small ? 'small' : 'default', color: color }}>
                <JumpToContent />

                <Brand content={brand.content} href={brand.href} />
                <div className={linksClasses}>{right}</div>
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
