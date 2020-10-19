import { shallow } from 'enzyme'

import { Status } from '../text-input-status'

test('renders without crashing', () => {
    const wrapper = shallow(<Status readonly optional />)
    expect(wrapper.isEmptyRender()).toEqual(false)
})

describe('shows correct state', () => {
    test('readonly displayed when readonly', () => {
        expect(
            shallow(<Status readonly optional={false} />)
                .find('Text')
                .prop('children')
        ).toContain('readonly')
        expect(
            shallow(<Status readonly optional />)
                .find('Text')
                .prop('children')
        ).toContain('readonly')
    })
    test('optional displayed when optional', () => {
        expect(
            shallow(<Status readonly={false} optional />)
                .find('Text')
                .prop('children')
        ).toContain('optional')
    })
})

test('is empty when neither readonly or optional', () => {
    expect(
        shallow(<Status readonly={false} optional={false} />)
            .children()
            .exists()
    ).toEqual(false)
})
