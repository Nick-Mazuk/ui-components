import { render, screen } from '@testing-library/react'
import { chance } from 'jest-chance'

import type { Type } from '../text-input-base'
import { TextInputElement } from '../text-input-element'

test('renders without crashing', () => {
    const { baseElement } = render(
        <TextInputElement type='text' value='' props={{ readOnly: true }} onKeyPress={jest.fn()} />
    )
    expect(baseElement).not.toBeEmptyDOMElement()
})

const inputTypes = ['text', 'email', 'number', 'password', 'search', 'url']

describe('displays correct tag and type', () => {
    test.each(inputTypes)('displays input element for "%s" type', (type) => {
        render(
            <TextInputElement
                type={type as Type}
                value=''
                props={{ readOnly: true }}
                onKeyPress={jest.fn()}
            />
        )
        expect(screen.getByTestId('text-input-element').getAttribute('type')).toEqual(type)
    })
    test('displays textarea element for textarea type', () => {
        const { container } = render(
            <TextInputElement
                type='textarea'
                value=''
                props={{ readOnly: true }}
                onKeyPress={jest.fn()}
            />
        )
        expect(container.querySelector('textarea')).toBeTruthy()
    })
})

describe('value is always displayed correctly', () => {
    const values = ['', 'hello world', chance.string()]
    test.each(values)('input has value "%s"', (value) => {
        render(
            <TextInputElement
                type='text'
                value={value}
                props={{ readOnly: true }}
                onKeyPress={jest.fn()}
            />
        )
        expect(screen.getByTestId('text-input-element')).toHaveValue(value)
    })
    test.each(values)('textarea has value "%s"', (value) => {
        render(
            <TextInputElement
                type='textarea'
                value={value}
                props={{ readOnly: true }}
                onKeyPress={jest.fn()}
            />
        )
        expect(screen.getByTestId('text-input-element')).toHaveValue(value)
    })
})
