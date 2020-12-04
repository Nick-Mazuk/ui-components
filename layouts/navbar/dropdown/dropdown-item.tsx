import { Link } from '../../../elements/link'
import { Text } from '../../../elements/text'

export const DropdownItem = ({
    children,
    href,
}: {
    children: string
    href: string
}): JSX.Element => {
    return (
        <Link
            href={href}
            className='px-4 py-2 block hover:text-primary-700 hover:bg-primary-50 transition-color duration-150'
        >
            <Text small>{children}</Text>
        </Link>
    )
}

export type DropdownItem = ReturnType<typeof DropdownItem>
