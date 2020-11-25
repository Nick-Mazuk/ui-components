import classNames from 'classnames'

import { Text } from './text'

type Type =
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'success'
    | 'highlight'
    | 'white'
    | 'black'

type Props = {
    children: string
    type?: Type
    contrast?: boolean
    uppercase?: boolean
    outline?: boolean
    size?: 'small' | 'default'
}

type ColorStyles = {
    regular: string
    contrast: string
    outline: string
}

type Style = 'regular' | 'contrast' | 'outline'

const STYLES_MAP: Record<Type, ColorStyles> = {
    primary: {
        regular:
            'bg-primary text-white border-primary dark:bg-primary-d dark:text-black dark:border-primary-d',
        contrast:
            'bg-primary-50 text-primary-700 border-primary-50 dark:bg-primary-d50 dark:text-primary-d700 dark:border-primary-d50',
        outline: 'text-primary border-primary-200 dark:text-primary-d dark:border-primary-d200',
    },
    secondary: {
        regular: 'bg-gray text-white border-gray dark:bg-gray-d dark:text-black dark:border-gray-d',
        contrast:
            'bg-gray-50 text-gray-700 border-gray-50 dark:bg-gray-d50 dark:text-gray-d700 dark:border-gray-d50',
        outline: 'text-gray border-gray-200 dark:text-gray-d dark:border-gray-d200',
    },
    error: {
        regular:
            'bg-error text-white border-error dark:bg-error-d dark:text-black dark:border-error-d',
        contrast:
            'bg-error-50 text-error-700 border-error-50 dark:bg-error-d50 dark:text-error-d700 dark:border-error-d50',
        outline: 'text-error border-error-200 dark:text-error-d dark:border-error-d200',
    },
    warning: {
        regular:
            'bg-warning text-white border-warning dark:bg-warning-d dark:text-black dark:border-warning-d',
        contrast:
            'bg-warning-50 text-warning-700 border-warning-50 dark:bg-warning-d50 dark:text-warning-d700 dark:border-warning-d50',
        outline: 'text-warning border-warning-200 dark:text-warning-d dark:border-warning-d200',
    },
    success: {
        regular:
            'bg-success text-white border-success dark:bg-success-d dark:text-black dark:border-success-d',
        contrast:
            'bg-success-50 text-success-700 border-success-50 dark:bg-success-d50 dark:text-success-d700 dark:border-success-d50',
        outline: 'text-success border-success-200 dark:text-success-d dark:border-success-d200',
    },
    highlight: {
        regular:
            'bg-highlight text-white border-highlight dark:bg-highlight-d dark:text-black dark:border-highlight-d',
        contrast:
            'bg-highlight-50 text-highlight-700 border-highlight-50 dark:bg-highlight-d50 dark:text-highlight-d700 dark:border-highlight-d50',
        outline:
            'text-highlight border-highlight-200 dark:text-highlight-d dark:border-highlight-d200',
    },
    white: {
        regular:
            'bg-gray-900 text-white border-gray-900 dark:bg-gray-d900 dark:text-gray-d20 dark:border-gray-d900',
        contrast:
            'bg-gray-20 text-gray-900 border-gray-900 dark:bg-gray-d20 dark:text-gray-d900 dark:border-gray-d900',
        outline: 'text-white border-white dark:text-black dark:border-black',
    },
    black: {
        regular:
            'bg-gray-20 text-gray-900 border-gray-20 dark:bg-gray-d20 dark:text-gray-d900 dark:border-gray-d20',
        contrast:
            'bg-gray-900 text-gray-20 border-gray-20 dark:bg-gray-d900 dark:text-gray-d20 dark:border-gray-d20',
        outline: 'text-black border-black dark:text-white dark:border-white',
    },
}

export const Badge = ({
    children,
    type = 'secondary',
    contrast,
    uppercase = false,
    outline,
    size = 'default',
}: Props): JSX.Element => {
    let style: Style = 'regular'
    if (outline) style = 'outline'
    else if (contrast) style = 'contrast'

    const badgeClasses = classNames(
        'rounded-full inline-block border leading-7 px-2 py-px',
        STYLES_MAP[type][style]
    )
    return (
        <div className={badgeClasses} data-testid='badge'>
            <Text small={size === 'small'} uppercase={uppercase}>
                {children}
            </Text>
        </div>
    )
}

export type Badge = ReturnType<typeof Badge>
