import { shallow } from 'enzyme'

import { Feedback } from './text-input-feedback'

test('renders without crashing', () => {
    const wrapper = shallow(<Feedback error='' success='' />)
    expect(wrapper.isEmptyRender()).toEqual(false)
})

describe('show correct feedback message', () => {
    test("Show error when there's and error", () => {
        expect(
            shallow(<Feedback error='error message' success='' />)
                .find('Error')
                .prop('children')
        ).toContain('error message')
        expect(
            shallow(<Feedback error='error message' success='success message' />)
                .find('Error')
                .prop('children')
        ).toContain('error message')
    })
    test('optional displayed when optional', () => {
        expect(
            shallow(<Feedback error='' success='success message' />)
                .find('Success')
                .prop('children')
        ).toContain('success message')
    })
})

test('is empty when no feedback is present', () => {
    expect(
        shallow(<Feedback error='' success='' />)
            .children()
            .exists()
    ).toEqual(false)
})
