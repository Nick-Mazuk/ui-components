import { render, screen } from '@testing-library/react'
import { chance } from 'jest-chance'

import { HelpText } from '../text-input-help-text'

test('renders without crashing', () => {
    const { baseElement } = render(<HelpText text='' />)
    expect(baseElement).not.toBeEmptyDOMElement()
})

describe('help text is rendered correctly', () => {
    test('empty when no text is present', () => {
        const { container } = render(<HelpText text='' />)
        expect(container).toBeEmptyDOMElement()
    })

    const texts = ['hello world', chance.string()]

    test.each(texts)('the text "%s" is rendered', (text) => {
        render(<HelpText text={text} />)
        expect(screen.getByText(text)).toBeTruthy()
    })
})
