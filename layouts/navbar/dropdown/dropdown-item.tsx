import classNames from 'classnames'

import { Link } from '../../../elements/link'
import { Text } from '../../../elements/text'
import { WithClick } from '../../../hoc/with-click'
import type { Color } from '../../header'
import { useHeaderContext } from '../../header'

const COLOR_MAP: Record<Color, string> = {
    white: 'hover:text-primary-700 hover:bg-primary-50',
    dark: 'hover:bg-gray-900',
    primary: 'hover:bg-primary-600',
}

type Props = {
    children: string
} & (
    | {
          href: string
          onClick?: never
      }
    | {
          onClick: () => void
          href?: never
      }
)

export const DropdownItem = ({ children, href, onClick }: Props): JSX.Element => {
    const { color } = useHeaderContext()
    const classes = classNames(
        'px-4 py-2 block transition-color duration-150 w-full',
        COLOR_MAP[color]
    )
    const content = <Text small>{children}</Text>
    if (href) {
        return (
            <Link href={href} className={classes}>
                {content}
            </Link>
        )
    }
    if (onClick) {
        return (
            <WithClick className={classes} callback={onClick}>
                {content}
            </WithClick>
        )
    }
    // eslint-disable-next-line react/jsx-no-useless-fragment -- base case
    return <></>
}

export type DropdownItem = ReturnType<typeof DropdownItem>
