import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TwitterProfileInput } from '../twitter-profile-input'

const invalidUrls = [
    'john smith',
    'invalidemail@',
    'invalid.com',
    'facebook.co',
    'https://facebook.co',
    'https://facebook.com',
    'https://www.facebook.com/groups/743327632675687/',
    'https://www.facebook.com/groups/feed',
]
test.each(invalidUrls)('"%s" is marked as invalid', (email) => {
    render(<TwitterProfileInput />)

    const input = screen.getByTestId('text-input-element')

    expect(screen.queryByText('Error:')).toBeFalsy()

    userEvent.type(input, email)
    userEvent.tab()

    expect(screen.getByText('Error:')).toBeTruthy()
})

const validUrls = ['https://twitter.com/hello']
test.each(validUrls)('"%s" is marked as valid', (video) => {
    render(<TwitterProfileInput />)

    const input = screen.getByTestId('text-input-element')

    expect(screen.queryByText('Error:')).toBeFalsy()

    userEvent.type(input, video)
    userEvent.tab()

    expect(screen.queryByText('Error:')).toBeFalsy()
})
