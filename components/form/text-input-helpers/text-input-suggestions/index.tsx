import classNames from 'classnames'

import type { Icon } from '../../../../elements/icon'
import type { Sizes } from '../text-input-base'
import { Suggestion } from './suggestion'

type Props = {
    children?: never
    activeSuggestion?: number
    suggestions?: string[]
    icon?: Icon
    showSuggestions?: boolean
    onSuggestionClick?: (value: string) => void
    size: Sizes
}

type Size = {
    suggestionContainer: string
    divider: string
}

const SIZE_MAP: Record<Sizes, Size> = {
    small: {
        suggestionContainer: 'pt-2',
        divider: 'mx-3',
    },
    default: {
        suggestionContainer: 'pt-3',
        divider: 'mx-4',
    },
    large: {
        suggestionContainer: 'pt-4',
        divider: 'mx-4',
    },
}

export const TextInputSuggestions = ({
    suggestions,
    icon,
    activeSuggestion,
    showSuggestions,
    onSuggestionClick,
    size,
}: Props): JSX.Element => {
    if (
        !showSuggestions ||
        typeof suggestions === 'undefined' ||
        suggestions.length === 0 ||
        typeof onSuggestionClick === 'undefined'
    )
        // eslint-disable-next-line react/jsx-no-useless-fragment -- base case
        return <></>
    const suggestionClasses = classNames('relative', SIZE_MAP[size].suggestionContainer)
    const dividerClasses = classNames('border-t border-gray-100', SIZE_MAP[size].divider)
    return (
        <>
            <div
                className='absolute z-10 w-full -top-3 overflow-hidden text-gray-900 rounded-b bg-white'
                data-testid='text-input-suggestions'
            >
                <div className={suggestionClasses}>
                    {suggestions.map((suggestion, index) => {
                        return (
                            <Suggestion
                                key={suggestion}
                                icon={icon}
                                isActive={activeSuggestion === index}
                                onClick={onSuggestionClick}
                                size={size}
                            >
                                {suggestion}
                            </Suggestion>
                        )
                    })}
                    <div className='absolute inset-0 -top-1 rounded pointer-events-none user-select-none shadow-input-outline' />
                </div>
            </div>
            <div
                className='absolute left-0 right-0 z-20 flex flex-col justify-around h-2 -top-3 bg-white'
                style={{ marginLeft: '2px', marginRight: '2px' }}
            >
                <div className={dividerClasses} />
            </div>
        </>
    )
}
