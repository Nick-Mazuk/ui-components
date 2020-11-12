import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { FormSync } from '..'
import { DateInput } from '../date-input'

const invalidDates = ['john smith', 'complete nonsense', '123', '-12341.231']
test.each(invalidDates)('"%s" is marked as invalid', (date) => {
    render(<DateInput />)

    const input = screen.getByTestId('text-input-element')

    expect(screen.queryByText('Error:')).toBeFalsy()

    userEvent.type(input, date)
    userEvent.tab()

    expect(screen.getByText('Error:')).toBeTruthy()
})

const inputs: [string, string][] = [
    ['Oct 27, 2020', '1603782000000'],
    ['October 27, 2020', '1603782000000'],
    ['2020-02-30', '1583020800000'],
    ['2019-02-29', '1551398400000'],
    ['2020-04-31', '1588291200000'],
    ['2020/03-15', '1584255600000'],
    ['Octuber 27, 2020', '1603782000000'],
]
test.each(inputs)('"%s" is  parsed as "%s"', (number, parsedNumber) => {
    const formSync: FormSync = {
        state: 'ready',
        updateForm: jest.fn(),
        data: {},
    }
    render(<DateInput name='date' formSync={formSync} />)
    const input = screen.getByTestId('text-input-element')
    userEvent.type(input, number)
    userEvent.tab()

    expect(screen.queryByText('Error:')).toBeFalsy()

    expect(formSync.updateForm).toHaveBeenLastCalledWith(
        'date',
        parsedNumber,
        expect.any(Function),
        expect.any(Function)
    )
})
