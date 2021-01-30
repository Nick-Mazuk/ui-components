import type { ReactElement, ReactNode } from 'react'
import { Children, cloneElement } from 'react'

import classNames from 'classnames'

// eslint-disable-next-line import/exports-last -- export necessary and cannot go at end
export type Ratios = '16x9' | '3x2' | '4x3' | '1x1' | '3x4' | '2x3' | 'screen'

type PropsBase = {
    children: ReactNode[] | ReactNode
    ratio?: Ratios
    customRatio?: number
    as?: 'div' | 'figure'
    fit?: 'contain' | 'cover'
}

type RequireProperty<T, Property extends keyof T> = T & { [key in Property]-?: T[key] }

type Props = RequireProperty<PropsBase, 'ratio'> | RequireProperty<PropsBase, 'customRatio'>

const RATIO_MAP: Record<Ratios, number> = {
    '16x9': 0.5625,
    '3x2': 0.6666666666666666,
    '4x3': 0.75,
    '1x1': 1,
    '3x4': 1.3333333333333333,
    '2x3': 1.5,
    screen: 0.625,
}

export const Ratio = ({
    children,
    ratio,
    customRatio,
    as = 'div',
    fit = 'cover',
}: Props): JSX.Element => {
    const ratioClasses = classNames('relative block w-full h-0 overflow-hidden')
    const padding = ratio ? RATIO_MAP[ratio] : customRatio ?? 1
    const Tag = as
    return (
        <Tag className={ratioClasses} style={{ paddingBottom: `${padding * 100}%` }}>
            {Children.map(children, (child) =>
                cloneElement(child as ReactElement, {
                    style: {
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        objectFit: fit === 'cover' ? fit : 'scale-down',
                    },
                })
            )}
        </Tag>
    )
}

export type Ratio = ReturnType<typeof Ratio>
