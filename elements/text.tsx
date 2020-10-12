import classNames from 'classnames'

import type CSS from 'csstype'

import type { LinkType } from './link'

type SupportedChildren = string | number | LinkType
type Tags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
// eslint-disable-next-line import/exports-last -- used by other components
export type TextChildren = SupportedChildren | SupportedChildren[]

type Props = {
    children: TextChildren
    as?: Tags

    h1?: boolean
    h2?: boolean
    h3?: boolean
    h4?: boolean
    h5?: boolean
    h6?: boolean
    p?: boolean
    span?: boolean

    black?: boolean
    bold?: boolean
    semibold?: boolean

    large?: boolean
    small?: boolean
    tiny?: boolean

    hidden?: boolean
    center?: boolean
    color?: string
    uppercase?: boolean
    truncate?: boolean | number
}

type FontWeights = 'normal' | 'semibold' | 'bold' | 'black'

type FontSize = {
    size: string
    tiny?: string
    small?: string
    large?: string
}

// eslint-disable-next-line import/exports-last -- used by tooltip
export const SIZE_MAP: Record<Tags, FontSize> = {
    h1: {
        size: 'text-4xl sm:text-5xl lg:text-6xl',
    },
    h2: {
        size: 'text-3xl sm:text-4xl lg:text-5xl',
    },
    h3: {
        size: 'text-2xl sm:text-3xl lg:text-4xl',
    },
    h4: {
        size: 'text-xl sm:text-2xl lg:text-3xl',
    },
    h5: {
        size: 'text-lg sm:text-xl lg:text-2xl',
    },
    h6: {
        size: 'text-base sm:text-lg',
    },
    span: {
        size: '',
    },
    p: {
        size: 'text-base leading-19',
        tiny: 'text-xs leading-19',
        small: 'text-sm leading-19',
        large: 'md:text-lg leading-19',
    },
}

// eslint-disable-next-line import/exports-last -- must be exported, used by other components
export const WEIGHT_MAP: Record<FontWeights, string> = {
    normal: 'font-normal',
    semibold: 'font-medium',
    bold: 'font-semibold',
    black: 'font-bold',
}

const getTag = (props: Props): Tags => {
    if (props.h1) return 'h1'
    if (props.h2) return 'h2'
    if (props.h3) return 'h3'
    if (props.h4) return 'h4'
    if (props.h5) return 'h5'
    if (props.h6) return 'h6'
    if (props.span) return 'span'
    return 'p'
}

const getSemanticTag = (semanticTag: Tags | undefined, tag: Tags): keyof JSX.IntrinsicElements => {
    return (semanticTag ?? tag) as keyof JSX.IntrinsicElements
}

const getFontSize = (tag: Tags, props: Props): string => {
    if (props.tiny && typeof SIZE_MAP[tag].tiny !== 'undefined') return SIZE_MAP[tag].tiny ?? ''
    if (props.small && typeof SIZE_MAP[tag].small !== 'undefined') return SIZE_MAP[tag].small ?? ''
    if (props.large && typeof SIZE_MAP[tag].large !== 'undefined') return SIZE_MAP[tag].large ?? ''
    return SIZE_MAP[tag].size
}

const getFontWeight = (tag: Tags, props: Props): string => {
    if (props.black) return WEIGHT_MAP.black
    if (props.bold) return WEIGHT_MAP.bold
    if (props.semibold) return WEIGHT_MAP.semibold
    if (props.uppercase) return WEIGHT_MAP.semibold

    if ('h1 h2'.includes(tag)) return WEIGHT_MAP.semibold
    if ('h3 h4 h5'.includes(tag)) return WEIGHT_MAP.bold
    if ('h6'.includes(tag)) return WEIGHT_MAP.black
    if ('p'.includes(tag)) return WEIGHT_MAP.normal

    return ''
}

const getTextClasses = (tag: Tags, props: Props): string => {
    return classNames(
        getFontWeight(tag, props),
        getFontSize(tag, props),
        {
            'sr-only': props.hidden,
            'text-center': props.center,
            'uppercase tracking-wider': props.uppercase,
        },
        props.color ?? ''
    )
}

const getTruncate = (props: Props): CSS.Properties => {
    if (props.truncate) {
        let lines = 1
        if (typeof props.truncate !== 'boolean') lines = props.truncate
        return {
            WebkitLineClamp: lines,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
        }
    }
    return {}
}

const getStyles = (props: Props): CSS.Properties => {
    return { ...getTruncate(props) }
}

export const Text = (props: Props): JSX.Element => {
    const tag = getTag(props)
    const SemanticTag = getSemanticTag(props.as, tag)
    const textClasses = getTextClasses(tag, props)
    const styles = getStyles(props)

    return (
        <SemanticTag className={textClasses} style={styles}>
            {props.children}
        </SemanticTag>
    )
}

export type Text = ReturnType<typeof Text>
