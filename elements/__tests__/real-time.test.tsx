import { render } from '@testing-library/react'

import { RealTime } from '../real-time'

test('renders without crashing', () => {
    const { baseElement } = render(<RealTime />)
    expect(baseElement).not.toBeEmptyDOMElement()
})

const labels = [undefined, 'Live stats', 'Breaking news', 'Breaking news.']
test.each(labels)('shows label "%s"', (label) => {
    render(<RealTime label={label} />)
})
