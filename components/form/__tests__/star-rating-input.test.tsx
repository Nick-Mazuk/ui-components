import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { FormSync } from '..'
import { Form } from '..'
import { Button } from '../../../elements/button'
import { StarRatingInput } from '../star-rating-input'

test('Check input renders without crashing', () => {
    const { baseElement } = render(<StarRatingInput />)
    expect(baseElement).not.toBeEmptyDOMElement()
})

describe('Has all valid elements', () => {
    test('has 5 stars', () => {
        render(<StarRatingInput />)
        expect(screen.getAllByRole('button')).toHaveLength(5)
    })
    test('has custom label', () => {
        render(<StarRatingInput label='label' />)
        expect(screen.getByText('label')).toBeTruthy()
    })
})

describe('clicking stars works', () => {
    test('calls onChange', () => {
        const onChangeMock = jest.fn()
        render(<StarRatingInput onChange={onChangeMock} />)
        expect(onChangeMock).toHaveBeenCalledTimes(0)
        userEvent.click(screen.getAllByRole('button')[2])
        expect(onChangeMock).toHaveBeenCalledTimes(1)
        expect(onChangeMock).toHaveBeenLastCalledWith(3)
        userEvent.click(screen.getAllByRole('button')[3])
        expect(onChangeMock).toHaveBeenCalledTimes(2)
        expect(onChangeMock).toHaveBeenLastCalledWith(4)
    })
})

// eslint-disable-next-line max-lines-per-function -- tests are short
describe('Syncs with formSync', () => {
    test('Syncs with form initially', () => {
        const formSync: FormSync = {
            state: 'ready',
            updateForm: jest.fn(),
            data: {},
        }
        render(<StarRatingInput formSync={formSync} />)
        expect(formSync.updateForm).toHaveBeenCalledTimes(1)
        expect(formSync.updateForm).toHaveBeenCalledWith(
            'star-rating',
            0,
            expect.any(Function),
            expect.any(Function)
        )
        userEvent.click(screen.getAllByRole('button')[2])
        expect(formSync.updateForm).toHaveBeenCalledTimes(2)
        expect(formSync.updateForm).toHaveBeenCalledWith(
            'star-rating',
            3,
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
        render(<StarRatingInput formSync={formSync} defaultValue={4} />)
        expect(formSync.updateForm).toHaveBeenCalledTimes(1)
        expect(formSync.updateForm).toHaveBeenCalledWith(
            'star-rating',
            4,
            expect.any(Function),
            expect.any(Function)
        )
    })

    test('If required, it throws error when no rating is selected', () => {
        const mockSubmit = jest.fn(() => Promise.resolve(true))
        render(
            <Form handleSubmit={mockSubmit}>
                {(formSync) => {
                    return (
                        <>
                            <StarRatingInput formSync={formSync} />
                            <Button value='submit' type='submit' />
                        </>
                    )
                }}
            </Form>
        )

        userEvent.click(screen.getByText('Submit'))
        expect(mockSubmit).not.toHaveBeenCalled()
        expect(screen.getByText('Error:')).toBeTruthy()
    })

    test('If required, it allows the form to submit when rating is selected', () => {
        const mockSubmit = jest.fn(() => Promise.resolve(true))
        render(
            <Form handleSubmit={mockSubmit}>
                {/* eslint-disable-next-line sonarjs/no-identical-functions -- intentional */}
                {(formSync) => {
                    return (
                        <>
                            <StarRatingInput formSync={formSync} />
                            <Button value='submit' type='submit' />
                        </>
                    )
                }}
            </Form>
        )
        userEvent.click(screen.getAllByRole('button')[2])
        userEvent.click(screen.getByText('Submit'))
        expect(mockSubmit).toHaveBeenCalledTimes(1)
    })
})
