import classNames from 'classnames'

type Color = 'secondary' | 'error' | 'warning' | 'success'

type Props = {
    children?: never
    color?: Color
}

const COLOR_MAP: Record<Color, string> = {
    secondary: 'bg-gray-400',
    error: 'bg-error-400',
    warning: 'bg-warning-200',
    success: 'bg-success-400',
}

export const StatusDot = ({ color = 'secondary' }: Props): JSX.Element => {
    const classes = classNames('w-2 h-2 rounded-full', COLOR_MAP[color])

    return <div className={classes} />
}

export type StatusDot = ReturnType<typeof StatusDot>
