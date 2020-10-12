import type { ReactNode } from 'react'

import type { Icon } from '../../elements/icon'
import { Link } from '../../elements/link'
import { Text } from '../../elements/text'

type Props = {
    copyright: string
    className?: string
    icons?: { icon: Icon; href: string; name: string }[]
    children: ReactNode | ReactNode[]
}

export const Footer = ({ copyright, className = '', icons, children }: Props): JSX.Element => {
    return (
        <footer className={`${className} mt-auto pt-8 dark:bg-black`}>
            <div className='py-12 bg-gray-10'>
                <div className='wrapper'>
                    <div className='pb-12 md:pb-4 md:grid md:grid-flow-col md:w-full md:gap-8'>
                        {children}
                    </div>
                    <div className='flex flex-col items-center md:flex-row md:justify-between'>
                        <div className='order-2 select-none md:order-none'>
                            <Text tiny color='text-gray dark:text-gray-d'>
                                ©{new Date().getFullYear()} {copyright}. All rights reserved.
                            </Text>
                        </div>
                        {icons && (
                            <div className='grid order-1 grid-flow-col gap-6 pb-6 md:order-none md:p-0'>
                                {icons.map((icon) => {
                                    return (
                                        <Link
                                            className='inline-block w-6 text-gray-400 duration-150 hover:text-gray-500 transition-color dark:text-gray-d300 dark:hover:text-gray-d400'
                                            href={icon.href}
                                            key={icon.href}
                                        >
                                            {icon.icon}
                                        </Link>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export type Footer = ReturnType<typeof Footer>
