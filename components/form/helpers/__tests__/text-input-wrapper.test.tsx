import { shallow } from 'enzyme'

import { TextInputWrapper } from '../text-input-wrapper'

const defaultClass = 'shadow-input-border'
const errorClass = 'shadow-input-error-border'
const disabledClass = 'cursor-not-allowed'

test('renders without crashing', () => {
    const wrapper = shallow(
        <TextInputWrapper hasError={false} disabled={false}>
            {' '}
        </TextInputWrapper>
    )
    expect(wrapper.isEmptyRender()).toEqual(false)
})

describe('styled correctly for disabled and error', () => {
    test('has default styles', () => {
        const wrapper = shallow(
            <TextInputWrapper hasError={false} disabled={false}>
                {' '}
            </TextInputWrapper>
        )
        expect(wrapper.hasClass(defaultClass)).toEqual(true)
        expect(wrapper.hasClass(errorClass)).toEqual(false)
        expect(wrapper.hasClass(disabledClass)).toEqual(false)
    })
    test('has disabled styles', () => {
        let wrapper = shallow(
            <TextInputWrapper hasError={false} disabled>
                {' '}
            </TextInputWrapper>
        )
        expect(wrapper.hasClass(defaultClass)).toEqual(false)
        expect(wrapper.hasClass(errorClass)).toEqual(false)
        expect(wrapper.hasClass(disabledClass)).toEqual(true)

        wrapper = shallow(
            <TextInputWrapper hasError disabled>
                {' '}
            </TextInputWrapper>
        )
        expect(wrapper.hasClass(defaultClass)).toEqual(false)
        expect(wrapper.hasClass(errorClass)).toEqual(false)
        expect(wrapper.hasClass(disabledClass)).toEqual(true)
    })
    test('has error styles', () => {
        const wrapper = shallow(
            <TextInputWrapper hasError disabled={false}>
                {' '}
            </TextInputWrapper>
        )
        expect(wrapper.hasClass(defaultClass)).toEqual(false)
        expect(wrapper.hasClass(errorClass)).toEqual(true)
        expect(wrapper.hasClass(disabledClass)).toEqual(false)
    })
})
