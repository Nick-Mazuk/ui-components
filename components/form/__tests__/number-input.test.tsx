import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { FormSync } from '..'
import { NumberInput } from '../number-input'

const inputs = [
    ['314159', '314,159', '314159'],
    ['hello world', '', ''],
    ['hello 3.14159', '3.14159', '3.14159'],
    ['hello 3.1@abc 4159', '3.14159', '3.14159'],
    ['hello 3.1@abc 4159', '3.14159', '3.14159'],
    ['3,14,15,9.2131', '314,159.2131', '314159.2131'],
    ['testing1@foo.com', '1', '1'],
    ['1.', '1', '1'],
    ['0', '0', '0'],
]
test.each(inputs)(
    '"%s" is displayed as "%s" and parsed as "%s"',
    (number, displayedNumber, parsedNumber) => {
        const formSync: FormSync = {
            state: 'ready',
            updateForm: jest.fn(),
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
        render(<NumberInput decimals={decimals} />)
        const input = screen.getByTestId('text-input-element')
        userEvent.type(input, number)
        userEvent.tab()

        expect(input).toHaveValue(displayedNumber)
    }
)
