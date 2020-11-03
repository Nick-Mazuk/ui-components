import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Form } from '..'
import { Button } from '../../../elements/button'
import { EmailInput } from '../email-input'
import { NameInput } from '../name-input'
import { TextInput } from '../text-input'
import { TextAreaInput } from '../textarea-input'

const countInvalidInputs = (inputs: HTMLElement[]): number => {
    let count = 0
    for (const input of inputs) if (input.getAttribute('aria-invalid') === 'true') count++

    return count
}

// eslint-disable-next-line max-lines-per-function -- just a multi-step test
test('user can interact with the form', () => {
    const mockSuccess = jest.fn()
    const mockError = jest.fn()
    const mockSubmit = jest.fn()
    render(
        <Form onSuccess={mockSuccess} onError={mockError} handleSubmit={mockSubmit} clearOnSubmit>
            {(formSync) => (
                <>
                    <NameInput formSync={formSync} />
                    <EmailInput formSync={formSync} />
                    <TextInput type='text' label='Message' formSync={formSync} optional />
                    <TextAreaInput formSync={formSync} />
                    <Button value='Submit' color='primary' />
                </>
            )}
        </Form>
    )

    const inputs = screen.getAllByTestId('text-input-element')
    const buttons = screen.getAllByRole('button')
    const submitButton = buttons[buttons.length - 1]

    // form renders all input elements and buttons'
    expect(inputs).toHaveLength(4)
    expect(submitButton.textContent).toBe('Submit')

    // 'clicking submit causes inputs to validate and does not submit when invalid'
    userEvent.click(submitButton)
    expect(mockSuccess).toHaveBeenCalledTimes(0)
    expect(mockError).toHaveBeenCalledTimes(0)
    expect(mockSubmit).toHaveBeenCalledTimes(0)
    expect(countInvalidInputs(inputs)).toBe(3)

    // user can type valid inputs and fields are marked as valid
    userEvent.type(inputs[0], 'John Smith')
    userEvent.type(inputs[1], 'email@example.com')
    userEvent.type(inputs[3], 'This is the message of the stuff')
    userEvent.tab()

    expect(mockSuccess).toHaveBeenCalledTimes(0)
    expect(mockError).toHaveBeenCalledTimes(0)
    expect(mockSubmit).toHaveBeenCalledTimes(0)
    expect(countInvalidInputs(inputs)).toBe(0)

    // user can submit the form
    userEvent.click(submitButton)
    expect(mockSuccess).toHaveBeenCalledTimes(0)
    expect(mockError).toHaveBeenCalledTimes(0)
    expect(mockSubmit).toHaveBeenCalledTimes(1)

    // ensures handleSubmit has been called with the correct data
    expect(mockSubmit).toHaveBeenLastCalledWith({
        'full-name': {
            first: 'John',
            full: 'John Smith',
            last: 'Smith',
            middle: '',
            nick: '',
            suffix: '',
            title: '',
        },
        email: 'email@example.com',
        message: '',
        content: 'This is the message of the stuff',
    })

    // clears values after submit
    expect(inputs[0]).toHaveValue('')
    expect(inputs[1]).toHaveValue('')
    expect(inputs[2]).toHaveValue('')
    expect(inputs[3]).toHaveValue('')
})

describe('user can submit form', () => {
    test.todo('clicking submit on a valid form submits the form')

    const methods: ('get' | 'post')[] = ['get', 'post']
    test.todo('creates valid "%s" request')

    test.todo('forms work with various action links')

    test.todo('works with handleSubmit hook')

    test.todo('with all three (method, action, handleSubmit), the form is submitted both ways')

    test.todo('if all three are missing, nothing should happen')
})

describe('submitting the form fails gracefully', () => {
    test.todo("when there's no error, onSuccess is called")
    test.todo("when there's a server error, onError is called")
    test.todo('handles "no internet access" error')
    test.todo('handles internal server error')
    test.todo('handles invalid data error')
    test.todo('handles timeout error')
    test.todo('handles non-existent endpoint')
})

describe('captcha works as expected', () => {
    test.todo("in a development environment, captcha doesn't render")
    test.todo('in a production environment, captcha renders')
})

describe('clears inputs on submit', () => {
    test.todo('inputs are cleared when clearOnSubmit is true')
    test.todo('inputs are not cleared when clearOnSubmit is false')
    test.todo(
        'inputs are not cleared when clearOnSubmit is true but method, action, and handleSubmit are missing'
    )
})
