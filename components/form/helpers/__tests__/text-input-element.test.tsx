import { shallow } from 'enzyme'
import { chance } from 'jest-chance'

import { TextInputElement } from '../text-input-element'

test('renders without crashing', () => {
    const wrapper = shallow(<TextInputElement type='text' value='' props={{}} />)
    expect(wrapper.isEmptyRender()).toEqual(false)
})

// eslint-disable-next-line max-lines-per-function -- still readable
describe('displays correct tag: input or textarea', () => {
    test('displays input element for text type', () => {
        expect(
            shallow(<TextInputElement type='text' value='' props={{}} />)
                .find('input')
                .exists()
        ).toEqual(true)
    })
    test('displays input element for number type', () => {
        expect(
            shallow(<TextInputElement type='number' value='' props={{}} />)
                .find('input')
                .exists()
        ).toEqual(true)
    })
    test('displays input element for email type', () => {
        expect(
            shallow(<TextInputElement type='email' value='' props={{}} />)
                .find('input')
                .exists()
        ).toEqual(true)
    })
    test('displays input element for password type', () => {
        expect(
            shallow(<TextInputElement type='password' value='' props={{}} />)
                .find('input')
                .exists()
        ).toEqual(true)
    })
    test('displays input element for search type', () => {
        expect(
            shallow(<TextInputElement type='search' value='' props={{}} />)
                .find('input')
                .exists()
        ).toEqual(true)
    })
    test('displays input element for url type', () => {
        expect(
            shallow(<TextInputElement type='url' value='' props={{}} />)
                .find('input')
                .exists()
        ).toEqual(true)
    })
    test('displays textarea element for textarea type', () => {
        expect(
            shallow(<TextInputElement type='textarea' value='' props={{}} />)
                .find('textarea')
                .exists()
        ).toEqual(true)
    })
})

describe('displays correct input type (e.g., text, email, etc.)', () => {
    test('displays input element for text type', () => {
        expect(
            shallow(<TextInputElement type='text' value='' props={{}} />)
                .find('input')
                .prop('type')
        ).toEqual('text')
    })
    test('displays input element for number type', () => {
        expect(
            shallow(<TextInputElement type='number' value='' props={{}} />)
                .find('input')
                .prop('type')
        ).toEqual('number')
    })
    test('displays input element for email type', () => {
        expect(
            shallow(<TextInputElement type='email' value='' props={{}} />)
                .find('input')
                .prop('type')
        ).toEqual('email')
    })
    test('displays input element for password type', () => {
        expect(
            shallow(<TextInputElement type='password' value='' props={{}} />)
                .find('input')
                .prop('type')
        ).toEqual('password')
    })
    test('displays input element for search type', () => {
        expect(
            shallow(<TextInputElement type='search' value='' props={{}} />)
                .find('input')
                .prop('type')
        ).toEqual('search')
    })
    test('displays input element for url type', () => {
        expect(
            shallow(<TextInputElement type='url' value='' props={{}} />)
                .find('input')
                .prop('type')
        ).toEqual('url')
    })
})

describe('value is always displayed correctly', () => {
    test('value displayed correctly for input', () => {
        expect(
            shallow(<TextInputElement type='text' value='' props={{}} />)
                .find('input')
                .prop('value')
        ).toEqual('')
        expect(
            shallow(<TextInputElement type='text' value='hello world' props={{}} />)
                .find('input')
                .prop('value')
        ).toEqual('hello world')
    })
    test('value displayed correctly for random inputs', () => {
        const string = chance.string()
        expect(
            shallow(<TextInputElement type='text' value={string} props={{}} />)
                .find('input')
                .prop('value')
        ).toEqual(string)
    })
    test('value displayed correctly for textarea', () => {
        expect(
            shallow(<TextInputElement type='textarea' value='' props={{}} />)
                .find('textarea')
                .prop('children')
        ).toEqual('')
        expect(
            shallow(<TextInputElement type='textarea' value='hello world' props={{}} />)
                .find('textarea')
                .prop('children')
        ).toEqual('hello world')
    })
    test('value displayed correctly for random inputs on textareas', () => {
        const string = chance.string()
        expect(
            shallow(<TextInputElement type='textarea' value={string} props={{}} />)
                .find('textarea')
                .prop('children')
        ).toEqual(string)
    })
})
