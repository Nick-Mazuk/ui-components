import { render, screen } from '@testing-library/react'

import { Error } from '../error'

test('renders without crashing', () => {
    const { baseElement } = render(<Error>error</Error>)
    expect(baseElement).not.toBeEmptyDOMElement()
})

const errors = ['error', 'your password is incorrect']
test.each(errors)('displays error "%s" message', (error) => {
    render(<Error>{error}</Error>)
    expect(screen.getByText(`${error}.`)).toBeTruthy()
})

const labels = ['', 'Invalid password']
test.each(labels)('displays custom label "%s"', (label) => {
    render(<Error label={label}>error message</Error>)
    if (label === '') expect(screen.queryByText(/:/u)).toBeFalsy()
    else expect(screen.getByText(`${label}:`)).toBeTruthy()
})

const errorsWithPunctuation = [
    ['error', 'error.'],
    ['error.', 'error.'],
    ['error!', 'error!'],
    ['error?', 'error?'],
]
test.each(errorsWithPunctuation)(
    'ends with proper punctuation: "%s" should be "%s"',
    (error, displayedError) => {
        render(<Error>{error}</Error>)
        expect(screen.getByText(displayedError)).toBeTruthy()
    }
)
