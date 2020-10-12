import classNames from 'classnames'

import { Information } from './icon'

type Sizes = 'small' | 'default' | 'large'

type Props = {
    children?: never
    size?: Sizes
}

const SIZE_MAP: Record<Sizes, string> = {
    small: 'h-3 w-3',
    default: 'h-4 w-4',
    large: 'h-6 w-6',
}

export const Info = ({ size }: Props): JSX.Element => {
    const containerClasses = classNames(
        'bg-gray-50 dark:bg-gray-d200 rounded-full',
        SIZE_MAP[size ?? 'default']
    )

    return (
        <div className={containerClasses}>
            <Information />
        </div>
    )
}

export type Info = ReturnType<typeof Info>
