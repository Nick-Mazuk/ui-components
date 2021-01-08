import classNames from 'classnames'

type Color = 'secondary' | 'error' | 'warning' | 'success'

type Props = {
    children?: never
    color?: Color
    ping?: boolean
}

const COLOR_MAP: Record<Color, string> = {
    secondary: 'bg-gray-400',
    error: 'bg-error-400',
    warning: 'bg-warning-200',
    success: 'bg-success-400',
}

export const StatusDot = ({ color = 'secondary', ping = false }: Props): JSX.Element => {
    const dotClasses = classNames('w-2 absolute h-2 rounded-full', COLOR_MAP[color])
    const pingClasses = classNames(dotClasses, { 'animate-ping': ping })

    return (
        <div className='relative w-2 h-2'>
            <div className={dotClasses} />
            <div className={pingClasses} />
        </div>
    )
}

export type StatusDot = ReturnType<typeof StatusDot>
