/* eslint-disable max-lines-per-function -- going to have lots of long, but still readable, functions */

import { mount, render, shallow } from 'enzyme'
import { chance } from 'jest-chance'

import { TextInputBase } from '../text-input-base'

const onChange = jest.fn()

test('renders without crashing', () => {
    const wrapper = shallow(
        <TextInputBase type='text' name='name' id='id' value='value' onChange={onChange} />
    )
    expect(wrapper.isEmptyRender()).toEqual(false)
})

describe('name and id work correctly', () => {
    it('name is specified on the input element', () => {
        expect(
            mount(
                <TextInputBase type='text' name='name' id='id' value='value' onChange={onChange} />
            )
                .find('input')
                .prop('name')
        ).toBe('name')
        expect(
            mount(<TextInputBase type='text' name='' id='id' value='value' onChange={onChange} />)
                .find('input')
                .prop('name')
        ).toBe('')

        const nameMock = chance.string()

        expect(
            mount(
                <TextInputBase
                    type='text'
                    name={nameMock}
                    id='id'
                    value='value'
                    onChange={onChange}
                />
            )
                .find('input')
                .prop('name')
        ).toBe(nameMock)
    })
    it('id is specified on the input element', () => {
        expect(
            mount(
                <TextInputBase type='text' name='name' id='id' value='value' onChange={onChange} />
            )
                .find('input')
                .prop('id')
        ).toBe('id')
        expect(
            mount(<TextInputBase type='text' name='name' id='' value='value' onChange={onChange} />)
                .find('input')
                .prop('id')
        ).toBe('')

        const idMock = chance.string()

        expect(
            mount(
                <TextInputBase
                    type='text'
                    name='name'
                    id={idMock}
                    value='value'
                    onChange={onChange}
                />
            )
                .find('input')
                .prop('id')
        ).toBe(idMock)
    })
})

describe('type works correctly', () => {
    test('type is passed as a prop to the TextInputElement', () => {
        expect(
            shallow(
                <TextInputBase type='text' name='name' id='id' value='value' onChange={onChange} />
            )
                .find('TextInputElement')
                .prop('type')
        ).toBe('text')
        expect(
            shallow(
                <TextInputBase
                    type='textarea'
                    name='name'
                    id='id'
                    value='value'
                    onChange={onChange}
                />
            )
                .find('TextInputElement')
                .prop('type')
        ).toBe('textarea')
        expect(
            shallow(
                <TextInputBase type='email' name='name' id='id' value='value' onChange={onChange} />
            )
                .find('TextInputElement')
                .prop('type')
        ).toBe('email')
        expect(
            shallow(
                <TextInputBase type='url' name='name' id='id' value='value' onChange={onChange} />
            )
                .find('TextInputElement')
                .prop('type')
        ).toBe('url')
    })
})

describe('label is present', () => {
    it('label is present when provided', () => {
        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    label='label text'
                    onChange={onChange}
                />
            ).html()
        ).toMatch('label text')

        const labelMock = chance.string().replace(/[\W]/gu, '')

        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    label={labelMock}
                    onChange={onChange}
                />
            ).html()
        ).toMatch(labelMock)
    })
    test('label is not present when missing', () => {
        expect(
            shallow(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    label=''
                    onChange={onChange}
                />
            )
                .find('LabelGroup')
                .prop('label')
        ).toBe('')
        expect(
            shallow(
                <TextInputBase type='url' name='name' id='id' value='value' onChange={onChange} />
            )
                .find('LabelGroup')
                .prop('label')
        ).toBeUndefined()
    })
})

describe('tooltip is present', () => {
    it('tooltip is present when provided', () => {
        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    info='info text'
                    onChange={onChange}
                />
            ).html()
        ).toMatch('info text')

        const labelMock = chance.string().replace(/[\W]/gu, '')

        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    info={labelMock}
                    onChange={onChange}
                />
            ).html()
        ).toMatch(labelMock)
    })
    test('info is not present when missing', () => {
        expect(
            shallow(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    info=''
                    onChange={onChange}
                />
            )
                .find('LabelGroup')
                .prop('info')
        ).toBe('')
        expect(
            shallow(
                <TextInputBase type='url' name='name' id='id' value='value' onChange={onChange} />
            )
                .find('LabelGroup')
                .prop('info')
        ).toBeUndefined()
    })
})

describe('optional/readonly work when present', () => {
    it('optional text is present when optional', () => {
        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    optional
                    onChange={onChange}
                />
            ).html()
        ).toMatch('optional')
    })
    it('optional text is not present when readonly', () => {
        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    optional
                    readonly
                    onChange={onChange}
                />
            )
                .html()
                ?.includes('optional')
        ).toBe(false)
    })
    it('optional text is not present when required', () => {
        expect(
            render(
                <TextInputBase type='url' name='name' id='id' value='value' onChange={onChange} />
            )
                .html()
                ?.includes('optional')
        ).toBe(false)
    })
    it("if hideOptionalLabel, don't show optional text", () => {
        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    optional
                    hideOptionalLabel
                    onChange={onChange}
                />
            )
                .html()
                ?.includes('optional')
        ).toBe(false)
        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    hideOptionalLabel
                    onChange={onChange}
                />
            )
                .html()
                ?.includes('optional')
        ).toBe(false)
    })
    it('readonly text is present when readonly', () => {
        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    readonly
                    onChange={onChange}
                />
            ).html()
        ).toMatch('readonly')
    })
    it('readonly text is not present when not readonly', () => {
        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    readonly={false}
                    onChange={onChange}
                />
            )
                .html()
                ?.includes('readonly')
        ).toBe(false)
        expect(
            render(
                <TextInputBase type='url' name='name' id='id' value='value' onChange={onChange} />
            )
                .html()
                ?.includes('readonly')
        ).toBe(false)
    })
})

describe('help text appears properly', () => {
    it('help text appears when provided', () => {
        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    help='this is some help text'
                    onChange={onChange}
                />
            )
                .html()
                ?.includes('this is some help text')
        ).toBe(true)

        const helpMock = chance.string().replace(/[\W]/gu, '')

        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    help={helpMock}
                    onChange={onChange}
                />
            )
                .html()
                ?.includes(helpMock)
        ).toBe(true)
    })
    test('help text not present when not provided', () => {
        expect(
            shallow(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    help=''
                    onChange={onChange}
                />
            )
                .find('HelpText')
                .prop('text')
        ).toBe('')
        expect(
            shallow(
                <TextInputBase type='url' name='name' id='id' value='value' onChange={onChange} />
            )
                .find('HelpText')
                .prop('text')
        ).toBeUndefined()
    })
})

describe('feedback text works correctly', () => {
    it("error text is shown when there's an error", () => {
        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    error='this is some error text'
                    onChange={onChange}
                />
            )
                .html()
                ?.includes('this is some error text')
        ).toBe(true)

        const helpMock = chance.string().replace(/[\W]/gu, '')

        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    error={helpMock}
                    onChange={onChange}
                />
            )
                .html()
                ?.includes(helpMock)
        ).toBe(true)
    })
    it("success text is shown when there's an success message", () => {
        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    success='this is some success text'
                    onChange={onChange}
                />
            )
                .html()
                ?.includes('this is some success text')
        ).toBe(true)

        const helpMock = chance.string().replace(/[\W]/gu, '')

        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    success={helpMock}
                    onChange={onChange}
                />
            )
                .html()
                ?.includes(helpMock)
        ).toBe(true)
    })
    it("success text is not shown when there's an error", () => {
        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    success='this is some success text'
                    error='this is some error text'
                    onChange={onChange}
                />
            )
                .html()
                ?.includes('this is some success text')
        ).toBe(false)

        const helpMock = chance.string().replace(/[\W]/gu, '')

        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    success={helpMock}
                    error='this is some error text'
                    onChange={onChange}
                />
            )
                .html()
                ?.includes(helpMock)
        ).toBe(false)
    })
})

describe('progress works correctly', () => {
    it('progress is shown when provided', () => {
        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    progress='22 / 23'
                    onChange={onChange}
                />
            )
                .html()
                ?.includes('22 / 23')
        ).toBe(true)

        const helpMock = chance.string().replace(/[\W]/gu, '')

        expect(
            render(
                <TextInputBase
                    type='url'
                    name='name'
                    id='id'
                    value='value'
                    progress={helpMock}
                    onChange={onChange}
                />
            )
                .html()
                ?.includes(helpMock)
        ).toBe(true)
    })
})

describe('placeholder prop works correctly', () => {
    it('input has placeholder prop when true', () => {
        expect(
            mount(
                <TextInputBase
                    type='text'
                    name='name'
                    id='id'
                    value='value'
                    placeholder='world'
                    onChange={onChange}
                />
            )
                .find('input')
                .prop('placeholder')
        ).toBe('world')

        const placeholderMock = chance.string()

        expect(
            mount(
                <TextInputBase
                    type='text'
                    name='name'
                    id='id'
                    value='value'
                    placeholder={placeholderMock}
                    onChange={onChange}
                />
            )
                .find('input')
                .prop('placeholder')
        ).toBe(placeholderMock)
    })
    it('input does not have placeholder prop is not specified', () => {
        expect(
            mount(
                <TextInputBase
                    type='text'
                    name='name'
                    id='id'
                    value='value'
                    placeholder=''
                    onChange={onChange}
                />
            )
                .find('input')
                .prop('placeholder')
        ).toBeUndefined()
        expect(
            mount(
                <TextInputBase type='text' name='name' id='id' value='value' onChange={onChange} />
            )
                .find('input')
                .prop('placeholder')
        ).toBeUndefined()
    })
})

describe('disabled prop works correctly', () => {
    it('input has disabled prop when true', () => {
        expect(
            mount(
                <TextInputBase
                    type='text'
                    name='name'
                    id='id'
                    value='value'
                    disabled
                    onChange={onChange}
                />
            )
                .find('input')
                .prop('disabled')
        ).toBe(true)
    })
    it('input does not have disabled prop when false', () => {
        expect(
            mount(
                <TextInputBase
                    type='text'
                    name='name'
                    id='id'
                    value='value'
                    disabled={false}
                    onChange={onChange}
                />
            )
                .find('input')
                .prop('disabled')
        ).toBeUndefined()
        expect(
            mount(
                <TextInputBase type='text' name='name' id='id' value='value' onChange={onChange} />
            )
                .find('input')
                .prop('disabled')
        ).toBeUndefined()
    })
})

describe('readonly prop works correctly', () => {
    it('input has readonly prop when true', () => {
        expect(
            mount(
                <TextInputBase
                    type='text'
                    name='name'
                    id='id'
                    value='value'
                    readonly
                    onChange={onChange}
                />
            )
                .find('input')
                .prop('readOnly')
        ).toBe(true)
    })
    it('input does not have readonly prop when false', () => {
        expect(
            mount(
                <TextInputBase
                    type='text'
                    name='name'
                    id='id'
                    value='value'
                    readonly={false}
                    onChange={onChange}
                />
            )
                .find('input')
                .prop('readOnly')
        ).toBeUndefined()
        expect(
            mount(
                <TextInputBase type='text' name='name' id='id' value='value' onChange={onChange} />
            )
                .find('input')
                .prop('readOnly')
        ).toBeUndefined()
    })
})

describe('autocomplete prop works correctly', () => {
    it('input has autocomplete prop when defined', () => {
        expect(
            mount(
                <TextInputBase
                    type='text'
                    name='name'
                    id='id'
                    value='value'
                    autoComplete='off'
                    onChange={onChange}
                />
            )
                .find('input')
                .prop('autoComplete')
        ).toBe('off')
        expect(
            mount(
                <TextInputBase
                    type='text'
                    name='name'
                    id='id'
                    value='value'
                    autoComplete='on'
                    onChange={onChange}
                />
            )
                .find('input')
                .prop('autoComplete')
        ).toBe('on')
        expect(
            mount(
                <TextInputBase
                    type='text'
                    name='name'
                    id='id'
                    value='value'
                    autoComplete='current-password'
                    onChange={onChange}
                />
            )
                .find('input')
                .prop('autoComplete')
        ).toBe('current-password')
    })
    it('input does not have keyboard prop when undefined', () => {
        expect(
            mount(
                <TextInputBase type='text' name='name' id='id' value='value' onChange={onChange} />
            )
                .find('input')
                .prop('autoComplete')
        ).toBeUndefined()
    })
})

describe('keyboard prop works correctly', () => {
    it('input has keyboard prop when defined', () => {
        expect(
            mount(
                <TextInputBase
                    type='text'
                    name='name'
                    id='id'
                    value='value'
                    keyboard='tel'
                    onChange={onChange}
                />
            )
                .find('input')
                .prop('inputMode')
        ).toBe('tel')
        expect(
            mount(
                <TextInputBase
                    type='text'
                    name='name'
                    id='id'
                    value='value'
                    keyboard='none'
                    onChange={onChange}
                />
            )
                .find('input')
                .prop('inputMode')
        ).toBe('none')
        expect(
            mount(
                <TextInputBase
                    type='text'
                    name='name'
                    id='id'
                    value='value'
                    keyboard='email'
                    onChange={onChange}
                />
            )
                .find('input')
                .prop('inputMode')
        ).toBe('email')
    })
    it('input does not have keyboard prop when undefined', () => {
        expect(
            mount(
                <TextInputBase type='text' name='name' id='id' value='value' onChange={onChange} />
            )
                .find('input')
                .prop('inputMode')
        ).toBeUndefined()
    })
})

describe('affixes display when provided', () => {})

describe('when affixes are clicked, the correct action happens', () => {
    it('when the prefix is clicked, the onClick runs', () => {
        const onClickPrefixMock = jest.fn()
        shallow(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                prefix='$'
                prefixOnClick={onClickPrefixMock}
            />
        )
            .find('Affix')
            .at(0)
            .simulate('click')
        expect(onClickPrefixMock).toHaveBeenCalledTimes(1)
    })
    it('when the prefix is clicked, the suffix onClick is not run', () => {
        const onClickPrefixMock = jest.fn()
        const onClickSuffixMock = jest.fn()
        shallow(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                prefix='$'
                prefixOnClick={onClickPrefixMock}
                suffix='.00'
                suffixOnClick={onClickSuffixMock}
            />
        )
            .find('Affix')
            .at(0)
            .simulate('click')
        expect(onClickPrefixMock).toHaveBeenCalledTimes(1)
        expect(onClickSuffixMock).toHaveBeenCalledTimes(0)
    })
    it('when the suffix is clicked, the onClick runs', () => {
        const onClickSuffixMock = jest.fn()
        shallow(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                suffix='$'
                suffixOnClick={onClickSuffixMock}
            />
        )
            .find('Affix')
            .at(1)
            .simulate('click')
        expect(onClickSuffixMock).toHaveBeenCalledTimes(1)
    })
    it('when the suffix is clicked, the prefix onClick is not run', () => {
        const onClickPrefixMock = jest.fn()
        const onClickSuffixMock = jest.fn()
        shallow(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onChange={onChange}
                prefix='$'
                prefixOnClick={onClickPrefixMock}
                suffix='.00'
                suffixOnClick={onClickSuffixMock}
            />
        )
            .find('Affix')
            .at(1)
            .simulate('click')
        expect(onClickPrefixMock).toHaveBeenCalledTimes(0)
        expect(onClickSuffixMock).toHaveBeenCalledTimes(1)
    })
})

describe('function hooks work when called', () => {
    it('onChange is called when value changes for input', () => {
        const onChangeMock = jest.fn()
        const newInput = chance.string()
        const input = mount(
            <TextInputBase type='text' name='name' id='id' value='value' onChange={onChangeMock} />
        )
        input.find('input').simulate('change', { target: { value: newInput } })
        expect(onChangeMock).toHaveBeenCalled()
        expect(onChangeMock).toHaveBeenCalledTimes(1)
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({ target: { value: newInput } })
        )
    })
    it('onBlur is called when blurred for input', () => {
        const onBlurMock = jest.fn()
        const input = mount(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onBlur={onBlurMock}
                onChange={onChange}
            />
        )
        input.find('input').simulate('blur')
        expect(onBlurMock).toHaveBeenCalled()
        expect(onBlurMock).toHaveBeenCalledTimes(1)
    })
    it('onBlur is called when focused for input', () => {
        const onFocusMock = jest.fn()
        const input = mount(
            <TextInputBase
                type='text'
                name='name'
                id='id'
                value='value'
                onFocus={onFocusMock}
                onChange={onChange}
            />
        )
        input.find('input').simulate('focus')
        expect(onFocusMock).toHaveBeenCalled()
        expect(onFocusMock).toHaveBeenCalledTimes(1)
    })
})
