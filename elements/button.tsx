import { useCallback } from 'react'

import classNames from 'classnames'

import { sentenceCase } from '@nick-mazuk/lib/text-styling'

import type { Icon } from './icon'
import { Link } from './link'

type Styles = 'filled' | 'outlined' | 'text'
type Sizes = 'small' | 'default' | 'large'
type GluePositions = 'left' | 'right' | 'top' | 'bottom'
type IconPositions = 'before' | 'after'
type As = 'button' | 'div'
// eslint-disable-next-line import/exports-last -- used in other files
export type Colors = 'primary' | 'error' | 'success' | 'warning' | 'default' | 'highlight' | 'white'

type Props = {
    children?: never
    value: string
    style?: Styles
    icon?: Icon
    iconPosition?: IconPositions
    href?: string
    onClick?: () => void
    uppercase?: boolean
    size?: Sizes
    fullwidth?: boolean
    glue?: GluePositions[]
    color?: Colors
    autoCapitalization?: boolean
    download?: boolean
    square?: boolean
    type?: 'submit' | 'button' | 'reset'
    as?: As

    disabled?: boolean
    loading?: boolean
}

type ButtonStyling = {
    global: string
    enabled: Record<Colors, string>
    disabled: string
}

const STYLES_MAP: Record<Styles, ButtonStyling> = {
    filled: {
        global: '',
        enabled: {
            primary:
                'text-white bg-primary hover:bg-primary-600 hover:scale-101 focus:bg-primary-600 dark:text-black dark:bg-primary-d dark:hover:bg-primary-d600 dark:hover:scale-101 dark:focus:bg-primary-d600',
            error:
                'text-white bg-error hover:bg-error-600 hover:scale-101 focus:bg-error-600 dark:text-black dark:bg-error-d dark:hover:bg-error-d600 dark:hover:scale-101 dark:focus:bg-error-d600',
            success:
                'text-white bg-success hover:bg-success-600 hover:scale-101 focus:bg-success-600 dark:text-black dark:bg-success-d dark:hover:bg-success-d600 dark:hover:scale-101 dark:focus:bg-success-d600',
            warning:
                'text-warning-800 bg-warning-200 hover:bg-warning-300 hover:scale-101 focus:bg-warning-300 dark:text-black dark:bg-warning-d600 dark:hover:bg-warning-d700 dark:hover:scale-101 dark:focus:bg-warning-d700',
            highlight:
                'text-white bg-highlight hover:bg-highlight-600 hover:scale-101 focus:bg-highlight-600 dark:text-black dark:bg-highlight-d dark:hover:bg-highlight-d600 dark:hover:scale-101 dark:focus:bg-highlight-d600',
            white:
                'text-gray-900 bg-white hover:bg-gray-50 hover:scale-101 focus:bg-gray-50 dark:text-gray-d900 dark:bg-gray-d50 dark:hover:bg-gray-d50 dark:hover:scale-101 dark:focus:bg-gray-d50',
            default:
                'text-white bg-gray-800 hover:bg-gray-900 hover:scale-101 focus:bg-gray-900 dark:text-black dark:bg-gray-d800 dark:hover:bg-gray-d900 dark:hover:scale-101 dark:focus:bg-gray-d900',
        },
        disabled: 'bg-gray-100 text-gray-600 dark:bg-gray-d100 dark:text-gray-d600',
    },
    outlined: {
        global: 'bg-transparent border',
        enabled: {
            primary:
                'text-primary border-primary-200 hover:border-primary focus:border-primary dark:text-primary-d dark:border-primary-d200 dark:hover:border-primary-d dark:focus:border-primary-d',
            error:
                'text-error border-error-200 hover:border-error focus:border-error dark:text-error-d dark:border-error-d200 dark:hover:border-error-d dark:focus:border-error-d',
            success:
                'text-success border-success-200 hover:border-success focus:border-success dark:text-success-d dark:border-success-d200 dark:hover:border-success-d dark:focus:border-success-d',
            warning:
                'text-warning border-warning-200 hover:border-warning focus:border-warning dark:text-warning-d dark:border-warning-d200 dark:hover:border-warning-d dark:focus:border-warning-d',
            highlight:
                'text-highlight border-highlight-200 hover:border-highlight focus:border-highlight dark:text-highlight-d dark:border-highlight-d200 dark:hover:border-highlight-d dark:focus:border-highlight-d',
            white:
                'text-white border-white border-opacity-50 hover:border-opacity-100 focus:border-opacity-100 dark:text-gray-d900 dark:border-gray-d900',
            default:
                'text-gray-700 border-gray-200 hover:border-gray focus:border-gray dark:text-gray-d700 dark:border-gray-d200 dark:hover:border-gray-d dark:focus:border-gray-d',
        },
        disabled: 'text-gray-200 border-gray-100 dark:text-gray-d200 dark:border-gray-d100',
    },
    text: {
        global: '',
        enabled: {
            primary:
                'bg-transparent text-primary hover:text-primary-600 hover:bg-primary-50 focus:text-primary-600 focus:bg-primary-50 dark:text-primary-d dark:hover:text-primary-d600 dark:hover:bg-primary-d50 dark:focus:text-primary-d600 dark:focus:bg-primary-d50',
            error:
                'bg-transparent text-error hover:text-error-600 hover:bg-error-50 focus:text-error-600 focus:bg-error-50 dark:text-error-d dark:hover:text-error-d600 dark:hover:bg-error-d50 dark:focus:text-error-d600 dark:focus:bg-error-d50',
            success:
                'bg-transparent text-success hover:text-success-600 hover:bg-success-50 focus:text-success-600 focus:bg-success-50 dark:text-success-d dark:hover:text-success-d600 dark:hover:bg-success-d50 dark:focus:text-success-d600 dark:focus:bg-success-d50',
            warning:
                'bg-transparent text-warning hover:text-warning-600 hover:bg-warning-50 focus:text-warning-600 focus:bg-warning-50 dark:text-warning-d dark:hover:text-warning-d600 dark:hover:bg-warning-d50 dark:focus:text-warning-d600 dark:focus:bg-warning-d50',
            highlight:
                'bg-transparent text-highlight hover:text-highlight-600 hover:bg-highlight-50 focus:text-highlight-600 focus:bg-highlight-50 dark:text-highlight-d dark:hover:text-highlight-d600 dark:hover:bg-highlight-d50 dark:focus:text-highlight-d600 dark:focus:bg-highlight-d50',
            white:
                'bg-transparent text-gray-900 hover:bg-gray-50 focus:bg-gray-50 dark:text-gray-d900 dark:hover:bg-gray-d50 dark:focus:bg-gray-d50',
            default:
                'bg-transparent text-gray hover:text-gray-600 hover:bg-gray-50 focus:text-gray-600 focus:bg-gray-50 dark:text-gray-d dark:hover:text-gray-d600 dark:hover:bg-gray-d50 dark:focus:text-gray-d600 dark:focus:bg-gray-d50',
        },
        disabled: 'text-gray-300 dark:text-gray-d300',
    },
}

type SizeProperties = {
    sizing: string
    squareSizing: string
    before: string
    after: string
    glue: {
        left: {
            default: string

            icon: string
        }
        right: {
            default: string

            icon: string
        }
        top: string
        bottom: string
    }
}

const SIZE_MAP: Record<Sizes, SizeProperties> = {
    small: {
        sizing: 'px-4 py-3 text-sm min-w-16',
        squareSizing: 'px-3 py-3 text-sm min-w-10',
        before: 'w-5 mr-1 -my-2 -ml-1',
        after: 'w-5 ml-1 -my-2 -mr-1',
        glue: {
            left: {
                default: '-ml-4',
                icon: '-ml-3',
            },
            right: {
                default: '-mr-4',
                icon: '-mr-3',
            },
            top: '-mt-3',
            bottom: '-mb-3',
        },
    },
    default: {
        sizing: 'px-6 py-4 text-base min-w-24',
        squareSizing: 'px-4 py-4 text-base min-w-12',
        before: 'w-6 mr-2 -my-2 -ml-2',
        after: 'w-6 ml-2 -my-2 -mr-2',
        glue: {
            left: {
                default: '-ml-6',
                icon: '-ml-4',
            },
            right: {
                default: '-mr-6',
                icon: '-mr-4',
            },
            top: '-mt-4',
            bottom: '-mb-4',
        },
    },
    large: {
        sizing: 'px-8 py-5 text-lg min-w-24',
        squareSizing: 'px-5 py-5 text-lg min-w-16',
        before: 'w-8 mr-4 -my-4 -ml-2',
        after: 'w-8 ml-4 -my-4 -mr-2',
        glue: {
            left: {
                default: '-ml-8',
                icon: '-ml-6',
            },
            right: {
                default: '-mr-8',
                icon: '-mr-6',
            },
            top: '-mt-5',
            bottom: '-mb-5',
        },
    },
}

type State = 'normal' | 'disabled'

const getButtonClasses = (
    state: State,
    props: Props,
    color: Colors,
    glueClasses: string,
    size: Sizes
): string => {
    return classNames(
        'transition-all active:scale-105 transform duration-150 box-border items-center inline-block font-medium leading-3 tracking-wide text-center whitespace-no-wrap rounded focus:outline-none',
        {
            'cursor-pointer': state !== 'disabled',
            'cursor-not-allowed pointer-events-none': state === 'disabled',
            uppercase: props.uppercase,
            'w-full': props.fullwidth ?? false,
        },

        // for normal styling
        STYLES_MAP[props.style ?? 'filled'].global,
        state === 'disabled'
            ? STYLES_MAP[props.style ?? 'filled'].disabled
            : STYLES_MAP[props.style ?? 'filled'].enabled[color],

        // for sizing
        SIZE_MAP[size][props.square ? 'squareSizing' : 'sizing'],

        // for glue
        glueClasses
    )
}

const getGlueClassHelper = (
    side: GluePositions,
    size: Sizes,
    icon: boolean,
    iconPosition: IconPositions
): string => {
    if (side === 'top' || side === 'bottom') {
        return SIZE_MAP[size].glue[side]
    } else if (side === 'left') {
        if (iconPosition === 'before' && icon) return SIZE_MAP[size].glue[side].icon
        return SIZE_MAP[size].glue[side].default
    } else if (iconPosition === 'after' && icon) {
        return SIZE_MAP[size].glue[side].icon
    }
    return SIZE_MAP[size].glue[side].default
}

const getGlueClasses = (props: Props, size: Sizes, iconPosition: IconPositions): string => {
    let glueClasses = ''
    if (props.glue) {
        const hasIcon = typeof props.icon !== 'undefined'
        props.glue.forEach((side) => {
            glueClasses += getGlueClassHelper(side, size, hasIcon, iconPosition)
            glueClasses += ' '
        })
    }
    return glueClasses
}

const onClick = (
    onClickFunction: (() => void) | undefined,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
): void => {
    if (onClickFunction) onClickFunction()
    if (event) event.currentTarget.blur()
}

const getState = (props: Props): State => {
    if (props.disabled) return 'disabled'
    return 'normal'
}

// eslint-disable-next-line max-lines-per-function -- fix later
export const Button = (props: Props): JSX.Element => {
    const color = props.color ?? 'default'
    const iconPosition = props.iconPosition ?? 'before'
    const size = props.size ?? 'default'
    const glueClasses = getGlueClasses(props, size, iconPosition)
    const state: State = getState(props)

    const buttonClasses = getButtonClasses(state, props, color, glueClasses, size)
    const flexContainer = classNames('flex items-center', {
        'flex-row-reverse': iconPosition === 'before',
    })

    const handleClick = useCallback(
        (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
            onClick(props.onClick, event)
        },
        [props.onClick]
    )

    const iconContents = (
        <div className='items-center inline-block text-center'>
            <div className={flexContainer}>
                {props.autoCapitalization === false ? props.value : sentenceCase(props.value)}
                {props.icon && (
                    <div className={SIZE_MAP[props.size ?? 'default'][iconPosition]}>
                        {props.icon}
                    </div>
                )}
            </div>
        </div>
    )

    if (props.href) {
        return (
            <Link
                href={props.href}
                className={buttonClasses}
                onClick={handleClick}
                download={props.download}
            >
                {iconContents}
            </Link>
        )
    }

    if (props.as && props.as !== 'button') {
        const Tag = props.as
        return <Tag className={buttonClasses}>{iconContents}</Tag>
    }

    return (
        <button
            className={buttonClasses}
            onClick={handleClick}
            disabled={state === 'disabled'}
            type={props.type ?? 'button'}
        >
            {iconContents}
        </button>
    )
}
