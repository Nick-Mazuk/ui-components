import classNames from 'classnames'

import { Link } from '../../../elements/link'
import { Text } from '../../../elements/text'
import type { Color } from '../../header'
import { useHeaderContext } from '../../header'

const COLOR_MAP: Record<Color, string> = {
    white: 'hover:text-primary-700 hover:bg-primary-50',
    dark: 'hover:bg-gray-900',
    primary: 'hover:bg-primary-600',
}

export const DropdownItem = ({
    children,
    href,
}: {
    children: string
    href: string
}): JSX.Element => {
    const { color } = useHeaderContext()
    const classes = classNames('px-4 py-2 block transition-color duration-150', COLOR_MAP[color])
    return (
        <Link href={href} className={classes}>
            <Text small>{children}</Text>
        </Link>
    )
}

export type DropdownItem = ReturnType<typeof DropdownItem>
