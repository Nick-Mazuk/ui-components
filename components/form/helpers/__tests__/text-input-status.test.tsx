import { render, screen } from '@testing-library/react'

import { Status } from '../text-input-status'

test('renders without crashing', () => {
    const { baseElement } = render(<Status readonly optional />)
    expect(baseElement).not.toBeEmptyDOMElement()
})

test("is empty when everything's false", () => {
    const { container } = render(<Status readonly={false} optional={false} />)
    expect(container).toBeEmptyDOMElement()
})

describe('shows correct state', () => {
    test('readonly displayed when readonly', () => {
        render(<Status readonly optional={false} />)
        expect(screen.getByText(/readonly/u)).toBeTruthy()
        expect(screen.queryByText(/optional/u)).toBeFalsy()
    })
    test('readonly displayed when readonly and optional', () => {
        render(<Status readonly optional />)
        expect(screen.getByText(/readonly/u)).toBeTruthy()
        expect(screen.queryByText(/optional/u)).toBeFalsy()
    })
    test('optional displayed when optional', () => {
        render(<Status readonly={false} optional />)
        expect(screen.queryByText(/readonly/u)).toBeFalsy()
        expect(screen.getByText(/optional/u)).toBeTruthy()
    })
})
