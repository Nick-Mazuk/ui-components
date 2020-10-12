import classNames from 'classnames'

import { useRouter } from 'next/router'

import { Link } from 'elements/link'
import { Text } from 'elements/text'

type Props = {
    text: string
    path: string
}

export const NavbarLink = ({ text, path }: Props): JSX.Element => {
    const router = useRouter()
    const isCurrentRoute = router.pathname.includes(path)
    const classes = 'relative flex items-center self-stretch select-none last:-mr-2'
    const borderClasses = classNames('h-1 bg-primary absolute left-0 w-full bottom-0', {
        'opacity-100': isCurrentRoute,
        'opacity-0': !isCurrentRoute,
    })
    return (
        <Link key={text} href={path} className={classes}>
            <div className='relative px-3'>
                <Text color='text-gray-600 dark:text-gray-d600 hover:text-primary dark:hover:text-primary-d'>
                    {text}
                </Text>
            </div>
            <div className={borderClasses} />
        </Link>
    )
}
export type NavbarLink = ReturnType<typeof NavbarLink>
