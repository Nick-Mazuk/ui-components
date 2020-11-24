import classNames from 'classnames'

type Colors = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'dark'

type Properties = {
    value: number
    max?: number
    color?: Colors
    size?: 'default' | 'large'
    transparentBackground?: boolean
}

const COLORS_MAP: Record<Colors, string> = {
    primary: 'bg-primary dark:bg-primary-d',
    secondary: 'bg-gray dark:bg-gray-d',
    success: 'bg-success dark:bg-success-d',
    error: 'bg-error dar:bg-error-d',
    warning: 'bg-warning dark:bg-warning-d',
    dark: 'bg-gray-700 dark:bg-gray-d700',
}

export const Progress = ({
    value,
    max = 100,
    color = 'secondary',
    size = 'default',
    transparentBackground = false,
}: Properties): JSX.Element => {
    const containerClasses = classNames('relative w-full rounded-full dark:bg-gray-d50', {
        'h-2': size === 'default',
        'h-4': size === 'large',
        'bg-gray-50': !transparentBackground,
    })
    const barClasses = classNames(
        'h-full transition-all duration-150 rounded-full',
        COLORS_MAP[color]
    )
    return (
        <div className={containerClasses}>
            <div className={barClasses} style={{ width: `${(value / max) * 100}%` }} />
        </div>
    )
}

export type Progress = ReturnType<typeof Progress>
