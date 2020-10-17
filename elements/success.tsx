import classNames from 'classnames'

import { endWithPunctuation } from '@nick-mazuk/lib/text-styling'

import { CheckCircle } from './icon'

type Sizes = 'small' | 'default' | 'large'

type Props = {
    children: string
    label?: string
    size?: Sizes
}

type Sizing = {
    container: string
    icon: string
}

const SIZE_MAP: Record<Sizes, Sizing> = {
    small: {
        container: 'text-sm',
        icon: 'w-4 h-4',
    },
    default: {
        container: 'text-sm',
        icon: 'w-5 h-5',
    },
    large: {
        container: 'text-base',
        icon: 'w-6 h-6',
    },
}

export const Success = ({ children, label, size = 'default' }: Props): JSX.Element => {
    const containerClasses = classNames(
        'text-success flex items-center dark:text-success-d',
        SIZE_MAP[size].container
    )

    return (
        <div className={containerClasses}>
            <span className={SIZE_MAP[size].icon}>
                <CheckCircle />
            </span>
            <p className='ml-2'>
                {label && <span className='font-bold'>{label}: </span>}
                {endWithPunctuation(children)}
            </p>
        </div>
    )
}

export type Success = ReturnType<typeof Success>
