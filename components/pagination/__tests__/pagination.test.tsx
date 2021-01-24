import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Pagination } from '..'

const handlePageChange = jest.fn()

test('renders without crashing', () => {
    const { baseElement } = render(
        <Pagination current={3} pageCount={10} onPageChange={handlePageChange} />
    )
    expect(baseElement).not.toBeEmptyDOMElement()
})

// current, pageCount, surroundCurrent = 1, expectedButtons, number of separators
type PageCombo = [number, number, number | undefined, (number | 'Previous' | 'Next')[], 0 | 1 | 2]

/* eslint-disable no-magic-numbers -- defining the magic numbers*/
const pageCombos: PageCombo[] = [
    [1, 10, undefined, [1, 2, 10, 'Next'], 1],
    [4, 10, undefined, ['Previous', 1, 3, 4, 5, 10, 'Next'], 2],
    [4, 4, undefined, ['Previous', 1, 3, 4], 1],
    [2, 3, undefined, ['Previous', 1, 2, 3, 'Next'], 0],
    [1, 11, 2, [1, 2, 3, 11, 'Next'], 1],
    [4, 11, 2, ['Previous', 1, 2, 3, 4, 5, 6, 11, 'Next'], 1],
    [5, 5, 2, ['Previous', 1, 3, 4, 5], 1],
]
/* eslint-enable no-magic-numbers -- defining the magic numbers*/

test.each(pageCombos)(
    'correct buttons are shown. current: "%s", pageCount: "%s", surroundCurrent: "%s"',
    (current, pageCount, surroundCurrent, shownButtons) => {
        render(
            <Pagination
                current={current}
                pageCount={pageCount}
                surroundCurrent={surroundCurrent}
                onPageChange={handlePageChange}
            />
        )
        const buttons = screen.getAllByRole('button')
        expect(buttons).toHaveLength(shownButtons.length)
        for (const button of buttons) {
            const content = button.textContent
            if (content === 'Previous' || content === 'Next')
                expect(shownButtons.includes(content)).toBeTruthy()
            else if (content) expect(shownButtons.includes(parseInt(content))).toBeTruthy()
            else expect(false).toBeTruthy()
        }
    }
)

test.each(pageCombos)(
    'correct separators are shown. current: "%s", pageCount: "%s", surroundCurrent: "%s"',
    (current, pageCount, surroundCurrent, _, separatorCount) => {
        render(
            <Pagination
                current={current}
                pageCount={pageCount}
                surroundCurrent={surroundCurrent}
                onPageChange={handlePageChange}
            />
        )
        expect(screen.queryAllByText('…')).toHaveLength(separatorCount)
    }
)

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

test.each(pageCombos)(
    'all buttons call onPageChange with correct parameters: "%s", pageCount: "%s"',
    (current, pageCount) => {
        const mock = jest.fn()
        render(<Pagination current={current} pageCount={pageCount} onPageChange={mock} />)
        const buttons = screen.getAllByRole('button')

        for (const [index, button] of buttons.entries()) {
            userEvent.click(button)
            expect(mock).toHaveBeenCalledTimes(index + 1)
            if (button.textContent === 'Previous')
                expect(mock).toHaveBeenLastCalledWith(current - 1)
            else if (button.textContent === 'Next')
                expect(mock).toHaveBeenLastCalledWith(current + 1)
            else expect(mock).toHaveBeenLastCalledWith(parseInt(button.textContent ?? '-1'))
        }
    }
)

const invalidPageCombos: [number, number][] = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [-1, 0],
    [0, -1],
    [0, -2],
    [0, -3],
    [1.1, 10],
    [1, 10.1],
]

test.each(invalidPageCombos)(
    'invalid page combo current: "%s", pageCount: "%s", has empty renderer',
    (current, pageCount) => {
        const { container } = render(
            <Pagination current={current} pageCount={pageCount} onPageChange={handlePageChange} />
        )
        expect(container).toBeEmptyDOMElement()
    }
)

/* eslint-disable no-magic-numbers -- defining the magic numbers*/
// current, pageCount, surroundCurrent = 1, expectedButtons, number of separators
const startOnlyCombos: PageCombo[] = [
    [1, 10, undefined, [1, 2, 'Next'], 0],
    [4, 10, undefined, ['Previous', 1, 3, 4, 5, 'Next'], 1],
    [4, 4, undefined, ['Previous', 1, 3, 4], 1],
    [2, 3, undefined, ['Previous', 1, 2, 3, 'Next'], 0],
    [1, 11, 2, [1, 2, 3, 'Next'], 0],
    [4, 11, 2, ['Previous', 1, 2, 3, 4, 5, 6, 'Next'], 0],
    [5, 5, 2, ['Previous', 1, 3, 4, 5], 1],
]
/* eslint-enable no-magic-numbers -- defining the magic numbers*/

test.each(startOnlyCombos)(
    'correct buttons are shown. current: "%s", pageCount: "%s", surroundCurrent: "%s", startOnly: "true"',
    (current, pageCount, surroundCurrent, shownButtons) => {
        render(
            <Pagination
                current={current}
                pageCount={pageCount}
                surroundCurrent={surroundCurrent}
                onPageChange={handlePageChange}
                startOnly
            />
        )
        const buttons = screen.getAllByRole('button')
        expect(buttons).toHaveLength(shownButtons.length)
        for (const button of buttons) {
            const content = button.textContent
            if (content === 'Previous' || content === 'Next')
                expect(shownButtons.includes(content)).toBeTruthy()
            else if (content) expect(shownButtons.includes(parseInt(content))).toBeTruthy()
            else expect(false).toBeTruthy()
        }
    }
)

test.each(startOnlyCombos)(
    'correct separators are shown. current: "%s", pageCount: "%s", surroundCurrent: "%s", startOnly: "true"',
    (current, pageCount, surroundCurrent, _, separatorCount) => {
        render(
            <Pagination
                current={current}
                pageCount={pageCount}
                surroundCurrent={surroundCurrent}
                onPageChange={handlePageChange}
                startOnly
            />
        )
        expect(screen.queryAllByText('…')).toHaveLength(separatorCount)
    }
)
