import type { ReactNode } from 'react'

import classNames from 'classnames'

import { useRouter } from 'next/router'

import type { Icon } from '../../../elements/icon'
import { Link } from '../../../elements/link'
import { Text } from '../../../elements/text'

type Props = {
    children?: ReactNode | ReactNode[]
    text: string
    href: string
    icon?: Icon
}

export const SidebarItem = ({ text, href, children, icon }: Props): JSX.Element => {
    const router = useRouter()
    const isCurrentRoute = router.pathname === href
    const classes = classNames(
        'flex items-center space-x-3 px-6 py-2 block rounded rounded-r-full w-full',
        {
            'bg-primary-50 text-primary-600': isCurrentRoute,
            'hover:bg-gray-20 text-gray-800': !isCurrentRoute,
        }
    )
    const iconClasses = classNames('w-5', {
        'text-primary-600': isCurrentRoute,
        'text-gray-600 text-gray': !isCurrentRoute,
    })
    return (
        <>
            <Link href={href} className={classes}>
                {icon && <div className={iconClasses}>{icon}</div>}
                <Text noWrap small semibold>
                    {text}
                </Text>
            </Link>

            {children && isCurrentRoute && (
                <div className='pl-3 my-2 ml-3 border-l-4 border-gray-50'>{children}</div>
            )}
        </>
    )
}

export type SidebarItem = ReturnType<typeof SidebarItem>
