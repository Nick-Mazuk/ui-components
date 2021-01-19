import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TextInputSuggestions } from '..'
import { Search } from '../../../../../elements/icon'

const suggestionTexts = ['hello', 'world', 'how', 'are', 'you', 'doing', 'today']

test('renders without crashing', () => {
    const { baseElement } = render(
        <TextInputSuggestions onSuggestionClick={jest.fn()} size='default' />
    )
    expect(baseElement).not.toBeEmptyDOMElement()
})

describe('is hidden when appropriate', () => {
    test("if suggestions length is undefined, don't render", () => {
        const { container } = render(
            <TextInputSuggestions onSuggestionClick={jest.fn()} size='default' />
        )
        expect(container).toBeEmptyDOMElement()
    })

    test("if suggestions length is 0, don't render", () => {
        const { container } = render(
            <TextInputSuggestions suggestions={[]} onSuggestionClick={jest.fn()} size='default' />
        )
        expect(container).toBeEmptyDOMElement()
    })

    test("if the text-input isn't focused, don't render", () => {
        const { container } = render(
            <TextInputSuggestions
                suggestions={suggestionTexts}
                showSuggestions={false}
                onSuggestionClick={jest.fn()}
                size='default'
            />
        )
        expect(container).toBeEmptyDOMElement()
    })
})

describe('suggestion text is rendered correctly', () => {
    test('all suggestions render', () => {
        render(
            <TextInputSuggestions
                suggestions={suggestionTexts}
                showSuggestions
                onSuggestionClick={jest.fn()}
                size='default'
            />
        )
        suggestionTexts.forEach((suggestion) => {
            expect(screen.getByText(suggestion)).toBeTruthy()
        })
    })

    test('suggestions render in the correct order', () => {
        render(
            <TextInputSuggestions
                suggestions={suggestionTexts}
                showSuggestions
                onSuggestionClick={jest.fn()}
                size='default'
            />
        )
        const buttons = screen.getAllByRole('button')
        buttons.forEach((button, index) => {
            expect(button).toHaveTextContent(suggestionTexts[index])
        })
    })
})

describe('icons are rendered correctly', () => {
    test('each suggestion has the icon if provided', () => {
        render(
            <TextInputSuggestions
                suggestions={suggestionTexts}
                icon={<Search />}
                showSuggestions
                onSuggestionClick={jest.fn()}
                size='default'
            />
        )
        expect(screen.getAllByTestId('icon-Search')).toHaveLength(suggestionTexts.length)
    })
    test("suggestions don't have an icon if not provided", () => {
        render(
            <TextInputSuggestions
                suggestions={suggestionTexts}
                showSuggestions
                onSuggestionClick={jest.fn()}
                size='default'
            />
        )
        expect(screen.queryAllByTestId(/icon-/u)).toHaveLength(0)
    })
})

describe('active icons are shown correctly', () => {
    const activeClass = ' bg-gray'

    test('only the active suggestion has a gray background', () => {
        const activeSuggestion = 3
        render(
            <TextInputSuggestions
                suggestions={suggestionTexts}
                activeSuggestion={activeSuggestion}
                showSuggestions
                onSuggestionClick={jest.fn()}
                size='default'
            />
        )
        const suggestions = screen.getAllByRole('button')
        suggestions.forEach((suggestion, index) => {
            /* eslint-disable jest/no-conditional-expect -- appropriate in this case */
            if (index === activeSuggestion)
                expect(suggestion.classList.toString()).toMatch(activeClass)
            else expect(suggestion.classList.toString()).not.toMatch(activeClass)
            /* eslint-enable jest/no-conditional-expect -- appropriate in this case */
        })
    })

    test('no suggestions are active if activeSuggestion is -1', () => {
        render(
            <TextInputSuggestions
                suggestions={suggestionTexts}
                activeSuggestion={-1}
                showSuggestions
                onSuggestionClick={jest.fn()}
                size='default'
            />
        )
        const suggestions = screen.getAllByRole('button')
        suggestions.forEach((suggestion) => {
            expect(suggestion.classList.toString()).not.toMatch(activeClass)
        })
    })
})

test('clicking on suggestion calls callback', () => {
    const onClickMock = jest.fn()
    render(
        <TextInputSuggestions
            suggestions={suggestionTexts}
            activeSuggestion={-1}
            showSuggestions
            onSuggestionClick={onClickMock}
            size='default'
        />
    )
    userEvent.click(screen.getAllByRole('button')[0])
    expect(onClickMock).toHaveBeenCalled()
    expect(onClickMock).toHaveBeenLastCalledWith(suggestionTexts[0])
})
