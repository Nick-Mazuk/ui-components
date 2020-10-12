import classNames from 'classnames'

import { useRouter } from 'next/router'

import { Link } from '../../elements/link'
import { Text } from '../../elements/text'

type Props = {
    text: string
    path: string
}

export const NavbarMobileLink = ({ text, path }: Props): JSX.Element => {
    const router = useRouter()
    const isCurrentRoute = router.pathname.includes(path)
    const classes = classNames('py-2 block', {
        'bg-gray-': isCurrentRoute,
    })
    return (
        <Link key={text} href={path} className={classes}>
            <Text
                small
                bold
                color='text-gray-600 dark:text-gray-d600 hover:text-primary dark:hover:text-primary-d'
            >
                {text}
            </Text>
        </Link>
    )
}
export type NavbarMobileLink = ReturnType<typeof NavbarMobileLink>
