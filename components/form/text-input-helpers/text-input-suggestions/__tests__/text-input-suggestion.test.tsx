import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Search, X } from '../../../../../elements/icon'
import { Suggestion } from '../suggestion'

test('Suggestion renders without crashing', () => {
    const { baseElement } = render(
        <Suggestion onClick={jest.fn()} size='default'>
            Suggestion text
        </Suggestion>
    )
    expect(baseElement).not.toBeEmptyDOMElement()
})

test('displays the text', () => {
    render(
        <Suggestion onClick={jest.fn()} size='default'>
            Suggestion text
        </Suggestion>
    )
    expect(screen.getByText('Suggestion text')).toBeTruthy()
})

describe('shows icon when appropriate', () => {
    test('shows search icon when appropriate', () => {
        render(
            <Suggestion icon={<Search />} onClick={jest.fn()} size='default'>
                Suggestion text
            </Suggestion>
        )
        expect(screen.getByTestId('icon-Search')).toBeTruthy()
    })

    test('shows other icon when appropriate', () => {
        render(
            <Suggestion icon={<X />} onClick={jest.fn()} size='default'>
                Suggestion text
            </Suggestion>
        )
        expect(screen.getByTestId('icon-X')).toBeTruthy()
    })

    test('does not show icon if not appropriate', () => {
        render(
            <Suggestion onClick={jest.fn()} size='default'>
                Suggestion text
            </Suggestion>
        )
        expect(screen.queryByTestId(/icon-/u)).toBeFalsy()
    })
})

describe('when active, it has a gray background', () => {
    test('when active, it has a gray background', () => {
        render(
            <Suggestion isActive onClick={jest.fn()} size='default'>
                Suggestion text
            </Suggestion>
        )
        expect(screen.getByTestId('text-input-suggestion').classList.toString()).toMatch(' bg-gray')
    })

    test("when not active, it doesn't have a gray background", () => {
        render(
            <Suggestion onClick={jest.fn()} size='default'>
                Suggestion text
            </Suggestion>
        )
        expect(screen.getByTestId('text-input-suggestion').classList.toString()).not.toMatch(
            ' bg-gray'
        )
    })
})

test('cannot be accessed by tabbing', () => {
    render(
        <Suggestion onClick={jest.fn()} size='default'>
            Suggestion text
        </Suggestion>
    )
    const suggestion = screen.getByRole('button')
    expect(suggestion).not.toHaveFocus()
    userEvent.tab()
    expect(suggestion).not.toHaveFocus()
    userEvent.tab()
    expect(suggestion).not.toHaveFocus()
    userEvent.tab()
    expect(suggestion).not.toHaveFocus()
})

test('when clicked, it triggers onClick', () => {
    const onClickMock = jest.fn()
    const text = 'Suggestion text'
    render(
        <Suggestion onClick={onClickMock} size='default'>
            {text}
        </Suggestion>
    )
    userEvent.click(screen.getByTestId('text-input-suggestion'))
    expect(onClickMock).toHaveBeenCalled()
    expect(onClickMock).toHaveBeenCalledWith(text)
})
