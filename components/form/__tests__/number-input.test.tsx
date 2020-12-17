import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { FormSync } from '..'
import { NumberInput } from '../number-input'

// typed value, displayed value, parsed value
const inputs = [
    ['314159', '314,159', '314159'],
    ['hello world', '', ''],
    ['hello 3.14159', '3.14159', '3.14159'],
    ['hello 3.1@abc 4159', '3.14159', '3.14159'],
    ['hello 3.1@abc 4159', '3.14159', '3.14159'],
    ['3,14,15,9.2131', '314,159.2131', '314159.2131'],
    ['testing1@foo.com', '1', '1'],
    ['1.', '1', '1'],
    ['-1', '-1', '-1'],
    ['hello- 3.14159', '-3.14159', '-3.14159'],
    ['0', '0', '0'],
]
test.each(inputs)(
    '"%s" is displayed as "%s" and parsed as "%s"',
    (number, displayedNumber, parsedNumber) => {
        const formSync: FormSync = {
            state: 'ready',
            updateForm: jest.fn(),
            data: {},
        }
        render(<NumberInput name='number' formSync={formSync} />)
        const input = screen.getByTestId('text-input-element')
        userEvent.type(input, number)
        userEvent.tab()

        expect(input).toHaveValue(displayedNumber)

        expect(formSync.updateForm).toHaveBeenLastCalledWith(
            'number',
            parsedNumber,
            expect.any(Function),
            expect.any(Function)
        )
    }
)

const inputsToTruncate: [string, number, string][] = [
    ['3.14159', 3, '3.141'],
    ['3.14159', 8, '3.14159'],
]
test.each(inputsToTruncate)(
    '"%s" is truncated to "%s" decimals: "%s"',
    (number, decimals, displayedNumber) => {
        render(<NumberInput maxDecimals={decimals} />)
        const input = screen.getByTestId('text-input-element')
        userEvent.type(input, number)
        userEvent.tab()

        expect(input).toHaveValue(displayedNumber)
    }
)

const inputsToDecimalize: [string, number, string][] = [
    ['3.14159', 3, '3.141'],
    ['3.14159', 8, '3.14159000'],
]
test.each(inputsToDecimalize)(
    '"%s" is converted to "%s" decimals: "%s"',
    (number, decimals, displayedNumber) => {
        render(<NumberInput decimals={decimals} />)
        const input = screen.getByTestId('text-input-element')
        userEvent.type(input, number)
        userEvent.tab()

        expect(input).toHaveValue(displayedNumber)
    }
)

const lessThanValues: [string, number][] = [
    ['31', 0],
    ['231.43', 231],
    ['-231.43', -500],
    ['231.43', -500],
]

const greaterThanValues: [string, number][] = [
    ['31', 100],
    ['231.43', 232],
    ['-231.43', 0],
    ['231.43', 500],
]

// test min

test.each(lessThanValues)(
    'Typing "%s" with a min of "%s" does not produce an error',
    (number, min) => {
        render(<NumberInput min={min} />)
        const input = screen.getByTestId('text-input-element')
        userEvent.type(input, number)
        userEvent.tab()

        expect(screen.queryByText('Error:')).toBeFalsy()
    }
)

test.each(greaterThanValues)('Typing "%s" with a min of "%s" produces an error', (number, min) => {
    render(<NumberInput min={min} />)
    const input = screen.getByTestId('text-input-element')
    userEvent.type(input, number)
    userEvent.tab()

    expect(screen.getByText('Error:')).toBeTruthy()
})

// text max

test.each(greaterThanValues)(
    'Typing "%s" with a max of "%s" does not produce an error',
    (number, max) => {
        render(<NumberInput max={max} />)
        const input = screen.getByTestId('text-input-element')
        userEvent.type(input, number)
        userEvent.tab()

        expect(screen.queryByText('Error:')).toBeFalsy()
    }
)

test.each(lessThanValues)('Typing "%s" with a max of "%s" produces an error', (number, max) => {
    render(<NumberInput max={max} />)
    const input = screen.getByTestId('text-input-element')
    userEvent.type(input, number)
    userEvent.tab()

    expect(screen.getByText('Error:')).toBeTruthy()
})

// for disallowing negatives

const negativeInputs: [string, string][] = [
    ['-123', '123'],
    ['123', '123'],
]

test.each(negativeInputs)(
    'With negatives disallowed, typing "%s" displays ""%s',
    (number, displayedNumber) => {
        render(<NumberInput name='number' disallowNegatives />)
        const input = screen.getByTestId('text-input-element')
        userEvent.type(input, number)
        userEvent.tab()

        expect(input).toHaveValue(displayedNumber)
    }
)
