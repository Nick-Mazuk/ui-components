import classNames from 'classnames'

import type { Icon } from '../../../../elements/icon'
import type { Sizes } from '../text-input-base'
import { Suggestion } from './suggestion'

type Props = {
    children?: never
    activeSuggestion?: number
    suggestions?: string[]
    icon?: Icon
    isInputFocused?: boolean
    onSuggestionClick?: (value: string) => void
    size: Sizes
}

type Size = {
    suggestionContainer: string
}

const SIZE_MAP: Record<Sizes, Size> = {
    small: { suggestionContainer: 'pt-2' },
    default: { suggestionContainer: 'pt-3' },
    large: { suggestionContainer: 'pt-4' },
}

export const TextInputSuggestions = ({
    suggestions,
    icon,
    activeSuggestion,
    isInputFocused,
    onSuggestionClick,
    size,
}: Props): JSX.Element => {
    if (
        !isInputFocused ||
        typeof suggestions === 'undefined' ||
        suggestions.length === 0 ||
        typeof onSuggestionClick === 'undefined'
    )
        // eslint-disable-next-line react/jsx-no-useless-fragment -- base case
        return <></>

    const suggestionClasses = classNames('relative', SIZE_MAP[size].suggestionContainer)
    return (
        <>
            <div
                className='absolute z-10 w-full -mt-3 overflow-hidden text-gray-900 rounded-b'
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
                    <div className='absolute inset-0 rounded pointer-events-none user-select-none shadow-input-outline' />
                </div>
            </div>
            <div
                className='absolute left-0 right-0 z-20 flex flex-col justify-around h-2 -mt-3 bg-white'
                style={{ marginLeft: '2px', marginRight: '2px' }}
            >
                <div className='mx-4 border-t border-gray-100' />
            </div>
        </>
    )
}
