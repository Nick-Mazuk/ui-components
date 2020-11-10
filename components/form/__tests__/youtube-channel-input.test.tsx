import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { FormSync } from '..'
import { YouTubeChannelInput } from '../youtube-channel-input'

const invalidVideos = [
    'john smith',
    'invalidemail@',
    'invalid.com',
    '@invalid.com',
    'foo@bar.com.',
    'https://youtu.be/playlist/lkjsdfl',
    'https://www.youtu.be/dQw4w9WgXcQ',
    'https://google.com/dQw4w9WgXcQ',
    'https://www.youtube.com/playlist?list=PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA',
    'https://youtube.com',
    'https://youtu.be/dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
]
test.each(invalidVideos)('"%s" is marked as invalid', (email) => {
    render(<YouTubeChannelInput />)

    const input = screen.getByTestId('text-input-element')

    expect(screen.queryByText('Error:')).toBeFalsy()

    userEvent.type(input, email)
    userEvent.tab()

    expect(screen.getByText('Error:')).toBeTruthy()
})

const validVideos = [
    ['youtube.com/user/channel_name', 'channel_name'],
    ['youtube.com/channel/UCUZHFZ9j', 'UCUZHFZ9j'],
    ['youtube.com/c/YouTubeCreators', 'YouTubeCreators'],
    ['youtube.com/YouTubeCreators', 'YouTubeCreators'],
]
test.each(validVideos)('"%s" is marked as valid', (video) => {
    render(<YouTubeChannelInput />)

    const input = screen.getByTestId('text-input-element')

    expect(screen.queryByText('Error:')).toBeFalsy()

    userEvent.type(input, video)
    userEvent.tab()

    expect(screen.queryByText('Error:')).toBeFalsy()
})

test.each(validVideos)('"%s" is parsed as "%s"', (video, parsedChannel) => {
    const formSync: FormSync = {
        state: 'ready',
        updateForm: jest.fn(),
    }
    render(<YouTubeChannelInput name='channel' formSync={formSync} />)
    const input = screen.getByTestId('text-input-element')
    userEvent.type(input, video)
    userEvent.tab()

    expect(formSync.updateForm).toHaveBeenLastCalledWith(
        'channel',
        parsedChannel,
        expect.any(Function),
        expect.any(Function)
    )
})
