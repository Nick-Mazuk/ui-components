import classNames from 'classnames'

import { useRouter } from 'next/router'

import { Link } from '../../elements/link'
import type { TextChildren } from '../../elements/text'
import { Text } from '../../elements/text'
import type { Color } from '../header'
import { useHeaderContext } from '../header'
import type { Breakpoint } from './navbar-item-wrapper'
import { NavbarItemWrapper } from './navbar-item-wrapper'

type Props = {
    content: string | TextChildren
    href: string
    breakpoint?: Breakpoint
}

type ElementColors = {
    text: string
    activeDiv: string
}

const COLOR_MAP: Record<Color, ElementColors> = {
    white: {
        text: 'text-gray-600 dark:text-gray-d600 hover:text-primary dark:hover:text-primary-d',
        activeDiv: 'bg-primary',
    },
    dark: {
        text: 'hover:text-white dark:hover:text-black',
        activeDiv: 'bg-primary-d400',
    },
    primary: {
        text: 'text-primary-100 hover:text-white dark:text-primary-d100 dark:hover:text-black',
        activeDiv: 'bg-primary-50',
    },
}

export const NavbarLink = ({ content, href, breakpoint }: Props): JSX.Element => {
    const router = useRouter()
    const isCurrentRoute = router.pathname.includes(href)
    const { color } = useHeaderContext()
    const classes = classNames(
        'relative flex items-center self-stretch select-none last:-mr-2',
        COLOR_MAP[color].text
    )
    const borderClasses = classNames(
        'h-1 absolute left-0 w-full bottom-0',
        COLOR_MAP[color].activeDiv,
        {
            'opacity-100': isCurrentRoute,
            'opacity-0': !isCurrentRoute,
        }
    )
    return (
        <NavbarItemWrapper breakpoint={breakpoint}>
            <Link href={href} className={classes}>
                <div className='relative px-3'>
                    <Text>{content}</Text>
                </div>
                <div className={borderClasses} />
            </Link>
        </NavbarItemWrapper>
    )
}
export type NavbarLink = ReturnType<typeof NavbarLink>
