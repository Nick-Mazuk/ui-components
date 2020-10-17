import { shallow, mount } from 'enzyme'

import { RealTime } from './real-time'

test('renders without crashing', () => {
    const wrapper = shallow(<RealTime />)
    expect(wrapper.isEmptyRender()).toEqual(false)
})

test('shows default label', () => {
    expect(mount(<RealTime />).text()).toEqual('Updating live')
})

test('shows custom label', () => {
    expect(mount(<RealTime label='Live stats' />).text()).toEqual('Live stats')
})
