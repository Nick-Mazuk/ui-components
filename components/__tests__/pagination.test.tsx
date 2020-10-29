import { render, screen } from '@testing-library/react'

import { Pagination } from '../pagination'

/* left:
   - test that pressing each button calls the onPageChange function
   - test that each function call has the correct parameters
   - ensure that there are enough surrounding buttons
   - ensure that separators are present when necessary */

const handlePageChange = jest.fn()

test('renders without crashing', () => {
    const { baseElement } = render(
        <Pagination current={3} pageCount={10} onPageChange={handlePageChange} />
    )
    expect(baseElement).not.toBeEmptyDOMElement()
})

const pageCombos = [
    [1, 10],
    [4, 10],
    [4, 4],
]
test.each(pageCombos)(
    'only the current button is highlighted with current: "%s", pageCount: "%s"',
    (current, pageCount) => {
        const { container } = render(
            <Pagination current={current} pageCount={pageCount} onPageChange={handlePageChange} />
        )
        const buttons = container.querySelectorAll('button.bg-primary')
        expect(buttons).toHaveLength(1)
        expect(buttons[0]).toHaveTextContent(String(current))
    }
)

describe('next/previous buttons are shown', () => {
    test('previous button is not shown when current page is 1', () => {
        render(<Pagination current={1} pageCount={10} onPageChange={handlePageChange} />)
        expect(screen.queryByText('Previous')).toBeFalsy()
    })
    test('previous button is shown when current page is not 1', () => {
        render(<Pagination current={2} pageCount={10} onPageChange={handlePageChange} />)
        expect(screen.getByText('Previous')).toBeTruthy()
    })
    test('next button is not shown when current page is same as pageCount', () => {
        render(<Pagination current={10} pageCount={10} onPageChange={handlePageChange} />)
        expect(screen.queryByText('Next')).toBeFalsy()
    })
    test('next button is shown when current page is less than pageCount', () => {
        render(<Pagination current={2} pageCount={10} onPageChange={handlePageChange} />)
        expect(screen.getByText('Next')).toBeTruthy()
    })
    test('if pageCount equals one, neither button is shown', () => {
        render(<Pagination current={1} pageCount={1} onPageChange={handlePageChange} />)
        expect(screen.queryByText('Previous')).toBeFalsy()
        expect(screen.queryByText('Next')).toBeFalsy()
    })
})
