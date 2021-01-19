import classNames from 'classnames'

import type { Icon } from '../../../../elements/icon'
import { Text } from '../../../../elements/text'
import { WithClick } from '../../../../hoc/with-click'
import type { Sizes } from '../text-input-base'

type Props = {
    children: string
    icon?: Icon
    isActive?: boolean
    onClick: (value: string) => void
    size: Sizes
}

type Size = {
    noIcon: string
    icon: string
    container: string
}

const SIZE_MAP: Record<Sizes, Size> = {
    small: {
        noIcon: 'pl-3',
        icon: `w-4 ml-3 mr-2`,
        container: 'py-px',
    },
    default: {
        noIcon: 'pl-4',
        icon: 'w-5 ml-5 mr-2',
        container: 'py-1',
    },
    large: {
        noIcon: 'pl-6',
        icon: 'w-6 ml-5 mr-3',
        container: 'py-2',
    },
}

export const Suggestion = ({ children, icon, isActive, onClick, size }: Props): JSX.Element => {
    const handleClick = () => {
        onClick(children)
    }
    const containerClasses = classNames(
        'flex items-center w-full cursor-pointer hover:bg-gray-30',
        SIZE_MAP[size].container,
        icon ? '' : SIZE_MAP[size].noIcon,
        { 'bg-gray-30': isActive }
    )
    const iconClasses = classNames('flex-none text-gray-600', SIZE_MAP[size].icon)
    return (
        <WithClick
            onClick={handleClick}
            name={`Select ${children}`}
            className={containerClasses}
            tabIndex={-1}
            testId='text-input-suggestion'
        >
            {icon && <div className={iconClasses}>{icon}</div>}
            <Text>{children}</Text>
        </WithClick>
    )
}
