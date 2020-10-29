import { render, screen } from '@testing-library/react'

import { Badge } from '../badge'

test('renders without crashing', () => {
    const { baseElement } = render(<Badge>Badge</Badge>)
    expect(baseElement).not.toBeEmptyDOMElement()
})

const texts = ['Badge', 'badge', 'two words']
it.each(texts)('text "%s" is children', (text) => {
    render(<Badge>{text}</Badge>)
    expect(screen.getByTestId('badge')).toHaveTextContent(text)
})
