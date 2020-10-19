import { shallow } from 'enzyme'

import { RealTime } from '../real-time'

test('renders without crashing', () => {
    const wrapper = shallow(<RealTime />)
    expect(wrapper.isEmptyRender()).toEqual(false)
})

test('shows default label', () => {
    expect(
        shallow(<RealTime />)
            .find('Text')
            .prop('children')
    ).toEqual('Updating live')
})

test('shows custom label', () => {
    expect(
        shallow(<RealTime label='Live stats' />)
            .find('Text')
            .prop('children')
    ).toEqual('Live stats')
    expect(
        shallow(<RealTime label='Breaking news' />)
            .find('Text')
            .prop('children')
    ).toEqual('Breaking news')
    expect(
        shallow(<RealTime label='Breaking news.' />)
            .find('Text')
            .prop('children')
    ).toEqual('Breaking news.')
})
