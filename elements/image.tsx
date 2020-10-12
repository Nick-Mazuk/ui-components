import { useCallback, useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import type { Ratios } from 'elements/ratio'
import { Ratio } from 'elements/ratio'
import { Skeleton } from 'elements/skeleton'

type Props = {
    src: string
    alt: string
    rounded?: boolean
    ratio?: Ratios
    eager?: boolean
    hideSkeleton?: boolean
    width?: number
    height?: number
}

export const Image = (props: Props): JSX.Element => {
    const [loaded, setLoaded] = useState(props.hideSkeleton ?? false)
    const imageRef = useRef<HTMLImageElement>(null)

    const imageClasses = classNames('w-full select-none pointer-events-none', {
        'rounded-lg': props.rounded,
        'absolute object-cover h-full': props.ratio,
    })

    const handleLoaded = useCallback(() => setLoaded(props.hideSkeleton ?? true), [
        props.hideSkeleton,
    ])

    useEffect(() => {
        if (imageRef.current?.complete) handleLoaded()
    }, [handleLoaded])

    const image = (
        <img
            src={props.src}
            alt={props.alt}
            className={imageClasses}
            loading={props.eager ? 'eager' : 'lazy'}
            onLoad={handleLoaded}
            ref={imageRef}
            height={props.height}
            width={props.width}
        />
    )

    if (props.ratio || (props.height && props.width)) {
        return (
            <Skeleton hide={loaded} fill>
                <Ratio ratio={props.ratio} customRatio={(props.height ?? 1) / (props.width ?? 1)}>
                    {image}
                </Ratio>
            </Skeleton>
        )
    }
    return (
        <Skeleton hide={loaded} fill>
            {image}
        </Skeleton>
    )
}

export type Image = ReturnType<typeof Image>
