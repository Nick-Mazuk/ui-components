import { useCallback } from 'react'

import classNames from 'classnames'

import { X } from '../../elements/icon'

type Size = 'small' | 'default'

type Properties = {
    children: string
    size?: Size
    id?: string
    onRemove?: (id: string) => void
}

type Sizing = {
    global: string
    withDelete: string
    withoutDelete: string
    delete: string
    icon: string
}

const SIZE_MAP: Record<Size, Sizing> = {
    small: {
        global: 'text-sm py-2 pl-2',
        withoutDelete: 'pr-2 rounded',
        withDelete: 'pr-1 rounded-l',
        delete: 'px-2',
        icon: 'w-3',
    },
    default: {
        global: 'pl-3 py-2',
        withoutDelete: 'pr-3 rounded',
        withDelete: 'pr-1 rounded-l',
        delete: 'px-2',
        icon: 'w-4',
    },
}

export const Tag = ({ children, size = 'default', onRemove, id = '' }: Properties): JSX.Element => {
    const tagClasses = classNames(
        'inline-block leading-3 text-gray-800 bg-gray-50 dark:bg-gray-d50 dark:text-gray-d800',
        SIZE_MAP[size].global,
        SIZE_MAP[size][onRemove ? 'withDelete' : 'withoutDelete']
    )
    const deleteClasses = classNames(
        'text-gray-600 dark:text-gray-d600 transition-colors duration-150 bg-gray-50 dark:bg-gray-d50 rounded-r hover:bg-error hover:text-white focus:bg-error focus:text-white dark:hover:bg-error-d dark:hover:text-black dark:focus:bg-error-d dark:focus:text-black focus:outline-none',
        SIZE_MAP[size].delete
    )

    const handleOnClick = useCallback(() => {
        if (onRemove) onRemove(id)
    }, [id, onRemove])

    return (
        <div className='flex'>
            <div className={tagClasses}>{children}</div>
            {onRemove && (
                <button onClick={handleOnClick} className={deleteClasses}>
                    <X width={SIZE_MAP[size].icon} />
                    <span className='hidden'>Delete {children}</span>
                </button>
            )}
        </div>
    )
}

export type Tag = ReturnType<typeof Tag>
