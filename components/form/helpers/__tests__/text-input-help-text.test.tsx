import { shallow } from 'enzyme'
import { chance } from 'jest-chance'

import { HelpText } from '../text-input-help-text'

test('renders without crashing', () => {
    const wrapper = shallow(<HelpText text='' />)
    expect(wrapper.isEmptyRender()).toEqual(false)
})

describe('help text is rendered correctly', () => {
    test('empty when no text is present', () => {
        expect(
            shallow(<HelpText text='' />)
                .children()
                .exists()
        ).toEqual(false)
    })
    test('text is rendered', () => {
        expect(
            shallow(<HelpText text='hello world' />)
                .find('Text')
                .prop('children')
        ).toEqual('hello world')

        const randomString = chance.string()

        expect(
            shallow(<HelpText text={randomString} />)
                .find('Text')
                .prop('children')
        ).toEqual(randomString)
    })
})
