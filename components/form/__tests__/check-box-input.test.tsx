import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { FormSync } from '..'
import { Form } from '..'
import { Button } from '../../../elements/button'
import { CheckBoxInput } from '../check-box-input'

test('Check input renders without crashing', () => {
    const { baseElement } = render(<CheckBoxInput name='check' label='Some label text' />)
    expect(baseElement).not.toBeEmptyDOMElement()
})

test('Can set the id of the checkbox', () => {
    render(<CheckBoxInput name='check' label='Some label text' />)
    expect(screen.getByRole('checkbox').getAttribute('id')).toBe('check')
})

test('Make sure the label text is present', () => {
    render(<CheckBoxInput name='check' label='Some label text' />)
    expect(screen.getByText('Some label text')).toBeTruthy()
})

test('Checkbox is unchecked by default', () => {
    render(<CheckBoxInput name='check' label='Some label text' />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
})

test('Default value of "checked" works', () => {
    render(<CheckBoxInput name='check' label='Some label text' defaultValue='checked' />)
    expect(screen.getByRole('checkbox')).toBeChecked()
})

test('Default value of "unchecked" works', () => {
    render(<CheckBoxInput name='check' label='Some label text' defaultValue='unchecked' />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
})

test('Clicking on the label updates check state', () => {
    render(<CheckBoxInput name='check' label='Some label text' />)
    const checkBox = screen.getByRole('checkbox')
    const label = screen.getByLabelText('Some label text')
    userEvent.click(label)
    expect(checkBox).toBeChecked()
    userEvent.click(label)
    expect(checkBox).not.toBeChecked()
    userEvent.click(label)
    expect(checkBox).toBeChecked()
    userEvent.click(label)
    expect(checkBox).not.toBeChecked()
})

test("If it's disabled, clicking on the label does nothing", () => {
    render(<CheckBoxInput name='check' label='Some label text' disabled />)
    const checkBox = screen.getByRole('checkbox')
    const label = screen.getByLabelText('Some label text')
    userEvent.click(label)
    expect(checkBox).not.toBeChecked()
    userEvent.click(label)
    expect(checkBox).not.toBeChecked()
})

test("If optional, it's labeled as optional", () => {
    render(<CheckBoxInput name='check' label='Some label text' optional />)
    expect(screen.getByText(/optional/iu)).toBeTruthy()
})

test('If required, optional label is not shown', () => {
    render(<CheckBoxInput name='check' label='Some label text' />)
    expect(screen.queryByText(/optional/iu)).toBeFalsy()
})

test('If required, checkbox is marked as invalid when unchecked', () => {
    render(<CheckBoxInput name='check' label='Some label text' />)
    const checkBox = screen.getByRole('checkbox')
    const label = screen.getByLabelText('Some label text')
    expect(checkBox.getAttribute('aria-invalid')).toBe('true')
    userEvent.click(label)
    expect(checkBox.getAttribute('aria-invalid')).toBe('false')
    userEvent.click(label)
    expect(checkBox.getAttribute('aria-invalid')).toBe('true')
})

describe("Invalid outline isn't shown before checkbox is clicked or form is submitted", () => {
    test("If optional, it isn't shown ever", () => {
        render(<CheckBoxInput name='check' label='label' optional />)
        const label = screen.getByLabelText(/label/u)
        const invalidOutline = screen.getByTestId('check-box-invalid-outline')
        expect(invalidOutline).toHaveClass('opacity-0')
        userEvent.click(label)
        expect(invalidOutline).toHaveClass('opacity-0')
        userEvent.click(label)
        expect(invalidOutline).toHaveClass('opacity-0')
    })
    test("If required, it isn't shown", () => {
        render(<CheckBoxInput name='check' label='label' />)
        const invalidOutline = screen.getByTestId('check-box-invalid-outline')
        expect(invalidOutline).toHaveClass('opacity-0')
    })
    test("If required and checked by default, it isn't shown", () => {
        render(<CheckBoxInput name='check' label='label' defaultValue='checked' />)
        const invalidOutline = screen.getByTestId('check-box-invalid-outline')
        expect(invalidOutline).toHaveClass('opacity-0')
    })
})

describe('Invalid outline is shown after click or form is submitted', () => {
    test('It is shown after being clicked', () => {
        render(<CheckBoxInput name='check' label='label' />)
        const invalidOutline = screen.getByTestId('check-box-invalid-outline')
        expect(invalidOutline).toHaveClass('opacity-0')
        const label = screen.getByLabelText('label')
        userEvent.click(label)
        expect(invalidOutline).toHaveClass('opacity-0')
        userEvent.click(label)
        expect(invalidOutline).not.toHaveClass('opacity-0')
    })
    test('It is shown after trying to submit the form', async () => {
        render(
            <Form handleSubmit={jest.fn()}>
                {(formSync) => {
                    return (
                        <>
                            <CheckBoxInput name='check' label='label' formSync={formSync} />
                            <Button value='Submit' color='primary' type='submit' />
                        </>
                    )
                }}
            </Form>
        )
        const invalidOutline = screen.getByTestId('check-box-invalid-outline')
        expect(invalidOutline).toHaveClass('opacity-0')
        userEvent.click(screen.getByRole('button'))
        await waitFor(() => expect(invalidOutline).not.toHaveClass('opacity-0'))
    })
})

// eslint-disable-next-line max-lines-per-function -- multiple short tests
describe('Syncs with formSync', () => {
    test('Syncs with form initially', () => {
        const formSync: FormSync = {
            state: 'ready',
            updateForm: jest.fn(),
            data: {},
        }
        render(<CheckBoxInput name='check' label='Some label text' formSync={formSync} />)
        expect(formSync.updateForm).toHaveBeenCalledTimes(1)
        expect(formSync.updateForm).toHaveBeenCalledWith(
            'check',
            false,
            expect.any(Function),
            expect.any(Function)
        )

        const label = screen.getByLabelText('Some label text')
        userEvent.click(label)

        expect(formSync.updateForm).toHaveBeenCalledTimes(2)
        expect(formSync.updateForm).toHaveBeenCalledWith(
            'check',
            true,
            expect.any(Function),
            expect.any(Function)
        )
    })

    test('Syncs with default value', () => {
        const formSync: FormSync = {
            state: 'ready',
            updateForm: jest.fn(),
            data: {},
        }
        render(
            <CheckBoxInput
                name='check'
                label='Some label text'
                defaultValue='checked'
                formSync={formSync}
            />
        )
        expect(formSync.updateForm).toHaveBeenCalledTimes(1)
        expect(formSync.updateForm).toHaveBeenCalledWith(
            'check',
            true,
            expect.any(Function),
            expect.any(Function)
        )
    })

    test('When form is submitted, it returns to its default value', async () => {
        const mockSubmit = jest.fn(() => Promise.resolve(true))
        const onSuccessMock = jest.fn()
        render(
            <Form handleSubmit={mockSubmit} onSuccess={onSuccessMock} clearOnSubmit>
                {(formSync) => {
                    return (
                        <>
                            <CheckBoxInput
                                name='check'
                                label='Some label text'
                                formSync={formSync}
                            />
                            <Button value='Submit' color='primary' type='submit' />
                        </>
                    )
                }}
            </Form>
        )

        const label = screen.getByLabelText('Some label text')
        const checkBox = screen.getByRole('checkbox')
        userEvent.click(label)
        expect(checkBox).toBeChecked()
        userEvent.click(screen.getByRole('button'))
        await waitFor(() => expect(mockSubmit).toHaveBeenCalled())
        expect(checkBox).not.toBeChecked()
    })

    test('If optional, it allows the form to submit when off', async () => {
        const mockSubmit = jest.fn(() => Promise.resolve(true))
        render(
            <Form handleSubmit={mockSubmit}>
                {(formSync) => {
                    return (
                        <>
                            <CheckBoxInput
                                name='check'
                                label='Some label text'
                                formSync={formSync}
                                optional
                            />
                            <Button value='Submit' color='primary' type='submit' />
                        </>
                    )
                }}
            </Form>
        )

        userEvent.click(screen.getByRole('button'))
        await waitFor(() => expect(mockSubmit).toHaveBeenCalled())
    })

    test('If optional, it allows the form to submit when on', async () => {
        const mockSubmit = jest.fn(() => Promise.resolve(true))
        render(
            <Form handleSubmit={mockSubmit}>
                {(formSync) => {
                    return (
                        <>
                            <CheckBoxInput
                                name='check'
                                label='label'
                                formSync={formSync}
                                defaultValue='checked'
                                optional
                            />
                            <Button value='Submit' color='primary' type='submit' />
                        </>
                    )
                }}
            </Form>
        )

        userEvent.click(screen.getByRole('button'))
        await waitFor(() => expect(mockSubmit).toHaveBeenCalled())
    })

    test('If required, it allows throws error when off', () => {
        const mockSubmit = jest.fn(() => Promise.resolve(true))
        render(
            <Form handleSubmit={mockSubmit}>
                {(formSync) => {
                    return (
                        <>
                            <CheckBoxInput name='check' label='label' formSync={formSync} />
                            <Button value='submit' type='submit' />
                        </>
                    )
                }}
            </Form>
        )

        userEvent.click(screen.getByRole('button'))
        expect(mockSubmit).not.toHaveBeenCalled()

        const checkBox = screen.getByRole('checkbox')
        expect(checkBox.getAttribute('aria-invalid')).toBe('true')
    })

    test('If required, it allows the form to submit when on', async () => {
        const mockSubmit = jest.fn(() => Promise.resolve(true))
        render(
            <Form handleSubmit={mockSubmit}>
                {(formSync) => {
                    return (
                        <>
                            <CheckBoxInput
                                name='check'
                                label='label'
                                defaultValue='checked'
                                formSync={formSync}
                            />
                            <Button value='Submit' color='primary' type='submit' />
                        </>
                    )
                }}
            </Form>
        )

        userEvent.click(screen.getByRole('button'))
        await waitFor(() => expect(mockSubmit).toHaveBeenCalled())
    })

    test('If required, it allows the form to submit when clicked on after trying to submit', async () => {
        const mockSubmit = jest.fn(() => Promise.resolve(true))
        render(
            <Form handleSubmit={mockSubmit}>
                {(formSync) => {
                    return (
                        <>
                            <CheckBoxInput name='check' label='label' formSync={formSync} />
                            <Button value='Submit' type='submit' />
                        </>
                    )
                }}
            </Form>
        )

        const checkBox = screen.getByRole('checkbox')
        userEvent.click(screen.getByRole('button'))
        expect(checkBox.getAttribute('aria-invalid')).toBe('true')

        const label = screen.getByLabelText('label')
        userEvent.click(label)
        expect(checkBox.getAttribute('aria-invalid')).toBe('false')

        userEvent.click(screen.getByRole('button'))
        await waitFor(() => expect(mockSubmit).toHaveBeenCalled())
        expect(checkBox.getAttribute('aria-invalid')).toBe('false')
    })
})
