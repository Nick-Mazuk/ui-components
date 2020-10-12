import type { ReactNode } from 'react'

import classNames from 'classnames'

type Props = {
    children: ReactNode | ReactNode[]
    hide?: boolean
    fill?: boolean
}

export const Skeleton = ({ children, hide = false, fill = false }: Props): JSX.Element => {
    const skeletonClasses = classNames(
        'absolute inset-0 bg-gray-50 dark:bg-gray-d50 rounded select-none pointer-events-none',
        {
            'opacity-0': hide,
            'motion-safe:animate-pulse motion-reduce:animate-pulse-small': !hide,
        }
    )

    const containerClasses = classNames('relative', {
        'w-full h-full': fill,
    })

    return (
        <div className={containerClasses}>
            {children}
            <div className={skeletonClasses} />
        </div>
    )
}

export type Skeleton = ReturnType<typeof Skeleton>
