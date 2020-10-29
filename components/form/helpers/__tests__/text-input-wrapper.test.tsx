import { render, screen } from '@testing-library/react'

import { TextInputWrapper } from '../text-input-wrapper'

const defaultClass = 'shadow-input-border'
const errorClass = 'shadow-input-error-border'
const disabledClass = 'cursor-not-allowed'

test('renders without crashing', () => {
    const { baseElement } = render(
        <TextInputWrapper hasError={false} disabled={false}>
            {' '}
        </TextInputWrapper>
    )
    expect(baseElement).not.toBeEmptyDOMElement()
})

describe('styled correctly for disabled and error', () => {
    test('has default styles', () => {
        render(
            <TextInputWrapper hasError={false} disabled={false}>
                {' '}
            </TextInputWrapper>
        )
        expect(screen.getByTestId('text-input-wrapper')).toHaveClass(defaultClass)
        expect(screen.getByTestId('text-input-wrapper')).not.toHaveClass(errorClass)
        expect(screen.getByTestId('text-input-wrapper')).not.toHaveClass(disabledClass)
    })
    test("has disabled styles when there's no error", () => {
        render(
            <TextInputWrapper hasError={false} disabled>
                {' '}
            </TextInputWrapper>
        )
        expect(screen.getByTestId('text-input-wrapper')).not.toHaveClass(defaultClass)
        expect(screen.getByTestId('text-input-wrapper')).not.toHaveClass(errorClass)
        expect(screen.getByTestId('text-input-wrapper')).toHaveClass(disabledClass)
    })
    test("has disabled styles when there's is an error", () => {
        render(
            <TextInputWrapper hasError disabled>
                {' '}
            </TextInputWrapper>
        )
        expect(screen.getByTestId('text-input-wrapper')).not.toHaveClass(defaultClass)
        expect(screen.getByTestId('text-input-wrapper')).not.toHaveClass(errorClass)
        expect(screen.getByTestId('text-input-wrapper')).toHaveClass(disabledClass)
    })
    test('has error styles', () => {
        render(
            <TextInputWrapper hasError disabled={false}>
                {' '}
            </TextInputWrapper>
        )
        expect(screen.getByTestId('text-input-wrapper')).not.toHaveClass(defaultClass)
        expect(screen.getByTestId('text-input-wrapper')).toHaveClass(errorClass)
        expect(screen.getByTestId('text-input-wrapper')).not.toHaveClass(disabledClass)
    })
})
