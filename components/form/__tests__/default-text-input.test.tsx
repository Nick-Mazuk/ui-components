import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import type { FormSync } from '..'
import { DateInput } from '../date-input'
import { DollarInput } from '../dollar-input'
import { EmailInput } from '../email-input'
import { FacebookPageInput } from '../facebook-page-input'
import { NameInput } from '../name-input'
import { NewPasswordInput } from '../new-password-input'
import { NumberInput } from '../number-input'
import { PasswordInput } from '../password-input'
import { SearchInput } from '../search-input'
import { TextAreaInput } from '../textarea-input'
import { TwitterProfileInput } from '../twitter-profile-input'
import { UrlInput } from '../url-input'
import { YouTubeChannelInput } from '../youtube-channel-input'
import { YouTubeVideoInput } from '../youtube-video-input'

type SpecialOptions = {
    label?: boolean
    name?: boolean
    id?: boolean

    placeholder?: boolean
    defaultValue?: boolean
    help?: boolean
    info?: boolean
    size?: boolean
    optional?: boolean
    readonly?: boolean
    disabled?: boolean
    requiredMessage?: boolean
    successMessage?: boolean
    hasProgress?: boolean
    maxCharacters?: boolean

    suggestions?: boolean
    hasIcon?: boolean
}

type InputName = string

type ValidText = string

type InputElement = (props: any) => JSX.Element

type InputArray = [InputName, InputElement, ValidText, SpecialOptions]

const Inputs: InputArray[] = [
    ['date input', DateInput, 'October 27, 2021', { hasIcon: true, maxCharacters: false }],
    ['dollar input', DollarInput, '1', { hasProgress: true, maxCharacters: false }],
    ['email input', EmailInput, 'example@email.com', { hasIcon: true }],
    ['name input', NameInput, 'Jane Smith', { hasIcon: true }],
    ['new password input', NewPasswordInput, 'letMeIn12345', { defaultValue: false }],
    ['number input', NumberInput, '1', { hasProgress: true, maxCharacters: false }],
    ['password input', PasswordInput, 'letMeIn12345', { defaultValue: false }],
    [
        'search input input',
        SearchInput,
        'some valid search',
        {
            hasIcon: true,
            optional: false,
            readonly: false,
            successMessage: false,
            requiredMessage: false,
            suggestions: true,
        },
    ],
    ['textarea input', TextAreaInput, 'This is some random text', {}],
    ['url input', UrlInput, 'https://example.com', { hasIcon: true }],
    ['youtube video input', YouTubeVideoInput, 'https://youtu.be/videoId', { hasIcon: true }],
    ['youtube channel input', YouTubeChannelInput, 'https://youtube.com/mkbhd', { hasIcon: true }],
    ['facebook page input', FacebookPageInput, 'https://facebook.com/facebook', { hasIcon: true }],
    ['twitter profile input', TwitterProfileInput, 'https://twitter.com/hello', { hasIcon: true }],
]

const EXCEPTION_INDEX = 3

test.each(Inputs)('%s renders without crashing', (_, Input) => {
    const { baseElement } = render(<Input />)
    expect(baseElement).not.toBeEmptyDOMElement()
})

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].label !== false))(
    '%s renders label',
    (_, Input) => {
        render(<Input label='Label' />)
        expect(screen.getByText('Label')).toBeTruthy()
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].name !== false))(
    '%s renders name',
    (_, Input) => {
        render(<Input name='name' />)
        expect(screen.getByTestId('text-input-element').getAttribute('name')).toBe('name')
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].id !== false))(
    '%s renders id',
    (_, Input) => {
        render(<Input id='id' />)
        expect(screen.getByTestId('text-input-element').getAttribute('id')).toBe('id')
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].placeholder !== false))(
    '%s renders placeholder',
    (_, Input) => {
        render(<Input placeholder='placeholder' />)
        expect(screen.getByTestId('text-input-element').getAttribute('placeholder')).toBe(
            'placeholder'
        )
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].defaultValue !== false))(
    '%s renders defaultValue',
    (_, Input) => {
        render(<Input defaultValue='defaultValue' />)
        expect(screen.getByTestId('text-input-element')).toHaveValue('defaultValue')
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].help !== false))(
    '%s renders help text',
    (_, Input) => {
        render(<Input help='help text' />)
        expect(screen.getByText('help text')).toBeTruthy()
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].info !== false))(
    '%s renders info text',
    (_, Input) => {
        render(<Input info='info text' />)
        expect(screen.getByText('info text')).toBeTruthy()
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].size !== false))(
    '%s renders as small size',
    (_, Input) => {
        render(<Input size='small' />)
        expect(screen.getByTestId('text-input-element')).toHaveClass('py-2')
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].size !== false))(
    '%s renders as default size',
    (_, Input) => {
        render(<Input size='default' />)
        expect(screen.getByTestId('text-input-element')).toHaveClass('py-3')
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].size !== false))(
    '%s renders as large size',
    (_, Input) => {
        render(<Input size='large' />)
        expect(screen.getByTestId('text-input-element')).toHaveClass('py-4')
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].optional !== false))(
    '%s renders optional',
    (_, Input) => {
        render(<Input optional />)
        expect(screen.getByText(/optional/u)).toBeTruthy()
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].optional !== false))(
    '%s allows empty fields when optional',
    (_, Input) => {
        render(<Input optional />)
        userEvent.click(screen.getByTestId('text-input-element'))
        userEvent.tab()
        expect(screen.queryByText('Error:')).toBeFalsy()
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].optional !== false))(
    "%s doesn't render optional when hidden",
    (_, Input) => {
        render(<Input optional hideOptionalLabel />)
        expect(screen.queryByText(/optional/u)).toBeFalsy()
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].readonly !== false))(
    '%s renders readonly',
    (_, Input) => {
        render(<Input readonly />)
        expect(screen.getByTestId('text-input-element').getAttribute('readonly')).not.toBeNull()
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].disabled !== false))(
    '%s renders disabled',
    (_, Input) => {
        render(<Input disabled />)
        expect(screen.getByTestId('text-input-element')).toBeDisabled()
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].requiredMessage !== false))(
    '%s renders required message',
    (_, Input) => {
        render(<Input requiredMessage='This input is required.' />)
        expect(screen.queryByText('This input is required.')).toBeFalsy()
        expect(screen.queryByText('Error:')).toBeFalsy()
        userEvent.click(screen.getByTestId('text-input-element'))
        userEvent.tab()
        expect(screen.getByText('This input is required.')).toBeTruthy()
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].successMessage !== false))(
    '%s renders success message',
    (_, Input, validText) => {
        render(<Input successMessage='This is some valid input.' />)
        expect(screen.queryByText('This is some valid input.')).toBeFalsy()

        userEvent.type(screen.getByTestId('text-input-element'), validText)
        userEvent.tab()

        expect(screen.getByText('This is some valid input.')).toBeTruthy()
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].maxCharacters !== false))(
    'Limits input to "%s" characters',
    (_, Input, validText) => {
        const MAX_CHARACTERS = 5
        render(<Input maxCharacters={MAX_CHARACTERS} />)
        expect(screen.getByText(`0 / ${MAX_CHARACTERS}`)).toBeTruthy()

        userEvent.type(screen.getByTestId('text-input-element'), validText)

        expect(
            screen.getByText(`${Math.min(5, validText.length)} / ${MAX_CHARACTERS}`)
        ).toBeTruthy()

        expect(
            (
                screen.getByTestId('text-input-element').getAttribute('value') ??
                screen.getByTestId('text-input-element').textContent
            )?.length
        ).toBeLessThanOrEqual(MAX_CHARACTERS)
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].hasProgress))(
    '%s renders progress',
    (_, Input, validText) => {
        const progressMock = jest.fn((value: string) => `progress: ${value}`)
        render(<Input progress={progressMock} />)

        userEvent.type(screen.getByTestId('text-input-element'), validText)

        expect(screen.getByText(`progress: ${validText}`)).toBeTruthy()
    }
)

test.each(Inputs)('%s allows you to delete all the characters', (_, Input, validText) => {
    render(<Input />)
    const input = screen.getByTestId('text-input-element')
    userEvent.type(input, validText)
    expect(input).toHaveValue(validText)
    userEvent.clear(input)
    expect(input).toHaveValue('')
})

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].hasIcon))(
    '%s renders an icon',
    (_, Input) => {
        const { container } = render(<Input />)
        expect(container.querySelector('svg')).toBeTruthy()
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].hasIcon))(
    "%s let's you hide the icon",
    (_, Input) => {
        const { container } = render(<Input hideIcon />)
        expect(container.querySelector('svg')).toBeFalsy()
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].suggestions))(
    '%s renders suggestions',
    (_, Input) => {
        render(<Input suggestions={['suggestion 1']} />)
        userEvent.click(screen.getByRole('searchbox'))
        expect(screen.getAllByTestId('text-input-suggestion')).toBeTruthy()
    }
)

test.each(Inputs.filter((array) => array[EXCEPTION_INDEX].suggestions))(
    '%s calls callback when suggestion is clicked',
    (_, Input) => {
        const onClickMock = jest.fn()
        render(<Input suggestions={['suggestion 1']} onSuggestionSelected={onClickMock} />)
        userEvent.click(screen.getByRole('searchbox'))
        userEvent.click(screen.getAllByTestId('text-input-suggestion')[0])
        expect(onClickMock).toHaveBeenCalledTimes(1)
        expect(onClickMock).toHaveBeenCalledWith('suggestion 1')
    }
)

test.each(Inputs)("%s let's you get the current value on every change", (_, Input, validText) => {
    const onChangeMock = jest.fn()
    render(<Input onChange={onChangeMock} />)
    userEvent.type(screen.getByTestId('text-input-element'), validText)
    expect(onChangeMock).toHaveBeenCalledTimes(validText.length)
    expect(onChangeMock).toHaveBeenLastCalledWith(validText)
})

test.each(Inputs)('%s syncs via formSync', (_, Input) => {
    const formSync: FormSync = {
        state: 'ready',
        updateForm: jest.fn(),
        data: {},
    }
    render(<Input formSync={formSync} />)
    expect(formSync.updateForm).toHaveBeenCalledTimes(1)
})

test.each(Inputs)('"%s"as no accessibility issues', async (_, Input) => {
    const { container } = render(<Input />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
})
