import classNames from 'classnames'

import { useRouter } from 'next/router'

import { Link } from '../../elements/link'
import type { TextChildren } from '../../elements/text'
import { Text } from '../../elements/text'

type Props = {
    content: string | TextChildren
    href: string
}

export const NavbarMobileLink = ({ content, href }: Props): JSX.Element => {
    const router = useRouter()
    const isCurrentRoute = router.pathname.includes(href)
    const classes = classNames('py-2 block', {
        'bg-gray-': isCurrentRoute,
    })
    return (
        <Link href={href} className={classes}>
            <Text
                small
                bold
                color='text-gray-600 dark:text-gray-d600 hover:text-primary dark:hover:text-primary-d'
            >
                {content}
            </Text>
        </Link>
    )
}
export type NavbarMobileLink = ReturnType<typeof NavbarMobileLink>
