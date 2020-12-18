import { render, screen } from '@testing-library/react'

import { Feedback } from '../text-input-feedback'

test('renders without crashing', () => {
    const { baseElement } = render(<Feedback error='' success='' />)
    expect(baseElement).not.toBeEmptyDOMElement()
})

describe('show correct feedback message', () => {
    test("Show error when there's an error", () => {
        render(<Feedback error='error message' success='' />)
        expect(screen.getByText('error message.')).toBeTruthy()
    })
    test("Show error when there's an error and success", () => {
        render(<Feedback error='error message' success='success message' />)
        expect(screen.getByText('error message.')).toBeTruthy()
        expect(screen.queryByText('success message.')).toBeFalsy()
    })
    test("Show success when there's an success", () => {
        render(<Feedback error='' success='success message' />)
        expect(screen.queryByText('error message.')).toBeFalsy()
        expect(screen.getByText('success message.')).toBeTruthy()
    })
})

test('is empty when no feedback is present', () => {
    const { container } = render(<Feedback error='' success='' />)
    expect(container).toBeEmptyDOMElement()
})
