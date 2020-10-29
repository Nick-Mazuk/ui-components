import { render, screen } from '@testing-library/react'

import { Progress } from '../text-input-progress'

test('renders without crashing', () => {
    const { baseElement } = render(<Progress text='' invalid={false} />)
    expect(baseElement).not.toBeEmptyDOMElement()
})

test("is empty when there's no text", () => {
    const { container } = render(<Progress text='' invalid />)
    expect(container).toBeEmptyDOMElement()
})

const contents = ['22 / 23', 'One character left']

describe('renders the progress text', () => {
    test.each(contents)('progress "%s" is rendered when provided', (content) => {
        render(<Progress text={content} invalid={false} />)
        expect(screen.getByText(content)).toBeTruthy()
    })
    test.each(contents)('progress "%s" is rendered when provided and invalid', (content) => {
        render(<Progress text={content} invalid />)
        expect(screen.getByText(content)).toBeTruthy()
    })
})

describe('text is correct color', () => {
    test.each(contents)('text has text-error when invalid', (content) => {
        const { container } = render(<Progress text={content} invalid />)
        expect(container.querySelector('div')).toHaveClass('text-error')
    })
    test.each(contents)('text has normal color when valid', (content) => {
        const { container } = render(<Progress text={content} invalid={false} />)
        expect(container.querySelector('div')).not.toHaveClass('text-error')
    })
})
