import type { ReactNode } from 'react'

import classNames from 'classnames'

type Props = {
    children: ReactNode | ReactNode[]
    readonly sticky?: boolean
}

export const Header = ({ children, sticky = false }: Props): JSX.Element => {
    const headerClasses = classNames('relative z-50 bg-white dark:bg-black', {
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
                    html {
                        scroll-padding-top: 96px
                    }
                `}</style>
            )}
            <header className={headerClasses} style={{ transform: 'translateZ(10000px)' }}>
                <div className={shadowClasses} />
                {children}
            </header>
        </>
    )
}

export type Header = ReturnType<typeof Header>
