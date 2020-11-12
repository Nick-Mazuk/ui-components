import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { FormSync } from '..'
import { YouTubeVideoInput } from '../youtube-video-input'

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
    'youtube.com/user/channel_name',
    'youtube.com/channel/UCUZHFZ9j',
    'youtube.com/c/YouTubeCreators',
    'youtube.com/YouTubeCreators',
]
test.each(invalidVideos)('"%s" is marked as invalid', (email) => {
    render(<YouTubeVideoInput />)

    const input = screen.getByTestId('text-input-element')

    expect(screen.queryByText('Error:')).toBeFalsy()

    userEvent.type(input, email)
    userEvent.tab()

    expect(screen.getByText('Error:')).toBeTruthy()
})

const validVideos = [
    ['https://youtu.be/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
    ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
    ['https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1', 'dQw4w9WgXcQ'],
    ['https://www.youtube.com/embed/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
]
test.each(validVideos)('"%s" is marked as valid', (video) => {
    render(<YouTubeVideoInput />)

    const input = screen.getByTestId('text-input-element')

    expect(screen.queryByText('Error:')).toBeFalsy()

    userEvent.type(input, video)
    userEvent.tab()

    expect(screen.queryByText('Error:')).toBeFalsy()
})

test.each(validVideos)('"%s" is parsed as "%s"', (video, parsedVideo) => {
    const formSync: FormSync = {
        state: 'ready',
        updateForm: jest.fn(),
        data: {},
    }
    render(<YouTubeVideoInput name='video' formSync={formSync} />)
    const input = screen.getByTestId('text-input-element')
    userEvent.type(input, video)
    userEvent.tab()

    expect(formSync.updateForm).toHaveBeenLastCalledWith(
        'video',
        parsedVideo,
        expect.any(Function),
        expect.any(Function)
    )
})
