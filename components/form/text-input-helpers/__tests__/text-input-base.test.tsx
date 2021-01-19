/* eslint-disable max-lines-per-function -- going to have lots of long, but still readable, functions */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { chance } from 'jest-chance'

import type { Autocomplete, Keyboard, Type } from '../text-input-base'
import { TextInputBase } from '../text-input-base'

const onChange = jest.fn()

test('renders without crashing', () => {
    const { baseElement } = render(
        <TextInputBase
            type='text'
            name='name'
            id='id'
            value='value'
            onChange={onChange}
            onKeyDown={jest.fn()}
        />
    )
    expect(baseElement).not.toBeEmptyDOMElement()
})

describe('name and id work correctly', () => {
    const names = ['', 'name', 'current-password', chance.string()]
    it.each(names)('name "%s" is specified on the input element', (name) => {
        render(
            <TextInputBase
                type='text'
                name={name}
                id='id'
                value='value'
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByTestId('text-input-element').getAttribute('name')).toBe(name)
    })
    const ids = ['', 'id', 'current-password', chance.string()]
    it.each(ids)('id "%s" is specified on the input element', (id) => {
        render(
            <TextInputBase
                type='text'
                name='name'
                id={id}
                value='value'
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByTestId('text-input-element').getAttribute('id')).toBe(id)
    })
})

describe('type works correctly', () => {
    const types = ['text', 'email']
    test.each(types)('type "%s" is passed as a prop to the TextInputElement', (type) => {
        render(
            <TextInputBase
                type={type as Type}
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByRole('textbox').getAttribute('type')).toBe(type)
    })
})

describe('label is present', () => {
    const labels = ['label', 'label text', chance.string().replace(/[\W]/gu, '')]
    it.each(labels)('label "%s" is present when provided', (label) => {
        render(
            <TextInputBase
                type='url'
                name='name'
                id='id'
                value='value'
                label={label}
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByText(label)).toBeTruthy()
    })
})

describe('tooltip is present', () => {
    const tooltips = ['info text', chance.string().replace(/[\W]/gu, '')]
    it.each(tooltips)('tooltip "%s" is present when provided', (tooltip) => {
        render(
            <TextInputBase
                type='url'
                name='name'
                id='id'
                value='value'
                info={tooltip}
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByText(tooltip)).toBeTruthy()
    })
    it('tooltip is not present when not provided', () => {
        render(
            <TextInputBase
                type='url'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.queryByTestId('tooltip')).toBeFalsy()
    })
})

describe('optional works when present', () => {
    it('optional text is present when optional', () => {
        render(
            <TextInputBase
                type='url'
                name='name'
                id='id'
                value='value'
                optional
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByText(/optional/u)).toBeTruthy()
    })
    it('optional text is not present when not optional', () => {
        render(
            <TextInputBase
                type='url'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.queryByText(/optional/u)).toBeFalsy()
    })
    it("if hideOptionalLabel, don't show optional text", () => {
        render(
            <TextInputBase
                type='url'
                name='name'
                id='id'
                value='value'
                optional
                hideOptionalLabel
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.queryByText(/optional/u)).toBeFalsy()
    })
})

describe('readonly works when present', () => {
    it('readonly text and attribute are present when readonly', () => {
        render(
            <TextInputBase
                type='url'
                name='name'
                id='id'
                value='value'
                readonly
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByText(/readonly/u)).toBeTruthy()
        expect(screen.getByRole('textbox').getAttribute('readonly')).not.toBeNull()
    })
    it('readonly text and attribute are not present when not readonly', () => {
        render(
            <TextInputBase
                type='url'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.queryByText(/readonly/u)).toBeFalsy()
        expect(screen.getByRole('textbox').getAttribute('readonly')).toBeNull()
    })
})

describe('help text appears properly', () => {
    const help = ['this is some help text', chance.string().replace(/[\W]/gu, '')]
    it.each(help)('help text "%s" appears when provided', (helpText) => {
        render(
            <TextInputBase
                type='url'
                name='name'
                id='id'
                value='value'
                help={helpText}
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByText(helpText)).toBeTruthy()
    })
})

describe('feedback text works correctly', () => {
    const errors = ['this is some error text.', `${chance.string().replace(/[\W]/gu, '')}.`]
    it.each(errors)('error "%s" text is shown when there\'s an error', (error) => {
        render(
            <TextInputBase
                type='url'
                name='name'
                id='id'
                value='value'
                error={error}
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByText(error)).toBeTruthy()
    })
    const successes = ['this is some success text.', `${chance.string().replace(/[\W]/gu, '')}.`]
    it.each(successes)('success text "%s" is shown when there\'s an success message', (success) => {
        render(
            <TextInputBase
                type='url'
                name='name'
                id='id'
                value='value'
                success={success}
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByText(success)).toBeTruthy()
    })
    it("success text is not shown when there's an error", () => {
        render(
            <TextInputBase
                type='url'
                name='name'
                id='id'
                value='value'
                success='this is some more success text'
                error='this is some more error text'
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.queryByText('this is some more success text.')).toBeFalsy()
        expect(screen.getByText('this is some more error text.')).toBeTruthy()
    })
})

describe('progress works correctly', () => {
    const progresses = ['22 / 23', 'One character left', chance.string().replace(/[\W]/gu, '')]
    it.each(progresses)('progress "%s" is shown when provided', (progress) => {
        render(
            <TextInputBase
                type='url'
                name='name'
                id='id'
                value='value'
                progress={progress}
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByText(progress)).toBeTruthy()
    })
})

describe('placeholder prop works correctly', () => {
    const placeholders = ['placeholder', '(###) ### - ####', chance.string()]
    it.each(placeholders)('input has placeholder "%s" prop when true', (placeholder) => {
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByRole('textbox').getAttribute('placeholder')).toBe(placeholder)
    })
    it("if placeholder is a string, it's rendered as undefined", () => {
        render(
            <TextInputBase
                type='text'
                name='name'
                placeholder=''
                id='id'
                value='value'
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByRole('textbox').getAttribute('placeholder')).toBeFalsy()
    })
    it('input does not have placeholder prop is not specified', () => {
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByRole('textbox').getAttribute('placeholder')).toBeFalsy()
    })
})

describe('disabled prop works correctly', () => {
    it('input has disabled prop when true', () => {
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                disabled
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByRole('textbox')).toBeDisabled()
    })
    it('input is not disabled prop when false', () => {
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                disabled={false}
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByRole('textbox')).toBeEnabled()
    })
    it('input is not disabled prop when undefined', () => {
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByRole('textbox')).toBeEnabled()
    })
})

describe('autocomplete prop works correctly', () => {
    const autoCompletes = ['off', 'on', 'current-password']
    it.each(autoCompletes)('input has autocomplete "%s" when defined', (autoComplete) => {
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                autoComplete={autoComplete as Autocomplete}
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByRole('textbox').getAttribute('autocomplete')).toBe(autoComplete)
    })
    it('input does not have autocomplete prop when undefined', () => {
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByRole('textbox').getAttribute('autocomplete')).toBeFalsy()
    })
})

describe('keyboard prop works correctly', () => {
    const keyboards = ['none', 'tel', 'email']
    it.each(keyboards)('input has keyboard "%s" prop when defined', (keyboard) => {
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                keyboard={keyboard as Keyboard}
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByRole('textbox').getAttribute('inputmode')).toBe(keyboard)
    })
    it('input does not have keyboard prop when undefined', () => {
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByRole('textbox').getAttribute('inputmode')).toBeFalsy()
    })
})

describe('affixes display when provided', () => {
    const affixes = ['$', '¥']
    it.each(affixes)('when prefix "%s" is provided, it\'s present', (affix) => {
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                prefix={affix}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByText(affix)).toBeTruthy()
    })
    it.each(affixes)('when suffix "%s" is provided, it\'s present', (affix) => {
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                suffix={affix}
                onKeyDown={jest.fn()}
            />
        )
        expect(screen.getByText(affix)).toBeTruthy()
    })
})

describe('when affixes are clicked, the correct action happens', () => {
    it('when the prefix is clicked, the onClick runs', () => {
        const onClickPrefixMock = jest.fn()
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                prefix='$'
                prefixOnClick={onClickPrefixMock}
                prefixName='Prefix button'
                onKeyDown={jest.fn()}
            />
        )
        userEvent.click(screen.getByRole('button'))
        expect(onClickPrefixMock).toHaveBeenCalledTimes(1)
    })
    it('when the suffix is clicked, the onClick runs', () => {
        const onClickSuffixMock = jest.fn()
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                suffix='$'
                suffixOnClick={onClickSuffixMock}
                suffixName='Suffix button'
                onKeyDown={jest.fn()}
            />
        )
        userEvent.click(screen.getByRole('button'))
        expect(onClickSuffixMock).toHaveBeenCalledTimes(1)
    })
    it('when both are present, the right function is called', () => {
        const onClickPrefixMock = jest.fn()
        const onClickSuffixMock = jest.fn()
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                prefix='$'
                prefixOnClick={onClickPrefixMock}
                prefixName='Prefix button'
                suffix='.00'
                suffixOnClick={onClickSuffixMock}
                suffixName='Suffix button'
                onKeyDown={jest.fn()}
            />
        )
        const [prefix, suffix] = screen.getAllByRole('button')

        userEvent.click(prefix)
        expect(onClickPrefixMock).toHaveBeenCalledTimes(1)
        expect(onClickSuffixMock).toHaveBeenCalledTimes(0)

        userEvent.click(suffix)
        expect(onClickPrefixMock).toHaveBeenCalledTimes(1)
        expect(onClickSuffixMock).toHaveBeenCalledTimes(1)
    })
})

describe('function hooks work when called', () => {
    it('onChange is called when value changes for input', () => {
        const onChangeMock = jest.fn()
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value=''
                onChange={onChangeMock}
                onKeyDown={jest.fn()}
            />
        )

        const input = screen.getByRole('textbox')
        expect(input.getAttribute('value')).toBe('')
        const typedText = 'value'
        userEvent.type(input, typedText)
        expect(onChangeMock).toHaveBeenCalledTimes(typedText.length)
    })
    it('onFocus is called when focused for input', () => {
        const onFocusMock = jest.fn()
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onFocus={onFocusMock}
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )

        const input = screen.getByRole('textbox')
        expect(onFocusMock).toHaveBeenCalledTimes(0)
        userEvent.click(input)
        expect(onFocusMock).toHaveBeenCalledTimes(1)
    })
    it('onBlur is called when blurred for input', () => {
        const onBlurMock = jest.fn()
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onBlur={onBlurMock}
                onChange={onChange}
                onKeyDown={jest.fn()}
            />
        )
        const input = screen.getByRole('textbox')
        userEvent.click(input)
        expect(onBlurMock).toHaveBeenCalledTimes(0)
        userEvent.tab()
        expect(onBlurMock).toHaveBeenCalledTimes(1)
    })
    test('clicking on suggestion calls callback', () => {
        const suggestionTexts = ['suggestion 1', 'suggestion 2']
        const onClickMock = jest.fn()
        render(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                onKeyDown={jest.fn()}
                onSuggestionClick={onClickMock}
                suggestions={suggestionTexts}
                showSuggestions
            />
        )
        userEvent.click(screen.getByRole('textbox'))
        userEvent.click(screen.getAllByTestId('text-input-suggestion')[0])
        expect(onClickMock).toHaveBeenCalled()
        expect(onClickMock).toHaveBeenLastCalledWith(suggestionTexts[0])
    })
})
