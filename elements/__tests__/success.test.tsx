import { render, screen } from '@testing-library/react'

import { Success } from '../success'

test('renders without crashing', () => {
    const { baseElement } = render(<Success>success message</Success>)
    expect(baseElement).not.toBeEmptyDOMElement()
})

const successes = ['success', 'your email is valid']
test.each(successes)('displays success message "%s"', (success) => {
    render(<Success>{success}</Success>)
    expect(screen.getByText(`${success}.`)).toBeTruthy()
})

const labels = ['', 'Username available']
test.each(labels)('displays custom label "%s"', (label) => {
    render(<Success label={label}>success message</Success>)
    if (label === '') expect(screen.queryByText(/:/u)).toBeFalsy()
    else expect(screen.getByText(`${label}:`)).toBeTruthy()
})

const successWithPunctuation = [
    ['success', 'success.'],
    ['success.', 'success.'],
    ['success!', 'success!'],
    ['success?', 'success?'],
]
test.each(successWithPunctuation)(
    'ends with proper punctuation: "%s" should be "%s"',
    (success, displayedSuccess) => {
        render(<Success>{success}</Success>)
        expect(screen.getByText(displayedSuccess)).toBeTruthy()
    }
)
