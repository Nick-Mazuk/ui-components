import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { shallow } from 'enzyme'
import { axe } from 'jest-axe'

import type { FormSync } from '..'
import { Form } from '..'
import { Button } from '../../../elements/button'
import { User } from '../../../elements/icon'
import { TextInput } from '../text-input'
import type { Autocomplete, Type } from '../text-input-helpers/text-input-base'

test('renders without crashing', () => {
    const { baseElement } = render(<TextInput type='text' name='text-input' />)
    expect(baseElement).not.toBeEmptyDOMElement()
})

/* 
   
   
   
   all the visual stuff
   
   
   
    */

describe('make sure either label, id, or name is defined', () => {
    test('throw error if all are undefined', () => {
        expect(() => {
            shallow(<TextInput type='text' />)
        }).toThrow()
    })
})

describe('"label" prop is passed down', () => {
    const labelValues = ['Name', 'Email', 'Username', 'The second month that ever happened']
    test.each(labelValues)('with a label of "%s"', (label) => {
        const wrapper = shallow(<TextInput type='text' label={label} />).find('TextInputBase')
        expect(wrapper.prop('label')).toBe(label)
        expect(wrapper.prop('name')).toBeDefined()
        expect(wrapper.prop('id')).toBeDefined()
    })
    test('label is "" when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('label')
        ).toBe('')
    })
})

describe('"name" prop is passed down', () => {
    const nameValues = ['name', 'email', 'username', 'the-third-month-that-ever-happened']
    test.each(nameValues)('with an name of "%s"', (name) => {
        const wrapper = shallow(<TextInput type='text' name={name} />).find('TextInputBase')
        expect(wrapper.prop('name')).toBe(name)
    })
    test.each(nameValues)('name is derived from label when not defined', (label) => {
        expect(
            shallow(<TextInput type='url' label={label} />)
                .find('TextInputBase')
                .prop('name')
        ).toBeDefined()
    })
})

describe('"id" prop is passed down', () => {
    const idValues = ['name', 'email', 'username', 'the-third-month-that-ever-happened']
    test.each(idValues)('with an id of "%s"', (id) => {
        const wrapper = shallow(<TextInput type='text' id={id} />).find('TextInputBase')
        expect(wrapper.prop('id')).toBe(id)
    })
    test.each(idValues)('id is name when not defined', (name) => {
        expect(
            shallow(<TextInput type='url' name={name} />)
                .find('TextInputBase')
                .prop('id')
        ).toBe(name)
    })
})

describe('"type" prop is passed down', () => {
    const types: Type[] = ['text', 'email', 'number', 'password', 'search', 'textarea', 'url']
    test.each(types)('%s type', (type) => {
        expect(
            shallow(<TextInput type={type} name='text-input' />)
                .find('TextInputBase')
                .prop('type')
        ).toBe(type)
    })
})

describe('"placeholder" prop is passed down', () => {
    test.each(['', 'Hello world', 'defaultValue', 'Default value', '$1,000.00'])(
        'with a placeholder of "%s"',
        (placeholder) => {
            expect(
                shallow(<TextInput type='text' name='text-input' placeholder={placeholder} />)
                    .find('TextInputBase')
                    .prop('placeholder')
            ).toBe(placeholder)
        }
    )
    test('placeholder is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('placeholder')
        ).toBeUndefined()
    })
})

describe('"defaultValue" prop is passed down', () => {
    test.each(['', 'Hello world', 'defaultValue', 'Default value', '$1,000.00'])(
        'with a placeholder of "%s"',
        (value) => {
            expect(
                shallow(<TextInput type='text' name='text-input' defaultValue={value} />)
                    .find('TextInputBase')
                    .prop('value')
            ).toBe(value)
        }
    )
    test('value is an empty string when defaultValue is undefined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('value')
        ).toBe('')
    })
})

describe('"size" prop is passed down', () => {
    test.each(['small', 'default', 'large'])('with a size "%s"', (size) => {
        expect(
            shallow(
                <TextInput
                    type='text'
                    name='text-input'
                    size={size as 'small' | 'default' | 'large'}
                />
            )
                .find('TextInputBase')
                .prop('size')
        ).toBe(size)
    })
    test('size is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('size')
        ).toBeUndefined()
    })
})

describe('"optional" prop is passed down', () => {
    test.each([true, false])('optional is "%p"', (optional) => {
        expect(
            shallow(<TextInput type='text' name='text-input' optional={optional} />)
                .find('TextInputBase')
                .prop('optional')
        ).toBe(optional)
    })
    test('optional is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('optional')
        ).toBeUndefined()
    })
})

describe('"hideOptionalLabel" prop is passed down', () => {
    test.each([true, false, undefined])('optional is "%p"', (value) => {
        expect(
            shallow(<TextInput type='text' name='text-input' hideOptionalLabel={value} />)
                .find('TextInputBase')
                .prop('hideOptionalLabel')
        ).toBe(value)
    })
    test('hideOptionalLabel is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('hideOptionalLabel')
        ).toBeUndefined()
    })
})

describe('"readonly" prop is passed down', () => {
    test.each([true, false])('optional is "%p"', (readonly) => {
        expect(
            shallow(<TextInput type='text' name='text-input' readonly={readonly} />)
                .find('TextInputBase')
                .prop('readonly')
        ).toBe(readonly)
    })
    test('readonly is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('readonly')
        ).toBeUndefined()
    })
})

describe('"disabled" prop is passed down', () => {
    test.each([true, false])('disabled is "%p"', (disabled) => {
        expect(
            shallow(<TextInput type='text' name='text-input' disabled={disabled} />)
                .find('TextInputBase')
                .prop('disabled')
        ).toBe(disabled)
    })
    test('disabled is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('disabled')
        ).toBeUndefined()
    })
})

describe('"textRight" prop is passed down', () => {
    test.each([true, false])('textRight is "%p"', (textRight) => {
        expect(
            shallow(<TextInput type='text' name='text-input' textRight={textRight} />)
                .find('TextInputBase')
                .prop('textRight')
        ).toBe(textRight)
    })
    test('textRight is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('textRight')
        ).toBeUndefined()
    })
})

describe('"tabNums" prop is passed down', () => {
    test.each([true, false])('tabNums is "%p"', (tabNums) => {
        expect(
            shallow(<TextInput type='text' name='text-input' tabNums={tabNums} />)
                .find('TextInputBase')
                .prop('tabNums')
        ).toBe(tabNums)
    })
    test('tabNums is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('tabNums')
        ).toBeUndefined()
    })
})

describe('"help" prop is passed down', () => {
    test.each([
        '',
        'This is some help text',
        'We never sell or share your email to anyone',
        '(###) ### - ####',
    ])('help is "%p"', (help) => {
        expect(
            shallow(<TextInput type='text' name='text-input' help={help} />)
                .find('TextInputBase')
                .prop('help')
        ).toBe(help)
    })
    test('help is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('help')
        ).toBeUndefined()
    })
})

describe('"info" prop is passed down', () => {
    test.each([
        '',
        'This is some info text',
        'We never sell or share your email to anyone',
        '(###) ### - ####',
    ])('info is "%p"', (info) => {
        expect(
            shallow(<TextInput type='text' name='text-input' info={info} />)
                .find('TextInputBase')
                .prop('info')
        ).toBe(info)
    })
    test('info is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('info')
        ).toBeUndefined()
    })
})

describe('"keyboard" prop is passed down', () => {
    test.each(['email', 'search', 'url', 'decimal', 'none', 'numeric', 'tel'])(
        'keyboard is "%p"',
        (keyboard) => {
            expect(
                shallow(
                    <TextInput
                        type='text'
                        name='text-input'
                        keyboard={
                            keyboard as
                                | 'email'
                                | 'search'
                                | 'url'
                                | 'decimal'
                                | 'none'
                                | 'numeric'
                                | 'tel'
                        }
                    />
                )
                    .find('TextInputBase')
                    .prop('keyboard')
            ).toBe(keyboard)
        }
    )
    test('keyboard is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('keyboard')
        ).toBeUndefined()
    })
})

describe('"autoComplete" prop is passed down', () => {
    // eslint-disable-next-line prettier/prettier -- will be horrendous if each value is on its own line
    const autoCompletes: Autocomplete[] = ['', 'off', 'on', 'name', 'honorific-prefix', 'given-name', 'additional-name', 'family-name', 'honorific-suffix', 'nickname', 'email', 'username', 'new-password', 'current-password', 'one-time-code', 'organization-title', 'organization', 'street-address', 'address-line1', 'address-line2', 'address-line3', 'address-level1', 'address-level2', 'address-level3', 'address-level4', 'country', 'country-name', 'postal-code', 'cc-name', 'cc-given-name', 'cc-additional-name', 'cc-family-name', 'cc-number', 'cc-exp', 'cc-exp-month', 'cc-exp-year', 'cc-csc', 'cc-type', 'transaction-currency', 'transaction-amount', 'language', 'bday', 'bday-day', 'bday-month', 'bday-year', 'sex', 'tel', 'tel-country-code', 'tel-national', 'tel-area-code', 'tel-local', 'tel-extension', 'impp', 'url', 'photo',]
    test.each(autoCompletes)('autoComplete is "%p"', (autoComplete) => {
        expect(
            shallow(<TextInput type='text' name='text-input' autoComplete={autoComplete} />)
                .find('TextInputBase')
                .prop('autoComplete')
        ).toBe(autoComplete)
    })
    test('autoComplete is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('autoComplete')
        ).toBeUndefined()
    })
})

describe('"prefix" prop is passed down', () => {
    test.each(['', '$', '¥', <User key='user' />])('prefix is "%p"', (prefix) => {
        expect(
            shallow(<TextInput type='text' name='text-input' prefix={prefix} />)
                .find('TextInputBase')
                .prop('prefix')
        ).toBe(prefix)
    })
    test('prefix is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('prefix')
        ).toBeUndefined()
    })
})

describe('"suffix" prop is passed down', () => {
    test.each(['', '$', '¥', <User key='user' />])('suffix is "%p"', (suffix) => {
        expect(
            shallow(<TextInput type='text' name='text-input' suffix={suffix} />)
                .find('TextInputBase')
                .prop('suffix')
        ).toBe(suffix)
    })
    test('suffix is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('suffix')
        ).toBeUndefined()
    })
})

describe('"prefixOnClick" prop is passed down', () => {
    test.each([undefined, jest.fn])('suffix is "%p"', (prefixOnClick) => {
        expect(
            shallow(<TextInput type='text' name='text-input' prefixOnClick={prefixOnClick} />)
                .find('TextInputBase')
                .prop('prefixOnClick')
        ).toBe(prefixOnClick)
    })
    test('prefixOnClick is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('prefixOnClick')
        ).toBeUndefined()
    })
})

describe('"suffixOnClick" prop is passed down', () => {
    test.each([undefined, jest.fn])('suffix is "%p"', (suffixOnClick) => {
        expect(
            shallow(<TextInput type='text' name='text-input' suffixOnClick={suffixOnClick} />)
                .find('TextInputBase')
                .prop('suffixOnClick')
        ).toBe(suffixOnClick)
    })
    test('suffixOnClick is undefined when not defined', () => {
        expect(
            shallow(<TextInput type='url' name='text-input' />)
                .find('TextInputBase')
                .prop('suffixOnClick')
        ).toBeUndefined()
    })
})

/* 
   
   
   
   that the unnconfigured input formats functions properly (e.g., onChange updates input, blur validates, etc.)
   
   
   
    */

describe("typing into the input updates the input's value", () => {
    const inputs = ['', 'this is the input']
    it.each(inputs)('as a user types "%s", the value shown in the input updates', (input) => {
        render(<TextInput type='text' label='text-input' />)
        userEvent.type(screen.getByRole('textbox'), input)
        expect(screen.getByRole('textbox').getAttribute('value')).toBe(input)
    })
})

describe('user can delete text', () => {
    it('as a user deletes, the value shown in the input updates', () => {
        render(<TextInput type='text' label='text-input' defaultValue='starting value' />)
        userEvent.type(screen.getByRole('textbox'), '{backspace}')
        expect(screen.getByRole('textbox').getAttribute('value')).toBe('starting valu')
        userEvent.type(screen.getByRole('textbox'), '{backspace}')
        expect(screen.getByRole('textbox').getAttribute('value')).toBe('starting val')
        userEvent.type(screen.getByRole('textbox'), '{backspace}')
        expect(screen.getByRole('textbox').getAttribute('value')).toBe('starting va')
        userEvent.type(screen.getByRole('textbox'), '{backspace}')
        expect(screen.getByRole('textbox').getAttribute('value')).toBe('starting v')
        userEvent.type(screen.getByRole('textbox'), '{backspace}')
        expect(screen.getByRole('textbox').getAttribute('value')).toBe('starting ')
    })
})

describe('input is invalid when input is empty and field is required', () => {
    it('marked as invalid only onBlur', () => {
        render(<TextInput type='text' label='Name' />)
        expect(screen.getByTestId('text-input-wrapper')).not.toHaveClass(
            'shadow-input-error-border'
        )
        userEvent.click(screen.getByRole('textbox'))
        expect(screen.getByTestId('text-input-wrapper')).not.toHaveClass(
            'shadow-input-error-border'
        )
        userEvent.tab()
        expect(screen.getByTestId('text-input-wrapper')).toHaveClass('shadow-input-error-border')
    })
    test('custom required message is shown', () => {
        render(<TextInput type='text' label='Name' requiredMessage='Name is required' />)
        expect(screen.queryByText('Error:')).toBeFalsy()
        expect(screen.queryByText('Name is required.')).toBeFalsy()
        userEvent.click(screen.getByRole('textbox'))
        expect(screen.queryByText('Error:')).toBeFalsy()
        expect(screen.queryByText('Name is required.')).toBeFalsy()
        userEvent.tab()
        expect(screen.getByText('Error:')).toBeTruthy()
        expect(screen.getByText('Name is required.')).toBeTruthy()
    })
    test('input is marked as valid after typing a valid input', () => {
        render(<TextInput type='text' label='Name' requiredMessage='Name is required' />)
        userEvent.click(screen.getByRole('textbox'))
        userEvent.tab()
        expect(screen.getByText('Name is required.')).toBeTruthy()
        userEvent.type(screen.getByRole('textbox'), 's')
        expect(screen.queryByText('Name is required.')).toBeFalsy()
        expect(screen.getByRole('textbox')).toHaveFocus()
    })
})

describe('success message is shown when field is valid', () => {
    test('custom success message is shown', () => {
        render(<TextInput type='text' label='Name' successMessage='That looks good!' />)
        userEvent.type(screen.getByRole('textbox'), 'some valid input')
        userEvent.tab()
        expect(screen.getByText('That looks good!')).toBeTruthy()
        expect(screen.getByTestId('success')).toBeTruthy()
    })
    test('success message is not shown if not provided', () => {
        render(<TextInput type='text' label='Name' />)
        userEvent.type(screen.getByRole('textbox'), 'some valid input')
        userEvent.tab()
        expect(screen.queryByTestId('success')).toBeFalsy()
    })
})

/* 
   
   
   
   test hooks for validation, formatting, etc.
   
   
   
    */

describe('onUpdate works as expected', () => {
    test('onUpdate only runs when the input should update', () => {
        const mock = jest.fn((value: string) => value.toUpperCase())
        render(<TextInput type='text' label='Name' onUpdate={mock} />)
        const input = screen.getByRole('textbox')
        userEvent.type(input, 'hello world')
        expect(input).toHaveValue('HELLO WORLD')
        expect(input).toHaveFocus()
        expect(mock).toHaveBeenCalledTimes(11)
    })
})

describe('validation rules works as expected', () => {
    test('validation rules shows an error when they fail, and errors display in order', () => {
        const rules = [
            {
                assert: (value: string) => value.length > 10,
                error: 'must be longer than 10 characters',
            },
            {
                assert: (value: string) => Boolean(value.match(/^\S+$/u)),
                error: 'cannot include spaces',
            },
            {
                assert: (value: string) => value.length < 20,
                error: 'must be less than 20 characters',
            },
        ]
        render(<TextInput type='text' label='Name' validationRules={rules} />)
        const input = screen.getByRole('textbox')
        userEvent.type(input, 'hello')
        expect(input).toHaveFocus()
        expect(screen.queryByText('Error:')).toBeFalsy()
        userEvent.tab()
        expect(input).not.toHaveFocus()
        expect(screen.getByText('Error:')).toBeTruthy()
        expect(screen.getByText('must be longer than 10 characters.')).toBeTruthy()

        userEvent.type(input, ' world')
        userEvent.tab()
        expect(screen.getByText('cannot include spaces.')).toBeTruthy()

        userEvent.type(input, 'some more things to make it long')
        userEvent.tab()
        expect(screen.getByText('cannot include spaces.')).toBeTruthy()

        userEvent.clear(input)
        // eslint-disable-next-line no-secrets/no-secrets -- just a normal string
        userEvent.type(input, 'reallyLongThingThatHasNoSpaces')
        userEvent.tab()
        expect(screen.getByText('must be less than 20 characters.')).toBeTruthy()

        userEvent.clear(input)
        userEvent.type(input, 'thisHasNoSpaces')
        userEvent.tab()
        expect(screen.queryByText('Error:')).toBeFalsy()
    })
})

describe('formatter works as expected', () => {
    test('formatter runs on blur', () => {
        const mock = jest.fn((value: string) => value.toUpperCase())
        render(<TextInput type='text' label='Name' formatter={mock} />)
        const input = screen.getByRole('textbox')
        userEvent.type(input, 'hello world')
        expect(input).toHaveValue('hello world')
        expect(input).toHaveFocus()
        expect(mock).toHaveBeenCalledTimes(0)

        userEvent.tab()
        expect(input).toHaveValue('HELLO WORLD')
        expect(input).not.toHaveFocus()
        expect(mock).toHaveBeenCalledTimes(1)

        userEvent.click(input)
        expect(mock).toHaveBeenCalledTimes(1)
    })
})

describe('progress works as expected', () => {
    test('progress is called every keystroke', () => {
        const mock = jest.fn((value: string) => `${value.length} / 23`)
        render(<TextInput type='text' label='Name' progress={mock} />)
        expect(screen.getByText('0 / 23')).toBeTruthy()
        expect(mock).toHaveBeenCalledTimes(1)

        const input = screen.getByRole('textbox')
        userEvent.type(input, 'hello world')

        expect(screen.getByText('11 / 23')).toBeTruthy()

        userEvent.tab()
        expect(screen.getByText('11 / 23')).toBeTruthy()
    })

    test('progress overrides maxCharacters', () => {
        const mock = jest.fn((value: string) => `${value.length} / 23`)
        render(<TextInput type='text' label='Name' progress={mock} maxCharacters={10} />)
        expect(screen.getByText('0 / 23')).toBeTruthy()
        expect(mock).toHaveBeenCalledTimes(1)

        const input = screen.getByRole('textbox')
        userEvent.type(input, 'hello world')
        expect(input).toHaveValue('hello worl')

        expect(screen.getByText('10 / 23')).toBeTruthy()

        userEvent.tab()
        expect(screen.getByText('10 / 23')).toBeTruthy()
    })
})

describe('maxCharacters stops a user from typing too much text', () => {
    test('progress is called every keystroke', () => {
        render(<TextInput type='text' label='Name' maxCharacters={5} />)

        expect(screen.getByText('0 / 5')).toBeTruthy()

        const input = screen.getByRole('textbox')
        userEvent.type(input, 'hello world')

        expect(input).toHaveValue('hello')

        expect(screen.getByText('5 / 5')).toBeTruthy()
    })
})

describe('suggestions are shown', () => {
    test('only when the input is focused', () => {
        render(<TextInput type='text' label='Name' suggestions={['suggestion 1']} />)

        expect(screen.queryByTestId('text-input-suggestions')).toBeFalsy()
        userEvent.click(screen.getByRole('textbox'))
        expect(screen.getByTestId('text-input-suggestions')).toBeTruthy()
        userEvent.tab()
        expect(screen.queryByTestId('text-input-suggestions')).toBeFalsy()
    })
})

const getActiveSuggestion = () => {
    const suggestions = screen.queryAllByTestId('text-input-suggestion')
    for (const [index, suggestion] of suggestions.entries())
        if (suggestion.classList.contains('bg-gray-30')) return index
    return -1
}

describe('users can navigate the suggestions with their keyboard', () => {
    const suggestionTexts = ['suggestion 1', 'suggestion 2', 'suggestion 3', 'suggestion 4']
    test('can use down arrow to select the next suggestion', () => {
        render(<TextInput type='text' label='Name' suggestions={suggestionTexts} />)
        expect(getActiveSuggestion()).toBe(-1)
        const input = screen.getByRole('textbox')
        userEvent.type(input, '{arrowdown}')
        expect(getActiveSuggestion()).toBe(0)
        userEvent.type(input, '{arrowdown}')
        expect(getActiveSuggestion()).toBe(1)
    })
    test('can use up arrow to select the previous suggestion', () => {
        render(<TextInput type='text' label='Name' suggestions={suggestionTexts} />)
        expect(getActiveSuggestion()).toBe(-1)
        const input = screen.getByRole('textbox')
        userEvent.type(input, '{arrowup}')
        expect(getActiveSuggestion()).toBe(3)
        userEvent.type(input, '{arrowup}')
        expect(getActiveSuggestion()).toBe(2)
    })
    test('selection wraps around after getting to the top or bottom', () => {
        render(<TextInput type='text' label='Name' suggestions={suggestionTexts} />)
        expect(getActiveSuggestion()).toBe(-1)
        const input = screen.getByRole('textbox')
        userEvent.type(input, '{arrowup}')
        expect(getActiveSuggestion()).toBe(3)
        userEvent.type(input, '{arrowdown}')
        expect(getActiveSuggestion()).toBe(0)
    })
    test('when using the arrow keys, the text input remains focused', () => {
        render(<TextInput type='text' label='Name' suggestions={suggestionTexts} />)
        const input = screen.getByRole('textbox')
        userEvent.type(input, '{arrowup}')
        expect(input).toHaveFocus()
        userEvent.type(input, '{arrowdown}')
        expect(input).toHaveFocus()
    })
})

describe('activeSuggestion is reset appropriately', () => {
    const suggestionTexts = ['suggestion 1', 'suggestion 2', 'suggestion 3', 'suggestion 4']
    test('the input value changes', () => {
        render(<TextInput type='text' label='Name' suggestions={suggestionTexts} />)
        const input = screen.getByRole('textbox')
        userEvent.type(input, '{arrowdown}')
        expect(getActiveSuggestion()).toBe(0)
        userEvent.type(input, 'a')
        expect(getActiveSuggestion()).toBe(-1)
    })
    test('when the input refocuses', () => {
        render(<TextInput type='text' label='Name' suggestions={suggestionTexts} />)
        const input = screen.getByRole('textbox')
        userEvent.type(input, '{arrowdown}')
        expect(getActiveSuggestion()).toBe(0)
        expect(input).toHaveFocus()
        userEvent.tab()
        expect(input).not.toHaveFocus()
        userEvent.click(input)
        expect(input).toHaveFocus()
        expect(getActiveSuggestion()).toBe(-1)
        userEvent.type(input, '{arrowdown}')
        expect(getActiveSuggestion()).toBe(0)
    })
})

// eslint-disable-next-line max-lines-per-function -- individual tests are short
describe('users can select suggestions', () => {
    const suggestionTexts = ['suggestion 1', 'suggestion 2', 'suggestion 3', 'suggestion 4']
    test('users can select a suggestion by clicking it', () => {
        const suggestionMock = jest.fn()
        render(
            <TextInput
                type='text'
                label='Name'
                onSuggestionSelected={suggestionMock}
                suggestions={suggestionTexts}
            />
        )
        const input = screen.getByRole('textbox')
        userEvent.click(input)
        userEvent.click(screen.getAllByTestId('text-input-suggestion')[0])

        expect(input).toHaveValue(suggestionTexts[0])

        expect(suggestionMock).toHaveBeenCalledTimes(1)
        expect(suggestionMock).toHaveBeenCalledWith(suggestionTexts[0])
    })
    test('users can select a suggestion by pressing enter', () => {
        const suggestionMock = jest.fn()
        render(
            <TextInput
                type='text'
                label='Name'
                onSuggestionSelected={suggestionMock}
                suggestions={suggestionTexts}
            />
        )
        const input = screen.getByRole('textbox')
        userEvent.type(input, '{arrowdown}')
        expect(getActiveSuggestion()).toBe(0)
        userEvent.type(input, '{enter}')

        expect(input).toHaveValue(suggestionTexts[0])

        expect(suggestionMock).toHaveBeenCalledTimes(1)
        expect(suggestionMock).toHaveBeenCalledWith(suggestionTexts[0])
    })
    test('pressing enter when a suggestion is selected does not submit a form', () => {
        const suggestionMock = jest.fn()
        const handleSubmitMock = jest.fn()
        render(
            <Form handleSubmit={handleSubmitMock}>
                {(formSync) => (
                    <>
                        <TextInput
                            type='text'
                            label='Name'
                            onSuggestionSelected={suggestionMock}
                            suggestions={suggestionTexts}
                            formSync={formSync}
                        />
                        <Button value='submit' type='submit' />
                    </>
                )}
            </Form>
        )
        const input = screen.getByRole('textbox')
        userEvent.type(input, '{arrowdown}')
        expect(getActiveSuggestion()).toBe(0)
        userEvent.type(input, '{enter}')

        expect(handleSubmitMock).toHaveBeenCalledTimes(0)
    })
})

/* 
   
   
   
   test interaction with formSync
   
   
   
    */

// eslint-disable-next-line max-lines-per-function -- every test is short
describe('formSync works', () => {
    test('input is synced and parsed', () => {
        const formSync: FormSync = {
            state: 'ready',
            updateForm: jest.fn(),
            data: {},
        }
        const parser = jest.fn((value: string) => value.toUpperCase())
        render(
            <TextInput
                type='text'
                label='Name'
                name='form-sync-name'
                parser={parser}
                formSync={formSync}
            />
        )
        expect(formSync.updateForm).toHaveBeenCalledTimes(1)
        expect(formSync.updateForm).toHaveBeenCalledWith(
            'form-sync-name',
            '',
            expect.any(Function),
            expect.any(Function)
        )

        const input = screen.getByRole('textbox')
        userEvent.type(input, 'hello world')

        userEvent.tab()

        expect(formSync.updateForm).toHaveBeenCalledTimes(2)
        expect(formSync.updateForm).toHaveBeenCalledWith(
            'form-sync-name',
            'HELLO WORLD',
            expect.any(Function),
            expect.any(Function)
        )
    })

    test('if input has a default value, it should sync with the form immediately', () => {
        const formSync: FormSync = {
            state: 'ready',
            updateForm: jest.fn(),
            data: {},
        }
        render(
            <TextInput
                type='text'
                label='Name'
                name='form-sync-name'
                defaultValue='hello world'
                formSync={formSync}
            />
        )

        expect(formSync.updateForm).toHaveBeenCalledTimes(1)
        expect(formSync.updateForm).toHaveBeenCalledWith(
            'form-sync-name',
            'hello world',
            expect.any(Function),
            expect.any(Function)
        )
    })

    test('if the user presses "enter" while typing, it should sync with the form before submitting', () => {
        const formSync: FormSync = {
            state: 'ready',
            updateForm: jest.fn(),
            data: {},
        }
        render(<TextInput type='text' label='Name' name='form-sync-name' formSync={formSync} />)

        const input = screen.getByRole('textbox')
        userEvent.type(input, 'hello world{enter}')
        expect(formSync.updateForm).toHaveBeenLastCalledWith(
            'form-sync-name',
            'hello world',
            expect.any(Function),
            expect.any(Function)
        )
    })

    test('When the form is cleared, the text input value is ""', async () => {
        render(
            <Form handleSubmit={jest.fn(() => Promise.resolve(true))} clearOnSubmit>
                {(formSync) => {
                    return (
                        <>
                            <TextInput
                                type='text'
                                label='Name'
                                name='form-sync-name'
                                formSync={formSync}
                            />
                            <p>{`Form state: ${formSync.state}`}</p>
                        </>
                    )
                }}
            </Form>
        )

        const input = screen.getByRole('textbox')
        userEvent.type(input, 'hello world')
        expect(input).toHaveValue('hello world')
        userEvent.type(input, '{enter}')
        await waitFor(() => expect(screen.getByText('Form state: submitted')).toBeTruthy())
        expect(input).toHaveValue('')
    })

    test('When the form is cleared, the text input value is the defaultValue if provided', async () => {
        const defaultValue = 'default'
        render(
            <Form handleSubmit={jest.fn(() => Promise.resolve(true))} clearOnSubmit>
                {(formSync) => {
                    return (
                        <>
                            <TextInput
                                type='text'
                                label='Name'
                                name='form-sync-name'
                                defaultValue={defaultValue}
                                formSync={formSync}
                            />
                            <p>{`Form state: ${formSync.state}`}</p>
                        </>
                    )
                }}
            </Form>
        )

        const input = screen.getByRole('textbox')
        userEvent.clear(input)
        userEvent.type(input, 'hello world')
        expect(input).toHaveValue('hello world')
        userEvent.type(input, '{enter}')
        await waitFor(() => expect(screen.getByText('Form state: submitted')).toBeTruthy())
        expect(input).toHaveValue(defaultValue)
    })
})

/* 
   
   
   
   test accessibility
   
   
   
    */

test('Has no accessibility issues', async () => {
    const { container } = render(
        <TextInput type='text' label='Name' suggestions={['Suggestion 1']} />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
})
