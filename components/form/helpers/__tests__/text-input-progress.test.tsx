import { shallow } from 'enzyme'

import { Progress } from '../text-input-progress'

test('renders without crashing', () => {
    const wrapper = shallow(<Progress text='' invalid={false} />)
    expect(wrapper.isEmptyRender()).toEqual(false)
})

describe('renders the progress text', () => {
    test('progress is rendered when provided', () => {
        expect(
            shallow(<Progress text='22 / 23' invalid={false} />)
                .find('Text')
                .prop('children')
        ).toEqual('22 / 23')
        expect(
            shallow(<Progress text='One character left' invalid={false} />)
                .find('Text')
                .prop('children')
        ).toEqual('One character left')
        expect(
            shallow(<Progress text='22 / 23' invalid />)
                .find('Text')
                .prop('children')
        ).toEqual('22 / 23')
        expect(
            shallow(<Progress text='One character left' invalid />)
                .find('Text')
                .prop('children')
        ).toEqual('One character left')
    })
    test('progress is not rendered when not provided', () => {
        expect(
            shallow(<Progress text='' invalid={false} />)
                .children()
                .exists()
        ).toEqual(false)
        expect(
            shallow(<Progress text='' invalid />)
                .children()
                .exists()
        ).toEqual(false)
    })
})

describe('text is correct color', () => {
    test('text has text-error when invalid', () => {
        expect(shallow(<Progress text='24 / 89' invalid />).hasClass('text-error')).toEqual(true)
    })
    test('text is normal color when valid', () => {
        expect(shallow(<Progress text='24 / 89' invalid={false} />).hasClass('text-error')).toEqual(
            false
        )
    })
})
