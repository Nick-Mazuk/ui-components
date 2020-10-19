import { shallow } from 'enzyme'

import { Success } from '../success'

test('renders without crashing', () => {
    const wrapper = shallow(<Success>success message</Success>)
    expect(wrapper.isEmptyRender()).toEqual(false)
})

test('displays success message', () => {
    expect(
        shallow(<Success>success</Success>)
            .find('p')
            .text()
    ).toEqual('success.')
    expect(
        shallow(<Success>your email is valid</Success>)
            .find('p')
            .text()
    ).toEqual('your email is valid.')
    expect(
        shallow(<Success> </Success>)
            .find('p')
            .text()
    ).toEqual(' .')
})

test('displays custom label', () => {
    expect(
        shallow(<Success label=''>success message</Success>)
            .find('p')
            .text()
    ).toEqual('success message.')
    expect(
        shallow(<Success label='Username available'>grab it while you can</Success>)
            .find('p')
            .text()
    ).toEqual('Username available: grab it while you can.')
})

test('ends with proper punctuation', () => {
    expect(
        shallow(<Success>success message.</Success>)
            .find('p')
            .text()
    ).toEqual('success message.')
    expect(
        shallow(<Success label=''>success message!</Success>)
            .find('p')
            .text()
    ).toEqual('success message!')
    expect(
        shallow(<Success label=''>success message?</Success>)
            .find('p')
            .text()
    ).toEqual('success message?')
})
