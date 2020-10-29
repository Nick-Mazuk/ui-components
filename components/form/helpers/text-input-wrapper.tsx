import type { ReactNode } from 'react'

import classNames from 'classnames'

type Props = {
    children: ReactNode | ReactNode[]
    hasError?: boolean
    disabled?: boolean
}

export const TextInputWrapper = ({
    children,
    hasError = false,
    disabled = false,
}: Props): JSX.Element => {
    const wrapperClasses = classNames(
        'flex items-center',
        'rounded overflow-hidden',
        'transition-all duration-150 relative',
        {
            'text-gray-200 focus-within:text-gray bg-white': !disabled,
            'bg-gray-20 text-gray-100 cursor-not-allowed': disabled,
            'shadow-input-border hover:shadow-input-hover focus-within:shadow-input-outline':
                !hasError && !disabled,
            'shadow-input-error-border hover:shadow-input-error-outline focus-within:shadow-input-error-outline':
                hasError && !disabled,
        }
    )
    return (
        <div className={wrapperClasses} data-testid='text-input-wrapper'>
            {children}
        </div>
    )
}

export type TextInputWrapper = ReturnType<typeof TextInputWrapper>
