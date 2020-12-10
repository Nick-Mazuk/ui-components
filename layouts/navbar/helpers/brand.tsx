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
    none: 'mr-2',
    sm: 'sm:mr-2',
    md: 'md:mr-2',
    lg: 'lg:mr-2',
    xl: 'xl:mr-2',
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
    const iconClasses = classNames('flex-shrink-0', BREAKPOINT_MAP[newBreakpoint], SIZE_MAP[size])
    return (
        <Link href={href} className='flex items-center self-stretch select-none'>
            {icon && (
                <div className={iconClasses}>
                    <Image src={icon} alt='text' ratio='1x1' preload eager />
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
