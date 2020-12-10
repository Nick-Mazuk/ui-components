import classNames from 'classnames'

import NextImage from 'next/image'

import type { Ratios } from './ratio'
import { Ratio } from './ratio'

type Props = {
    src: string
    alt: string
    rounded?: boolean
    hideSkeleton?: boolean
    sizes?: number[]
} & (
    | { width?: number; height?: number; ratio?: never }
    | {
          width?: never
          height?: never
          ratio?: Ratios
      }
) &
    (
        | {
              eager: true
              preload?: boolean
          }
        | {
              eager?: false
              preload?: never
          }
    )

export const Image = ({
    src,
    alt,
    rounded,
    width,
    height,
    ratio,
    preload,
    eager,
}: Props): JSX.Element => {
    const classes = classNames({ 'rounded-lg': rounded })

    return (
        <Ratio ratio={ratio} customRatio={(height ?? 1) / (width ?? 1)}>
            <NextImage
                src={src}
                alt={alt}
                className={classes}
                loading={eager ? 'eager' : 'lazy'}
                priority={preload}
                layout='fill'
            />
        </Ratio>
    )
}

export type Image = ReturnType<typeof Image>
