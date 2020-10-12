import type { ReactNode } from 'react'

import classNames from 'classnames'

type Properties = {
    children: ReactNode | ReactNode[]
    fullwidth?: boolean
    responsive?: boolean
}

export const TextContent = ({
    children,
    fullwidth = false,
    responsive = false,
}: Properties): JSX.Element => {
    const classes = classNames('mx-auto prose sm:prose-lg lg:prose-xl', {
        'max-w-none': fullwidth,
        'prose-text-base sm:prose-text-base lg:prose-text-base': !responsive,
    })
    return <div className={classes}>{children}</div>
}

export type TextContent = ReturnType<typeof TextContent>
