import classNames from 'classnames'

import { Text } from './text'

type Sizes = 'small' | 'default' | 'large'

type Properties = {
    size?: Sizes
    label?: string
}

type Sizing = {
    dot: string
    text: string
    container: string
    dotContainer: string
}

const SIZES_MAP: Record<Sizes, Sizing> = {
    small: {
        container: 'pr-2',
        text: 'text-xs sm:text-sm',
        dot: 'w-2 h-2 ml-2',
        dotContainer: 'w-2 h-2',
    },
    default: {
        container: 'pr-3',
        text: 'text-sm sm:text-base',
        dot: 'w-2 h-2 ml-2 sm:ml-3 sm:w-3 sm:h-3',
        dotContainer: 'w-2 h-2 sm:w-3 sm:h-3',
    },
    large: {
        container: 'pr-4',
        text: 'text-base sm:text-lg',
        dot: 'w-3 h-3 sm:w-4 sm:h-4',
        dotContainer: 'w-3 h-3 ml-3 sm:ml-4 sm:w-4 sm:h-4',
    },
}

export const RealTime = ({
    size = 'default',
    label = 'Updating Live',
}: Properties): JSX.Element => {
    const containerClasses = classNames('flex items-baseline', SIZES_MAP[size].container)

    const dotContainerClasses = classNames('relative block', SIZES_MAP[size].dotContainer)

    const dotClasses = classNames(
        'absolute rounded-full bg-error dark:bg-error-d',
        SIZES_MAP[size].dot
    )

    const pingClasses = classNames(dotClasses, 'animate-ping')

    return (
        <div className={containerClasses}>
            <Text color='text-gray-700 dark:text-gray-d700'>{label}</Text>
            <div className={dotContainerClasses}>
                <div className={dotClasses} />
                <div className={pingClasses} />
            </div>
        </div>
    )
}

export type RealTime = ReturnType<typeof RealTime>
