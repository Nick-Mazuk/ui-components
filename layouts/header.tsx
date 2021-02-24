import type { ReactNode } from 'react'
import { useContext, createContext } from 'react'

import classNames from 'classnames'

// eslint-disable-next-line import/exports-last -- used in most of the header/navbar components
export type Color = 'white' | 'dark' | 'primary'

type Props = {
    children: ReactNode | ReactNode[]
    readonly color?: Color
    readonly sticky?: boolean
}

type Context = { color: Color }

const HeaderContext = createContext<Context>({
    color: 'white',
})

const COLOR_MAP: Record<Color, string> = {
    white: 'bg-white dark:bg-black',
    dark: 'bg-gray-800 text-gray-100 dark:bg-gray-d800 dark:text-gray-d100',
    primary: 'bg-primary text-white dark:bg-primary-d dark:text-d900',
}

export const Header = ({ children, sticky = false, color = 'white' }: Props): JSX.Element => {
    const headerClasses = classNames('relative z-50', COLOR_MAP[color], {
        'sticky top-0 overflow-visible': sticky,
    })

    const shadowClasses = classNames(
        'absolute w-full h-full shadow-md pointer-events-none select-none',
        {
            block: sticky,
            hidden: !sticky,
        }
    )

    return (
        <>
            {sticky && (
                <style>{`
                    :target {
                        scroll-padding-top: 96px
                    }
                `}</style>
            )}
            <header className={headerClasses} style={{ transform: 'translateZ(10000px)' }}>
                <HeaderContext.Provider value={{ color: color }}>
                    <div className={shadowClasses} />
                    {children}
                </HeaderContext.Provider>
            </header>
        </>
    )
}

export type Header = ReturnType<typeof Header>

export const useHeaderContext = (): Context => {
    return useContext(HeaderContext)
}
