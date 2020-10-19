import { mount, render, shallow } from 'enzyme'
import { chance } from 'jest-chance'

import { TextInputBase } from '../text-input-base'

test('renders without crashing', () => {
    const wrapper = shallow(<TextInputBase type='text' name='name' id='id' value='value' />)
    expect(wrapper.isEmptyRender()).toEqual(false)
})

describe('name and id work correctly', () => {
    it('name is specified on the input element', () => {
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' />)
                .find('input')
                .prop('name')
        ).toBe('name')
        expect(
            mount(<TextInputBase type='text' name='' id='id' value='value' />)
                .find('input')
                .prop('name')
        ).toBe('')

        const nameMock = chance.string()

        expect(
            mount(<TextInputBase type='text' name={nameMock} id='id' value='value' />)
                .find('input')
                .prop('name')
        ).toBe(nameMock)
    })
    it('id is specified on the input element', () => {
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' />)
                .find('input')
                .prop('id')
        ).toBe('id')
        expect(
            mount(<TextInputBase type='text' name='name' id='' value='value' />)
                .find('input')
                .prop('id')
        ).toBe('')

        const idMock = chance.string()

        expect(
            mount(<TextInputBase type='text' name='name' id={idMock} value='value' />)
                .find('input')
                .prop('id')
        ).toBe(idMock)
    })
})

describe('type works correctly', () => {
    test('type is passed as a prop to the TextInputElement', () => {
        expect(
            shallow(<TextInputBase type='text' name='name' id='id' value='value' />)
                .find('TextInputElement')
                .prop('type')
        ).toBe('text')
        expect(
            shallow(<TextInputBase type='textarea' name='name' id='id' value='value' />)
                .find('TextInputElement')
                .prop('type')
        ).toBe('textarea')
        expect(
            shallow(<TextInputBase type='email' name='name' id='id' value='value' />)
                .find('TextInputElement')
                .prop('type')
        ).toBe('email')
        expect(
            shallow(<TextInputBase type='url' name='name' id='id' value='value' />)
                .find('TextInputElement')
                .prop('type')
        ).toBe('url')
    })
})

describe('label is present', () => {
    it('label is present when provided', () => {
        expect(
            render(
                <TextInputBase type='url' name='name' id='id' value='value' label='label text' />
            ).html()
        ).toMatch('label text')

        const labelMock = chance.string().replace(/[\W]/gu, '')

        expect(
            render(
                <TextInputBase type='url' name='name' id='id' value='value' label={labelMock} />
            ).html()
        ).toMatch(labelMock)
    })
    test('label is not present when missing', () => {
        expect(
            shallow(<TextInputBase type='url' name='name' id='id' value='value' label='' />)
                .find('LabelGroup')
                .prop('label')
        ).toBe('')
        expect(
            shallow(<TextInputBase type='url' name='name' id='id' value='value' />)
                .find('LabelGroup')
                .prop('label')
        ).toBeUndefined()
    })
})

describe('tooltip is present', () => {
    it('tooltip is present when provided', () => {
        expect(
            render(
                <TextInputBase type='url' name='name' id='id' value='value' info='info text' />
            ).html()
        ).toMatch('info text')

        const labelMock = chance.string().replace(/[\W]/gu, '')

        expect(
            render(
                <TextInputBase type='url' name='name' id='id' value='value' info={labelMock} />
            ).html()
        ).toMatch(labelMock)
    })
    test('info is not present when missing', () => {
        expect(
            shallow(<TextInputBase type='url' name='name' id='id' value='value' info='' />)
                .find('LabelGroup')
                .prop('info')
        ).toBe('')
        expect(
            shallow(<TextInputBase type='url' name='name' id='id' value='value' />)
                .find('LabelGroup')
                .prop('info')
        ).toBeUndefined()
    })
})

describe('optional/readonly work when present', () => {
    it('optional text is present when optional', () => {
        expect(
            render(<TextInputBase type='url' name='name' id='id' value='value' optional />).html()
        ).toMatch('optional')
    })
    it('optional text is not present when required', () => {
        expect(
            render(<TextInputBase type='url' name='name' id='id' value='value' />)
                .html()
                ?.includes('optional')
        ).toBe(false)
    })
})

describe('placeholder prop works correctly', () => {
    it('input has placeholder prop when true', () => {
        expect(
            mount(
                <TextInputBase type='text' name='name' id='id' value='value' placeholder='world' />
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
                />
            )
                .find('input')
                .prop('placeholder')
        ).toBe(placeholderMock)
    })
    it('input does not have placeholder prop is not specified', () => {
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' placeholder='' />)
                .find('input')
                .prop('placeholder')
        ).toBeUndefined()
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' />)
                .find('input')
                .prop('placeholder')
        ).toBeUndefined()
    })
})

describe('disabled prop works correctly', () => {
    it('input has disabled prop when true', () => {
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' disabled />)
                .find('input')
                .prop('disabled')
        ).toBe(true)
    })
    it('input does not have disabled prop when false', () => {
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' disabled={false} />)
                .find('input')
                .prop('disabled')
        ).toBeUndefined()
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' />)
                .find('input')
                .prop('disabled')
        ).toBeUndefined()
    })
})

describe('readonly prop works correctly', () => {
    it('input has readonly prop when true', () => {
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' readonly />)
                .find('input')
                .prop('readOnly')
        ).toBe(true)
    })
    it('input does not have readonly prop when false', () => {
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' readonly={false} />)
                .find('input')
                .prop('readOnly')
        ).toBeUndefined()
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' />)
                .find('input')
                .prop('readOnly')
        ).toBeUndefined()
    })
})

describe('autocomplete prop works correctly', () => {
    it('input has autocomplete prop when defined', () => {
        expect(
            mount(
                <TextInputBase type='text' name='name' id='id' value='value' autoComplete='off' />
            )
                .find('input')
                .prop('autoComplete')
        ).toBe('off')
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' autoComplete='on' />)
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
                />
            )
                .find('input')
                .prop('autoComplete')
        ).toBe('current-password')
    })
    it('input does not have keyboard prop when undefined', () => {
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' />)
                .find('input')
                .prop('autoComplete')
        ).toBeUndefined()
    })
})

describe('keyboard prop works correctly', () => {
    it('input has keyboard prop when defined', () => {
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' keyboard='tel' />)
                .find('input')
                .prop('inputMode')
        ).toBe('tel')
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' keyboard='none' />)
                .find('input')
                .prop('inputMode')
        ).toBe('none')
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' keyboard='email' />)
                .find('input')
                .prop('inputMode')
        ).toBe('email')
    })
    it('input does not have keyboard prop when undefined', () => {
        expect(
            mount(<TextInputBase type='text' name='name' id='id' value='value' />)
                .find('input')
                .prop('inputMode')
        ).toBeUndefined()
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
            <TextInputBase type='text' name='name' id='id' value='value' onBlur={onBlurMock} />
        )
        input.find('input').simulate('blur')
        expect(onBlurMock).toHaveBeenCalled()
        expect(onBlurMock).toHaveBeenCalledTimes(1)
    })
    it('onBlur is called when focused for input', () => {
        const onFocusMock = jest.fn()
        const input = mount(
            <TextInputBase type='text' name='name' id='id' value='value' onFocus={onFocusMock} />
        )
        input.find('input').simulate('focus')
        expect(onFocusMock).toHaveBeenCalled()
        expect(onFocusMock).toHaveBeenCalledTimes(1)
    })
})
