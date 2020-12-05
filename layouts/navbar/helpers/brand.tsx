import classNames from 'classnames'

import { useNavbarContext } from '..'
import { Image } from '../../../elements/image'
import { Link } from '../../../elements/link'
import { Text } from '../../../elements/text'
import type { Size } from '../index'
import type { Breakpoint } from '../navbar-item-wrapper'
import { NavbarItemWrapper } from '../navbar-item-wrapper'

const SIZE_MAP: Record<Size, string> = {
    small: 'w-8 h-8',
    default: 'w-10 h-10',
}

const BREAKPOINT_MAP: Record<Breakpoint, string> = {
    none: 'mr-3',
    sm: 'sm:mr-3',
    md: 'md:mr-3',
    lg: 'lg:mr-3',
    xl: 'xl:mr-3',
}

export type BrandProps = {
    icon?: string
    text: string
    href?: string
    breakpoint?: Breakpoint
}

export const Brand = ({ text, href = '/', icon, breakpoint }: BrandProps): JSX.Element => {
    const { size } = useNavbarContext()
    const newBreakpoint = breakpoint ?? (icon ? 'lg' : 'none')
    const iconClasses = classNames(BREAKPOINT_MAP[newBreakpoint], SIZE_MAP[size])
    return (
        <Link href={href} className='flex items-center self-stretch select-none'>
            {icon && (
                <div className={iconClasses}>
                    <Image src={icon} alt='text' ratio='1x1' />
                </div>
            )}
            <NavbarItemWrapper breakpoint={newBreakpoint}>
                <Text h5={size === 'default'} h6={size === 'small'} as='p'>
                    {text}
                </Text>
            </NavbarItemWrapper>
        </Link>
    )
}

export type Brand = ReturnType<typeof Brand>
