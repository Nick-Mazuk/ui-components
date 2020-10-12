import type { ReactNode } from 'react'

import classNames from 'classnames'

type Size = 'small' | 'default' | 'large' | 'larger' | 'none'
type Glue = ('left' | 'right' | 'top' | 'bottom')[]
type Shadows = 'none' | 'small' | 'medium' | 'large'
type Style =
    | 'default'
    | 'transparent'
    | 'primary'
    | 'success'
    | 'error'
    | 'warning'
    | 'highlight'
    | 'gray'
    | 'outline'
    | 'white'

type Props = {
    children: ReactNode | string | ReactNode[]
    padding?: Size
    glue?: Glue
    contain?: boolean
    style?: Style
    shadow?: Shadows
}

type Sizing = {
    padding: string
    glue: {
        top: string
        bottom: string
        left: string
        right: string
    }
}

const SIZE_MAP: Record<Size, Sizing> = {
    none: {
        padding: 'p-0',
        glue: {
            top: '-mt-0',
            bottom: '-mb-0',
            left: '-ml-0',
            right: '-mr-0',
        },
    },
    small: {
        padding: 'p-2 sm:p-4',
        glue: {
            top: '-mt-2 sm:-mt-4',
            bottom: '-mt-2 sm:-mb-4',
            left: '-mt-2 sm:-ml-4',
            right: '-mt-2 sm:-mr-4',
        },
    },
    default: {
        padding: 'p-4 sm:p-6',
        glue: {
            top: '-ml-4 sm:-mt-6',
            bottom: '-ml-4 sm:-mb-6',
            left: '-ml-4 sm:-ml-6',
            right: '-ml-4 sm:-mr-6',
        },
    },
    large: {
        padding: 'p-6 sm:p-8',
        glue: {
            top: '-mt-6 sm:-mt-8',
            bottom: '-mb-6 sm:-mb-8',
            left: '-ml-6 sm:-ml-8',
            right: '-mr-6 sm:-mr-8',
        },
    },
    larger: {
        padding: 'p-6 sm:p-12',
        glue: {
            top: '-mt-6 sm:-mt-12',
            bottom: '-mb-6 sm:-mb-12',
            left: '-ml-6 sm:-ml-12',
            right: '-mr-6 sm:-mr-12',
        },
    },
}

const STYLE_MAP: Record<Style, string> = {
    default: 'bg-gray-10 dark:bg-gray-d50',
    transparent: 'bg-transparent',
    primary: 'bg-primary text-white dark:bg-primary-d dark:text-black',
    success: 'bg-success text-white dark:bg-success-d dark:text-black',
    error: 'bg-error text-white dark:bg-error-d dark:text-black',
    warning: 'bg-warning-200 text-warning-900 dark:bg-warning-d300 dark:text-warning-d900',
    highlight: 'bg-highlight text-white dark:bg-highlight-d dark:text-black',
    gray: 'bg-gray text-white dark:bg-gray-d dark:text-black',
    white: 'bg-white text-gray-900 dark:bg-gray-d dark:text-white',
    outline: 'border border-gray-100 dark:border-gray-d100',
}

const SHADOW_MAP: Record<Shadows, string> = {
    none: '',
    small: 'shadow-md',
    medium: 'shadow-lg',
    large: 'shadow-xl',
}

const getGlueClasses = (glue: Glue, size: Size): string => {
    let glueClasses = ''
    glue.forEach((side) => {
        glueClasses += SIZE_MAP[size].glue[side]
        glueClasses += ' '
    })
    return glueClasses
}

export const Box = ({
    children,
    padding = 'default',
    glue,
    contain,
    style = 'default',
    shadow = 'none',
}: Props): JSX.Element => {
    const glueClasses = glue && padding !== 'none' ? getGlueClasses(glue, padding) : ''

    const boxClasses = classNames(
        'rounded-lg box-border h-full w-full',
        SIZE_MAP[padding].padding,
        STYLE_MAP[style],
        SHADOW_MAP[shadow],
        glueClasses,
        {
            'overflow-hidden': contain,
        }
    )

    return <div className={boxClasses}>{children}</div>
}

export type Box = ReturnType<typeof Box>
