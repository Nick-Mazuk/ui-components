import classNames from 'classnames'

type Colors = 'primary' | 'secondary' | 'success' | 'error' | 'warning'

type Properties = {
    value: number
    max?: number
    color?: Colors
    size?: 'default' | 'large'
}

const COLORS_MAP: Record<Colors, string> = {
    primary: 'bg-primary dark:bg-primary-d',
    secondary: 'bg-gray dark:bg-gray-d',
    success: 'bg-success dark:bg-success-d',
    error: 'bg-error dar:bg-error-d',
    warning: 'bg-warning dark:bg-warning-d',
}

export const Progress = ({
    value,
    max = 100,
    color = 'secondary',
    size = 'default',
}: Properties): JSX.Element => {
    const containerClasses = classNames(
        'relative w-full bg-gray-50 rounded-full dark:bg-gray-d50',
        {
            'h-2': size === 'default',
            'h-4': size === 'large',
        }
    )
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
