import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { NewPasswordInput } from '../new-password-input'

test('toggle show password', () => {
    render(<NewPasswordInput />)
    const input = screen.getByTestId('text-input-element')
    const buttons = screen.getAllByRole('button')
    const toggleButton = buttons[buttons.length - 1]
    expect(input.getAttribute('type')).toBe('password')
    userEvent.click(toggleButton)
    expect(input.getAttribute('type')).toBe('text')
    userEvent.click(toggleButton)
    expect(input.getAttribute('type')).toBe('password')
})
