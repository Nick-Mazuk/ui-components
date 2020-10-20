import { shallow } from 'enzyme'

import { TextInput } from '../text-input'

test('renders without crashing', () => {
    const wrapper = shallow(<TextInput type='text' name='text input' />)
    expect(wrapper.isEmptyRender()).toEqual(false)
})

// all the visual stuff

// that the unnconfigured input formats functions properly (e.g., onChange updates input, blur validates, etc.)

// test hooks for validation, formatting, etc.

// test interaction with formSync
