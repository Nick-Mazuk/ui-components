import classNames from 'classnames'

type Colors = 'primary' | 'secondary' | 'success' | 'error' | 'warning'

type Properties = {
    value: number
    max?: number
    color?: Colors
}

const COLORS_MAP: Record<Colors, string> = {
    primary: 'bg-primary dark:bg-primary-d',
    secondary: 'bg-gray-600 dark:bg-gray-d600',
    success: 'bg-success dark:bg-success-d',
    error: 'bg-error dar:bg-error-d',
    warning: 'bg-warning dark:bg-warning-d',
}

export const Progress = ({ value, max = 100, color = 'secondary' }: Properties): JSX.Element => {
    const barClasses = classNames(
        'h-full transition-all duration-150 rounded-full',
        COLORS_MAP[color]
    )
    return (
        <div className='relative w-full h-2 bg-gray-200 rounded-full dark:bg-gray-d200'>
            <div className={barClasses} style={{ width: `${(value / max) * 100}%` }} />
        </div>
    )
}

export type Progress = ReturnType<typeof Progress>
