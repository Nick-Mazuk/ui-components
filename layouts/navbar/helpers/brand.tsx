import { useNavbarContext } from '..'
import { Link } from '../../../elements/link'
import { Text } from '../../../elements/text'

export type BrandProps = {
    content: string
    href?: string
}

export const Brand = ({ content, href = '/' }: BrandProps): JSX.Element => {
    const { size } = useNavbarContext()
    return (
        <Link href={href} className='flex items-center self-stretch select-none'>
            <Text h5={size === 'default'} h6={size === 'small'} as='p'>
                {content}
            </Text>
        </Link>
    )
}

export type Brand = ReturnType<typeof Brand>
