import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Name } from 'parse-full-name'

import type { FormSync } from '..'
import { NameInput } from '../name-input'

const invalidNames = [
    'hello@gmail.com',
    'foo@bar.com',
    'https://example.com',
    'http://facebook.com/this.is.a.path',
    'foobar.com',
    'www.foobar.com',
    'foobar.com/',
    'valid.au',
]
test.each(invalidNames)('"%s" is marked as invalid', (email) => {
    render(<NameInput />)

    const input = screen.getByTestId('text-input-element')

    expect(screen.queryByText('Error:')).toBeFalsy()

    userEvent.type(input, email)
    userEvent.tab()

    expect(screen.getByText('Error:')).toBeTruthy()
})

type FullName = Name & { full: string }

const validNames: [string, FullName][] = [
    [
        'David Davis',
        {
            first: 'David',
            full: 'David Davis',
            last: 'Davis',
            middle: '',
            nick: '',
            suffix: '',
            title: '',
        },
    ],
    [
        'john smith',
        {
            first: 'John',
            full: 'john smith',
            last: 'Smith',
            middle: '',
            nick: '',
            suffix: '',
            title: '',
        },
    ],
    [
        'Gerald Böck',
        {
            first: 'Gerald',
            full: 'Gerald Böck',
            last: 'Böck',
            middle: '',
            nick: '',
            suffix: '',
            title: '',
        },
    ],
    [
        'Orenthal James "O. J." Simpson',
        {
            first: 'Orenthal',
            full: 'Orenthal James "O. J." Simpson',
            last: 'Simpson',
            middle: 'James',
            nick: 'O. J.',
            suffix: '',
            title: '',
        },
    ],
    [
        'Mr. Jüan Martinez (Martin) de Lorenzo y Gutierez Jr.',
        {
            first: 'Jüan',
            full: 'Mr. Jüan Martinez (Martin) de Lorenzo y Gutierez Jr.',
            last: 'de Lorenzo y Gutierez',
            middle: 'Martinez',
            nick: 'Martin',
            suffix: 'Jr.',
            title: 'Mr.',
        },
    ],
]

test.each(validNames)('"%s" is marked as valid', (name) => {
    render(<NameInput />)

    const input = screen.getByTestId('text-input-element')

    expect(screen.queryByText('Error:')).toBeFalsy()

    userEvent.type(input, name)
    userEvent.tab()

    expect(screen.queryByText('Error:')).toBeFalsy()
})

test.each(validNames)('"%s" is parsed correctly', (name, parsedName) => {
    const formSync: FormSync = {
        state: 'ready',
        updateForm: jest.fn(),
    }
    render(<NameInput name='name' formSync={formSync} />)
    const input = screen.getByTestId('text-input-element')
    userEvent.type(input, name)
    userEvent.tab()

    expect(formSync.updateForm).toHaveBeenLastCalledWith(
        'name',
        parsedName,
        expect.any(Function),
        expect.any(Function)
    )
})
