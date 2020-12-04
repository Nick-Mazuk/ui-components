import classNames from 'classnames'

import { useRouter } from 'next/router'

import { Link } from '../../elements/link'
import type { TextChildren } from '../../elements/text'
import { Text } from '../../elements/text'

type Props = {
    content: string | TextChildren
    href: string
}

export const NavbarLink = ({ content, href }: Props): JSX.Element => {
    const router = useRouter()
    const isCurrentRoute = router.pathname.includes(href)
    const classes = 'relative flex items-center self-stretch select-none last:-mr-2'
    const borderClasses = classNames('h-1 bg-primary absolute left-0 w-full bottom-0', {
        'opacity-100': isCurrentRoute,
        'opacity-0': !isCurrentRoute,
    })
    return (
        <Link href={href} className={classes}>
            <div className='relative px-3'>
                <Text color='text-gray-600 dark:text-gray-d600 hover:text-primary dark:hover:text-primary-d'>
                    {content}
                </Text>
            </div>
            <div className={borderClasses} />
        </Link>
    )
}
export type NavbarLink = ReturnType<typeof NavbarLink>
