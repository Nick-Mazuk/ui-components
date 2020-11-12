import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { FormSync } from '..'
import { EmailInput } from '../email-input'

const invalidEmails = [
    'john smith',
    'invalidemail@',
    'invalid.com',
    '@invalid.com',
    'foo@bar.com.',
    'somename@ｇｍａｉｌ.com',
    'foo@bar.co.uk.',
    'z@co.c',
    'ｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌ@gmail.com',
    'test1@invalid.co m',
    'test2@invalid.co m',
    'test3@invalid.co m',
    'test4@invalid.co m',
    'test5@invalid.co m',
    'test6@invalid.co m',
    'test7@invalid.co m',
    'test8@invalid.co m',
    'test9@invalid.co m',
    'test10@invalid.co m',
    'test11@invalid.co m',
    'test12@invalid.co　m',
    'test13@invalid.co　m',
    'multiple..dots@stillinvalid.com',
    // eslint-disable-next-line no-secrets/no-secrets -- not a secret
    'test123+invalid! sub_address@gmail.com',
    'gmail...ignores...dots...@gmail.com',
    'ends.with.dot.@gmail.com',
    'multiple..dots@gmail.com',
    'wrong()[]",:;<>@@gmail.com',
    '"wrong()[]",:;<>@@gmail.com',
    'username@domain.com�',
    'username@domain.com©',
]
test.each(invalidEmails)('"%s" is marked as invalid', (email) => {
    render(<EmailInput />)

    const input = screen.getByTestId('text-input-element')

    expect(screen.queryByText('Error:')).toBeFalsy()

    userEvent.type(input, email)
    userEvent.tab()

    expect(screen.getByText('Error:')).toBeTruthy()
})

const validEmails = [
    ['hello@gmail.com', 'hello@gmail.com'],
    ['Hel.lo@gmail.com', 'hello@gmail.com'],
    ['hello@example.com', 'hello@example.com'],
    ['foo@bar.com', 'foo@bar.com'],
    ['x@x.au', 'x@x.au'],
    ['foo@bar.com.au', 'foo@bar.com.au'],
    ['foo+bar@bar.com', 'foo+bar@bar.com'],
    ['hans.m端ller@test.com', 'hans.m端ller@test.com'],
    ['hans@m端ller.com', 'hans@m端ller.com'],
    ['test|123@m端ller.com', 'test|123@m端ller.com'],
    ['test123+ext@gmail.com', 'test123@gmail.com'],
    ['some.name.midd.leNa.me+extension@GoogleMail.com', 'somenamemiddlename@gmail.com'],
    ['"foobar"@example.com', '"foobar"@example.com'],
    ['"  foo  m端ller "@example.com', '"  foo  m端ller "@example.com'],
    ['"foo\\@bar"@example.com', '"foo\\@bar"@example.com'],
    [
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com',
    ],
    ['test@gmail.com', 'test@gmail.com'],
    ['test.1@gmail.com', 'test1@gmail.com'],
]
test.each(validEmails)('"%s" is marked as valid', (email) => {
    render(<EmailInput />)

    const input = screen.getByTestId('text-input-element')

    expect(screen.queryByText('Error:')).toBeFalsy()

    userEvent.type(input, email)
    userEvent.tab()

    expect(screen.queryByText('Error:')).toBeFalsy()
})

test.each(validEmails)('"%s" is parsed as "%s"', (email, parsedEmail) => {
    const formSync: FormSync = {
        state: 'ready',
        updateForm: jest.fn(),
        data: {},
    }
    render(<EmailInput name='email' formSync={formSync} />)
    const input = screen.getByTestId('text-input-element')
    userEvent.type(input, email)
    userEvent.tab()

    expect(formSync.updateForm).toHaveBeenLastCalledWith(
        'email',
        parsedEmail,
        expect.any(Function),
        expect.any(Function)
    )
})
