import { shallow } from 'enzyme'

import { TextInputBase } from './text-input-base'

it('renders without crashing', () => {
    const wrapper = shallow(<TextInputBase type='text' name='name' id='id' value='value' />)
    expect(wrapper.isEmptyRender()).toEqual(false)
})
