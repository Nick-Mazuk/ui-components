import { Link } from 'elements/link'
import { Text } from 'elements/text'

export type BrandProps = {
    content: string
    href?: string
}

export const Brand = ({ content, href = '/' }: BrandProps): JSX.Element => {
    return (
        <Link href={href} className='flex items-center self-stretch select-none'>
            <Text h5 as='p'>
                {content}
            </Text>
        </Link>
    )
}

export type Brand = ReturnType<typeof Brand>
