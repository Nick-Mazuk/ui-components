import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Form } from '..'
import { Button } from '../../../elements/button'
import { PasswordInput } from '../password-input'

test('toggle show password by clicking the button', () => {
    render(<PasswordInput />)

    const input = screen.getByTestId('text-input-element')
    const buttons = screen.getAllByRole('button')
    const toggleButton = buttons[buttons.length - 1]

    expect(input.getAttribute('type')).toBe('password')
    userEvent.click(toggleButton)
    expect(input.getAttribute('type')).toBe('text')
    userEvent.click(toggleButton)
    expect(input.getAttribute('type')).toBe('password')
    userEvent.click(toggleButton)
    expect(input.getAttribute('type')).toBe('text')
    userEvent.click(toggleButton)
    expect(input.getAttribute('type')).toBe('password')
})

test('toggle show password by focussing on the button and hitting enter', () => {
    render(<PasswordInput />)

    const input = screen.getByTestId('text-input-element')
    const buttons = screen.getAllByRole('button')
    const toggleButton = buttons[buttons.length - 1]

    toggleButton.focus()
    expect(input.getAttribute('type')).toBe('password')
    userEvent.type(toggleButton, '{enter}')
    expect(input.getAttribute('type')).toBe('text')
    userEvent.type(toggleButton, '{enter}')
    expect(input.getAttribute('type')).toBe('password')
    userEvent.type(toggleButton, '{enter}')
    expect(input.getAttribute('type')).toBe('text')
    userEvent.type(toggleButton, '{enter}')
    expect(input.getAttribute('type')).toBe('password')
})

test('BUGFIX: Pressing enter while focusing on the input does not toggle show password', () => {
    const mockSubmit = jest.fn(
        (): Promise<boolean> =>
            new Promise((resolve) => {
                resolve(true)
            })
    )
    render(
        <Form handleSubmit={mockSubmit} clearOnSubmit captcha='test'>
            {(formSync) => {
                return (
                    <>
                        <PasswordInput formSync={formSync} />
                        <Button value='Submit' type='submit' />
                    </>
                )
            }}
        </Form>
    )

    const input = screen.getByTestId('text-input-element')

    expect(input.getAttribute('type')).toBe('password')
    userEvent.type(input, '{enter}')
    expect(input.getAttribute('type')).toBe('password')
    userEvent.type(input, '{enter}')
    expect(input.getAttribute('type')).toBe('password')

    expect(mockSubmit).toHaveBeenCalledTimes(0)
})
