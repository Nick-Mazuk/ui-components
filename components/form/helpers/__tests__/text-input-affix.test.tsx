import { render } from '@testing-library/react'
import { mount, shallow } from 'enzyme'

import { Apple, Mail, User } from '../../../../elements/icon'
import { Affix } from '../text-input-affix'

const icons = [
    ['apple', <Apple key='apple' />],
    ['mail', <Mail key='mail' />],
    ['user', <User key='user' />],
]

test('renders without crashing', () => {
    const testFunction = jest.fn()
    const { container } = render(
        <Affix content='' size='default' type='prefix' onClick={testFunction} />
    )
    expect(container).not.toBeEmptyDOMElement()
})

describe('renders text as content', () => {
    test('renders text directly when onClick is undefined', () => {
        expect(
            shallow(<Affix content='$' size='default' type='prefix' onClick={undefined} />).text()
        ).toEqual('$')
    })
    test('renders text when onClick is defined', () => {
        const testFunction = jest.fn()
        expect(
            shallow(<Affix content='$' size='default' type='prefix' onClick={testFunction} />)
                .find('WithClick')
                .prop('children')
        ).toEqual('$')
    })
})

describe('renders icon as content', () => {
    test('renders icon directly when onClick is undefined', () => {
        expect(
            shallow(<Affix content={<User />} size='default' type='prefix' onClick={undefined} />)
                .find('User')
                .exists()
        ).toEqual(true)
        expect(
            shallow(<Affix content={<Mail />} size='default' type='prefix' onClick={undefined} />)
                .find('Mail')
                .exists()
        ).toEqual(true)
        expect(
            shallow(<Affix content={<Apple />} size='default' type='prefix' onClick={undefined} />)
                .find('Apple')
                .exists()
        ).toEqual(true)
    })
    test('renders icon when onClick is defined', () => {
        const testFunction = jest.fn()
        expect(
            mount(<Affix content={<User />} size='default' type='prefix' onClick={testFunction} />)
                .find('User')
                .exists()
        ).toEqual(true)
        expect(
            mount(<Affix content={<Mail />} size='default' type='prefix' onClick={testFunction} />)
                .find('Mail')
                .exists()
        ).toEqual(true)
        expect(
            mount(<Affix content={<Apple />} size='default' type='prefix' onClick={testFunction} />)
                .find('Apple')
                .exists()
        ).toEqual(true)
    })
})

describe('onClick event works', () => {
    test('When onClick is undefined, there should be no click', () => {
        expect(
            shallow(<Affix content='$' size='default' type='prefix' onClick={undefined} />)
                .find('WithClick')
                .exists()
        ).toEqual(false)
    })

    it('When onClick is undefined, nothing should happen when clicked', () => {
        expect(
            mount(<Affix content='$' size='default' type='prefix' onClick={undefined} />).simulate(
                'click'
            )
        ).toEqual({})
    })

    it('function runs when clicked', () => {
        const testFunction = jest.fn()
        mount(<Affix content='$' size='default' type='prefix' onClick={testFunction} />).simulate(
            'click'
        )
        expect(testFunction).toHaveBeenCalled()
    })

    it('function runs only once when clicked', () => {
        const testFunction = jest.fn()
        mount(<Affix content='$' size='default' type='prefix' onClick={testFunction} />).simulate(
            'click'
        )
        expect(testFunction).toHaveBeenCalledTimes(1)
    })
})
