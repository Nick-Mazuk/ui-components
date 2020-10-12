import classNames from 'classnames'

import { Text } from '../../elements/text'

type Colors = 'primary' | 'error' | 'success' | 'warning' | 'default' | 'highlight'
type Stat = {
    value: string
    label: string
}

type Properties = {
    stats: [Stat, Stat, Stat]
    color?: Colors
}

type Color = {
    background: string
    divide: string
    value: string
    label: string
}

const COLOR_MAP: Record<Colors, Color> = {
    primary: {
        background: 'from-primary-700 to-primary',
        divide: 'divide-primary-400',
        value: 'text-white',
        label: 'text-primary-100',
    },
    success: {
        background: 'from-success-700 to-success',
        divide: 'divide-success-400',
        value: 'text-white',
        label: 'text-success-100',
    },
    warning: {
        background: 'from-warning-700 to-warning',
        divide: 'divide-warning-400',
        value: 'text-white',
        label: 'text-warning-100',
    },
    error: {
        background: 'from-error-700 to-error',
        divide: 'divide-error-400',
        value: 'text-white',
        label: 'text-error-100',
    },
    default: {
        background: 'from-gray-700 to-gray',
        divide: 'divide-gray-400',
        value: 'text-white',
        label: 'text-gray-100',
    },
    highlight: {
        background: 'from-highlight-700 to-highlight',
        divide: 'divide-highlight-400',
        value: 'text-white',
        label: 'text-highlight-100',
    },
}

const Stat = ({
    value,
    label,
    color,
}: {
    value: string
    label: string
    color: Colors
}): JSX.Element => {
    return (
        <div className='flex flex-col space-y-2'>
            <Text h2 as='p' color={COLOR_MAP[color].value}>
                {value}
            </Text>
            <Text uppercase tiny color={COLOR_MAP[color].label}>
                {label}
            </Text>
        </div>
    )
}

export const StatBar = ({ color = 'default', stats }: Properties): JSX.Element => {
    const backgroundClasses = classNames(
        'absolute inset-0 transform -skew-y-1.5 bg-gradient-to-tr',
        COLOR_MAP[color].background
    )

    const containerClasses = classNames(
        'relative grid max-w-6xl grid-cols-3 text-center divide-x wrapper',
        COLOR_MAP[color].divide
    )

    return (
        <section className='relative py-10'>
            <div className={backgroundClasses} />
            <div className={containerClasses}>
                <Stat value={stats[0].value} label={stats[0].label} color={color} />
                <Stat value={stats[1].value} label={stats[1].label} color={color} />
                <Stat value={stats[2].value} label={stats[2].label} color={color} />
            </div>
        </section>
    )
}

export type StatBar = ReturnType<typeof StatBar>
