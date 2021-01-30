import classNames from 'classnames'

import NextImage from 'next/image'

import type { Ratios } from './ratio'
import { Ratio } from './ratio'

// eslint-disable-next-line import/exports-last -- used on production sites for wrapper components
export type SourceSet = {
    src: string
    media?: string
    type?: string
}[]

type Props = {
    src: string
    alt: string
    rounded?: boolean
    hideSkeleton?: boolean
    sizes?: number[]
    srcSet?: SourceSet
    fit?: 'contain' | 'cover'
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

// eslint-disable-next-line max-lines-per-function -- will fix
export const Image = ({
    src,
    alt,
    rounded,
    width,
    height,
    ratio,
    preload,
    eager,
    srcSet,
    fit = 'cover',
}: Props): JSX.Element => {
    const classes = classNames({ 'rounded-lg': rounded })
    let image = (
        <NextImage
            src={src}
            alt={alt}
            className={classes}
            loading={eager ? 'eager' : 'lazy'}
            priority={preload}
            layout='fill'
        />
    )
    if (srcSet) {
        image = (
            <picture>
                {srcSet.map((source) => {
                    return (
                        <source
                            key={source.src}
                            srcSet={source.src}
                            media={source.media}
                            type={source.type}
                        />
                    )
                })}
                <img
                    src={src}
                    alt={alt}
                    className={`${classes} w-full h-full absolute ${
                        fit === 'cover' ? 'object-cover' : 'object-scale-down'
                    }`}
                    loading={eager ? 'eager' : 'lazy'}
                />
            </picture>
        )
    }
    return (
        <Ratio ratio={ratio} customRatio={(height ?? 1) / (width ?? 1)}>
            {image}
        </Ratio>
    )
}

export type Image = ReturnType<typeof Image>
