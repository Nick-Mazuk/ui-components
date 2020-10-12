import type { ReactNode } from 'react'
import { useCallback, useState } from 'react'

import classNames from 'classnames'

import type { BrandProps } from './helpers/brand'
import { Brand } from './helpers/brand'
import { Hamburger } from './helpers/hamburger'
import { JumpToContent } from './helpers/jump-to-content'
import { MobileContainer } from './helpers/mobile-container'

type Props = {
    children?: never
    brand: BrandProps
    right?: ReactNode | ReactNode[]
    mobile: ReactNode | ReactNode[]
    small?: boolean
}

const getLinksClasses = (active: boolean): string => {
    return classNames(
        'bg-white dark:bg-black h-full ml-auto hidden sm:grid grid-flow-col items-center gap-4',
        {
            hidden: !active,
        }
    )
}

export const Navbar = ({ right, mobile, small = false, brand }: Props): JSX.Element => {
    const [active, setActive] = useState(false)

    const toggleActiveState = useCallback((): void => {
        setActive(!active)
    }, [active])

    const linksClasses = getLinksClasses(active)

    const navClasses = classNames('relative wrapper flex items-center', {
        'h-16': !small,
        'h-12 text-sm': small,
    })

    return (
        <nav className={navClasses} role='navigation'>
            <JumpToContent />

            <Brand content={brand.content} href={brand.href} />
            <div className={linksClasses}>{right}</div>
            <Hamburger toggle={toggleActiveState} />
            <MobileContainer active={active} toggle={toggleActiveState}>
                {mobile}
            </MobileContainer>
        </nav>
    )
}

export type Navbar = ReturnType<typeof Navbar>
