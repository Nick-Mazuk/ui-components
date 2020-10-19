import { shallow } from 'enzyme'

import { Error } from '../error'

test('renders without crashing', () => {
    const wrapper = shallow(<Error>error</Error>)
    expect(wrapper.isEmptyRender()).toEqual(false)
})

test('displays error message', () => {
    expect(
        shallow(<Error>error</Error>)
            .find('p')
            .text()
    ).toEqual('Error: error.')
    expect(
        shallow(<Error>your password is incorrect</Error>)
            .find('p')
            .text()
    ).toEqual('Error: your password is incorrect.')
    expect(
        shallow(<Error> </Error>)
            .find('p')
            .text()
    ).toEqual('Error:  .')
})

test('displays custom label', () => {
    expect(
        shallow(<Error label=''>error</Error>)
            .find('p')
            .text()
    ).toEqual('error.')
    expect(
        shallow(<Error label='Invalid password'>error</Error>)
            .find('p')
            .text()
    ).toEqual('Invalid password: error.')
})

test('ends with proper punctuation', () => {
    expect(
        shallow(<Error label=''>error.</Error>)
            .find('p')
            .text()
    ).toEqual('error.')
    expect(
        shallow(<Error label=''>error!</Error>)
            .find('p')
            .text()
    ).toEqual('error!')
    expect(
        shallow(<Error label=''>error?</Error>)
            .find('p')
            .text()
    ).toEqual('error?')
})
