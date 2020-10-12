import classNames from 'classnames'

import type { Icon } from '../../elements/icon'
import { ArrowRight } from '../../elements/icon'
import { Link } from '../../elements/link'
import { Text } from '../../elements/text'

type Style = 'primary' | 'success' | 'error' | 'warning' | 'highlight' | 'gray'

type Props = {
    children: string
    title: string
    icon: Icon
    style: Style
    href: string
}

type Colors = {
    icon: string
    title: string
    border: string
}

const STYLE_MAP: Record<Style, Colors> = {
    primary: {
        icon: 'text-primary-200 bg-primary-50',
        title: 'text-primary',
        border: 'border-primary-100',
    },
    success: {
        icon: 'text-success-200 bg-success-50',
        title: 'text-success',
        border: 'border-success-100',
    },
    error: { icon: 'text-error-200 bg-error-50', title: 'text-error', border: 'border-error-100' },
    warning: {
        icon: 'text-warning-200 bg-warning-50',
        title: 'text-warning',
        border: 'border-warning-100',
    },
    highlight: {
        icon: 'text-highlight-200 bg-highlight-50',
        title: 'text-highlight',
        border: 'border-highlight-100',
    },
    gray: { icon: 'text-gray-200 bg-gray-50', title: 'text-gray', border: 'border-gray-100' },
}

export const CtaBox = ({ children, title, icon, style, href }: Props): JSX.Element => {
    const containerClasses = classNames(
        'block overflow-hidden transition-all duration-150 transform bg-white border rounded-lg hover:scale-101 hover:shadow-lg focus:scale-101 focus:shadow-lg focus:outline-none active:scale-105 active:shadow-xl',
        STYLE_MAP[style].border
    )

    const iconContainerClasses = classNames(
        'items-center flex-none hidden w-24 h-24 rounded-full sm:flex',
        STYLE_MAP[style].icon
    )

    const titleClasses = classNames('flex items-center', STYLE_MAP[style].title)

    return (
        <Link href={href} className={containerClasses}>
            <div className='flex items-center sm:-ml-8'>
                <div className={iconContainerClasses}>
                    <div className='mx-auto'>
                        <div className='w-12'>{icon}</div>
                    </div>
                </div>
                <div className='px-6 py-10'>
                    <div className={titleClasses}>
                        <Text bold truncate>
                            {title}
                        </Text>
                        <span className='ml-1'>
                            <ArrowRight width='w-5' />
                        </span>
                    </div>
                    <div className='mt-4'>
                        <Text color='text-gray'>{children}</Text>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export type CtaBox = ReturnType<typeof CtaBox>
