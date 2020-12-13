/* eslint-disable sonarjs/no-identical-functions, max-lines-per-function -- because there's mocking, several functions will be identical */
import { render, screen, waitFor } from '@testing-library/react'
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

test('handleSubmit test #1: normal usage', async () => {
    const mockSuccess = jest.fn()
    const mockError = jest.fn()
    const mockSubmit = jest.fn(
        (): Promise<boolean> =>
            new Promise((resolve) => {
                resolve(true)
            })
    )
    render(
        <Form onSuccess={mockSuccess} onError={mockError} handleSubmit={mockSubmit} clearOnSubmit>
            {(formSync) => (
                <>
                    <NameInput formSync={formSync} />
                    <EmailInput formSync={formSync} />
                    <TextInput type='text' label='Message' formSync={formSync} optional />
                    <TextAreaInput formSync={formSync} />
                    <Button value='Submit' color='primary' type='submit' />
                    {`Form state: ${formSync.state}`}
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

    expect(screen.getByText('Form state: ready')).toBeTruthy()

    // 'clicking submit causes inputs to validate and does not submit when invalid'
    userEvent.click(submitButton)
    expect(mockSuccess).toHaveBeenCalledTimes(0)
    expect(mockError).toHaveBeenCalledTimes(0)
    expect(mockSubmit).toHaveBeenCalledTimes(0)
    expect(countInvalidInputs(inputs)).toBe(3)
    expect(screen.getByText('Form state: ready')).toBeTruthy()

    // user can type valid inputs and fields are marked as valid
    userEvent.type(inputs[0], 'John Smith')
    userEvent.type(inputs[1], 'email@example.com')
    userEvent.type(inputs[3], 'This is the message of the stuff')
    userEvent.tab()

    expect(mockSuccess).toHaveBeenCalledTimes(0)
    expect(mockError).toHaveBeenCalledTimes(0)
    expect(mockSubmit).toHaveBeenCalledTimes(0)
    expect(countInvalidInputs(inputs)).toBe(0)
    expect(screen.getByText('Form state: ready')).toBeTruthy()

    // user can submit the form
    userEvent.click(submitButton)
    await waitFor(() => expect(screen.getByText('Form state: submitted')).toBeTruthy())
    expect(mockSuccess).toHaveBeenCalledTimes(1)
    expect(mockError).toHaveBeenCalledTimes(0)
    expect(mockSubmit).toHaveBeenCalledTimes(1)

    // ensures the hooks have been called with the correct data
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
    const successContents = undefined
    expect(mockSuccess).toHaveBeenLastCalledWith(successContents)

    // clears values after submit
    expect(inputs[0]).toHaveValue('')
    expect(inputs[1]).toHaveValue('')
    expect(inputs[2]).toHaveValue('')
    expect(inputs[3]).toHaveValue('')
})

test('handleSubmit test #2: handles error correctly', async () => {
    const mockSuccess = jest.fn()
    const mockError = jest.fn()
    const mockSubmit = jest.fn(
        (): Promise<boolean> =>
            new Promise((resolve) => {
                resolve(false)
            })
    )
    render(
        <Form onSuccess={mockSuccess} onError={mockError} handleSubmit={mockSubmit} clearOnSubmit>
            {(formSync) => (
                <>
                    <EmailInput formSync={formSync} />
                    <Button value='Submit' color='primary' type='submit' />
                    {`Form state: ${formSync.state}`}
                </>
            )}
        </Form>
    )

    const inputs = screen.getAllByTestId('text-input-element')
    const buttons = screen.getAllByRole('button')
    const submitButton = buttons[buttons.length - 1]

    // form renders all input elements and buttons'
    expect(inputs).toHaveLength(1)
    expect(submitButton.textContent).toBe('Submit')

    // 'clicking submit causes inputs to validate and does not submit when invalid'
    userEvent.click(submitButton)
    expect(mockSuccess).toHaveBeenCalledTimes(0)
    expect(mockError).toHaveBeenCalledTimes(0)
    expect(mockSubmit).toHaveBeenCalledTimes(0)
    expect(countInvalidInputs(inputs)).toBe(1)

    // user can type valid inputs and fields are marked as valid
    userEvent.type(inputs[0], 'email@example.com')
    userEvent.tab()

    expect(mockSuccess).toHaveBeenCalledTimes(0)
    expect(mockError).toHaveBeenCalledTimes(0)
    expect(mockSubmit).toHaveBeenCalledTimes(0)
    expect(countInvalidInputs(inputs)).toBe(0)

    // user can submit the form
    userEvent.click(submitButton)
    await waitFor(() => expect(screen.getByText('Form state: error')).toBeTruthy())
    expect(mockSuccess).toHaveBeenCalledTimes(0)
    expect(mockError).toHaveBeenCalledTimes(1)
    expect(mockSubmit).toHaveBeenCalledTimes(1)

    // ensures the hooks have been called with the correct data
    expect(mockSubmit).toHaveBeenLastCalledWith({
        email: 'email@example.com',
    })
    expect(mockError).toHaveBeenLastCalledWith('')

    // values not cleared after submit that results in an error
    expect(inputs[0]).toHaveValue('email@example.com')
})

test("handleSubmit test #3: doesn't clear on successful submit without clearOnSubmit prop", async () => {
    const mockSuccess = jest.fn()
    const mockError = jest.fn()
    const mockSubmit = jest.fn(
        (): Promise<boolean> =>
            new Promise((resolve) => {
                resolve(true)
            })
    )
    render(
        <Form onSuccess={mockSuccess} onError={mockError} handleSubmit={mockSubmit}>
            {(formSync) => (
                <>
                    <EmailInput formSync={formSync} />
                    <Button value='Submit' color='primary' type='submit' />
                    {`Form state: ${formSync.state}`}
                </>
            )}
        </Form>
    )

    const inputs = screen.getAllByTestId('text-input-element')
    const buttons = screen.getAllByRole('button')
    const submitButton = buttons[buttons.length - 1]

    // form renders all input elements and buttons'
    expect(inputs).toHaveLength(1)
    expect(submitButton.textContent).toBe('Submit')

    // 'clicking submit causes inputs to validate and does not submit when invalid'
    userEvent.click(submitButton)
    expect(mockSuccess).toHaveBeenCalledTimes(0)
    expect(mockError).toHaveBeenCalledTimes(0)
    expect(mockSubmit).toHaveBeenCalledTimes(0)
    expect(countInvalidInputs(inputs)).toBe(1)

    // user can type valid inputs and fields are marked as valid
    userEvent.type(inputs[0], 'email@example.com')
    userEvent.tab()

    expect(mockSuccess).toHaveBeenCalledTimes(0)
    expect(mockError).toHaveBeenCalledTimes(0)
    expect(mockSubmit).toHaveBeenCalledTimes(0)
    expect(countInvalidInputs(inputs)).toBe(0)

    // user can submit the form
    userEvent.click(submitButton)
    await waitFor(() => expect(screen.getByText('Form state: submitted')).toBeTruthy())
    expect(mockSuccess).toHaveBeenCalledTimes(1)
    expect(mockError).toHaveBeenCalledTimes(0)
    expect(mockSubmit).toHaveBeenCalledTimes(1)

    // ensures the hooks have been called with the correct data
    expect(mockSubmit).toHaveBeenLastCalledWith({
        email: 'email@example.com',
    })
    const successContents = undefined
    expect(mockSuccess).toHaveBeenLastCalledWith(successContents)

    // values not cleared after submit that results in an error
    expect(inputs[0]).toHaveValue('email@example.com')
})

test('handleSubmit test #4: formSync.data updates every time the input is updated', () => {
    render(
        <Form>
            {(formSync) => (
                <>
                    <EmailInput formSync={formSync} />
                    <TextInput type='text' label='Message' formSync={formSync} />
                    <Button value='Submit' color='primary' type='submit' />
                    {`data: ${JSON.stringify(formSync.data)}`}
                </>
            )}
        </Form>
    )

    const [emailInput, messageInput] = screen.getAllByTestId('text-input-element')
    expect(screen.getByText('data: {"email":"","message":""}')).toBeTruthy()

    userEvent.type(emailInput, 'email@example.com')
    userEvent.tab()

    expect(screen.getByText('data: {"email":"email@example.com","message":""}')).toBeTruthy()

    userEvent.clear(emailInput)
    userEvent.type(emailInput, 'hello@world.com')
    userEvent.type(messageInput, 'just a small message')
    userEvent.tab()

    expect(
        screen.getByText('data: {"email":"hello@world.com","message":"just a small message"}')
    ).toBeTruthy()
})

describe('user can submit form', () => {
    test.todo('creates valid "%s" request')

    // const methods: ('get' | 'post')[] = ['get', 'post']

    test.todo('forms work with various action links')

    test.todo('with all three (method, action, handleSubmit), the form is submitted both ways')

    test.todo('if all three are missing, nothing should happen')
})

describe('submitting the form fails gracefully when used in built-in submit', () => {
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
    test('inputs are cleared when clearOnSubmit is true', async () => {
        const mockSubmit = jest.fn(
            (): Promise<boolean> =>
                new Promise((resolve) => {
                    resolve(true)
                })
        )
        render(
            <Form handleSubmit={mockSubmit} clearOnSubmit>
                {(formSync) => (
                    <>
                        <EmailInput formSync={formSync} />
                        <Button value='Submit' color='primary' type='submit' />
                        <p>{`Form state: ${formSync.state}`}</p>
                        <p>{`Form data: ${JSON.stringify(formSync.data)}`}</p>
                    </>
                )}
            </Form>
        )

        const inputs = screen.getAllByTestId('text-input-element')
        const buttons = screen.getAllByRole('button')
        const submitButton = buttons[buttons.length - 1]

        userEvent.type(inputs[0], 'email@example.com')
        userEvent.tab()

        expect(mockSubmit).toHaveBeenCalledTimes(0)

        // user can submit the form
        userEvent.click(submitButton)
        await waitFor(() => expect(screen.getByText('Form state: submitted')).toBeTruthy())
        expect(mockSubmit).toHaveBeenCalledTimes(1)

        // values cleared after submit
        expect(inputs[0]).toHaveValue('')
        expect(screen.getByText('Form data: {"email":""}')).toBeTruthy()
    })
    test('inputs are not cleared when clearOnSubmit is false', async () => {
        const mockSubmit = jest.fn(
            (): Promise<boolean> =>
                new Promise((resolve) => {
                    resolve(true)
                })
        )
        render(
            <Form handleSubmit={mockSubmit}>
                {(formSync) => (
                    <>
                        <EmailInput formSync={formSync} />
                        <Button value='Submit' color='primary' type='submit' />
                        <p>{`Form state: ${formSync.state}`}</p>
                        <p>{`Form data: ${JSON.stringify(formSync.data)}`}</p>
                    </>
                )}
            </Form>
        )

        const inputs = screen.getAllByTestId('text-input-element')
        const buttons = screen.getAllByRole('button')
        const submitButton = buttons[buttons.length - 1]

        userEvent.type(inputs[0], 'email@example.com')

        expect(mockSubmit).toHaveBeenCalledTimes(0)

        // user can submit the form
        userEvent.click(submitButton)
        await waitFor(() => expect(screen.getByText('Form state: submitted')).toBeTruthy())
        expect(mockSubmit).toHaveBeenCalledTimes(1)

        // values not cleared after submit
        expect(inputs[0]).toHaveValue('email@example.com')
        expect(screen.getByText('Form data: {"email":"email@example.com"}')).toBeTruthy()
    })

    test('inputs are not cleared when clearOnSubmit is true but method, action, and handleSubmit are missing', async () => {
        const mockSuccess = jest.fn()
        const mockError = jest.fn()
        render(
            <Form onSuccess={mockSuccess} onError={mockError} clearOnSubmit>
                {(formSync) => (
                    <>
                        <EmailInput formSync={formSync} />
                        <Button value='Submit' color='primary' type='submit' />
                        <p>{`Form state: ${formSync.state}`}</p>
                        <p>{`Form data: ${JSON.stringify(formSync.data)}`}</p>
                    </>
                )}
            </Form>
        )

        const inputs = screen.getAllByTestId('text-input-element')
        const buttons = screen.getAllByRole('button')
        const submitButton = buttons[buttons.length - 1]

        // 'clicking submit causes inputs to validate and does not submit when invalid'
        userEvent.click(submitButton)
        expect(mockSuccess).toHaveBeenCalledTimes(0)
        expect(mockError).toHaveBeenCalledTimes(0)
        expect(countInvalidInputs(inputs)).toBe(1)

        // user can type valid inputs and fields are marked as valid
        userEvent.type(inputs[0], 'email@example.com')
        userEvent.tab()

        expect(mockSuccess).toHaveBeenCalledTimes(0)
        expect(mockError).toHaveBeenCalledTimes(0)
        expect(countInvalidInputs(inputs)).toBe(0)

        // user can submit the form
        userEvent.click(submitButton)
        await waitFor(() => expect(screen.getByText('Form state: ready')).toBeTruthy())
        expect(mockSuccess).toHaveBeenCalledTimes(0)
        expect(mockError).toHaveBeenCalledTimes(0)

        // values not cleared after submit because there wasn't a submit function
        expect(inputs[0]).toHaveValue('email@example.com')
        expect(screen.getByText('Form data: {"email":"email@example.com"}')).toBeTruthy()
    })
})
