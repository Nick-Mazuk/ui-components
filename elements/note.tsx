import classNames from 'classnames'

import type { TextChildren } from './text'
import { Text } from './text'

type Variants = { default: string; fill: string; contrast: string }
type Types = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'

type Props = {
    children: TextChildren
    small?: boolean
    label?: false | string
    variant?: keyof Variants
    type?: Types
}

const STYLE_MAP: Record<Types, Variants> = {
    default: {
        default: 'border-gray-50',
        fill: 'border-gray-900 bg-gray-900 text-white',
        contrast: 'border-gray-50 bg-gray-50 text-gray-700',
    },
    primary: {
        default: 'border-primary-200 text-primary-700',
        fill: 'border-primary bg-primary text-white',
        contrast: 'border-primary-50 bg-primary-50 text-primary-700',
    },
    secondary: {
        default: 'border-gray-200 text-gray-700',
        fill: 'border-gray bg-gray text-white',
        contrast: 'border-gray-20 bg-gray-20 text-gray-600',
    },
    success: {
        default: 'border-success-200 text-success-700',
        fill: 'border-success bg-success text-white',
        contrast: 'border-success-50 bg-success-50 text-success-700',
    },
    warning: {
        default: 'border-warning-200 text-warning',
        fill: 'border-warning-300 bg-warning-300 text-white',
        contrast: 'border-warning-50 bg-warning-50 text-warning-700',
    },
    error: {
        default: 'border-error-200 text-error-700',
        fill: 'border-error bg-error text-white',
        contrast: 'border-error-50 bg-error-50 text-error-700',
    },
}

export const Note = ({
    children,
    small = false,
    label = 'Note',
    variant = 'default',
    type = 'default',
}: Props): JSX.Element => {
    const containerClasses = classNames(
        'border rounded-lg flex items-center',
        STYLE_MAP[type][variant],
        {
            'px-6 py-4': !small,
            'px-3 py-2': small,
        }
    )
    return (
        <div className={containerClasses}>
            <Text small>
                <Text bold uppercase span>
                    {label === false ? '' : `${label}:`}
                </Text>{' '}
                <Text span>{children}</Text>
            </Text>
        </div>
    )
}

export type Note = ReturnType<typeof Note>
