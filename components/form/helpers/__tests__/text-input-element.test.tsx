import { render, screen } from '@testing-library/react'
import { shallow } from 'enzyme'
import { chance } from 'jest-chance'

import type { Type } from '../text-input-base'
import { TextInputElement } from '../text-input-element'

test('renders without crashing', () => {
    const { baseElement } = render(<TextInputElement type='text' value='' props={{}} />)
    expect(baseElement).not.toBeEmptyDOMElement()
})

const inputTypes = ['text', 'email', 'number', 'password', 'search', 'url']

describe('displays correct tag: input or textarea', () => {
    test.each(inputTypes)('displays input element for "%s" type', (type) => {
        render(<TextInputElement type={type as Type} value='' props={{ readOnly: true }} />)
        expect(screen.getByTestId('text-input-element').getAttribute('type')).toEqual(type)
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
    test.each(inputTypes)('displays input element for "%s" type', (type) => {
        render(<TextInputElement type={type as Type} value='' props={{ readOnly: true }} />)
        expect(screen.getByTestId('text-input-element').getAttribute('type')).toEqual(type)
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
