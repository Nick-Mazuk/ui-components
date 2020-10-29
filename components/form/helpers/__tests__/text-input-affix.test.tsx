import { render, screen } from '@testing-library/react'
import { mount } from 'enzyme'

import { Mail, User } from '../../../../elements/icon'
import { Affix } from '../text-input-affix'

const iconContent = [
    ['"mail" icon', <Mail key='mail' />],
    ['"user" icon', <User key='user' />],
]

const textContent = [
    ['"$" text', '$'],
    ['"¥" text', '¥'],
]

const contentArray = [...iconContent, ...textContent]

test('renders without crashing', () => {
    const testFunction = jest.fn()
    const { baseElement } = render(
        <Affix content='' size='default' type='prefix' onClick={testFunction} />
    )
    expect(baseElement).not.toBeEmptyDOMElement()
})

describe('renders text and icons as content', () => {
    test.each(contentArray)(
        'renders content %s directly when onClick is undefined',
        async (_, content) => {
            render(<Affix content={content} size='default' type='prefix' onClick={undefined} />)
            if (typeof content === 'string') expect(await screen.findByText(content)).toBeTruthy()
            else expect(await screen.findByTestId('text-input-affix')).not.toBeEmptyDOMElement()
        }
    )
    test.each(contentArray)('renders %s when onClick is defined', async (_, content) => {
        const testFunction = jest.fn()
        render(<Affix content={content} size='default' type='prefix' onClick={testFunction} />)
        if (typeof content === 'string') expect(await screen.findByText(content)).toBeTruthy()
        else expect(await screen.findByTestId('text-input-affix')).not.toBeEmptyDOMElement()
    })
})

describe('onClick event works', () => {
    it('When onClick is undefined, nothing should happen when clicked', () => {
        render(<Affix content='$' size='default' type='prefix' onClick={undefined} />)
        expect(screen.queryByRole('button')).toBeFalsy()
    })

    it('function runs when clicked', () => {
        const testFunction = jest.fn()
        render(<Affix content='$' size='default' type='prefix' onClick={testFunction} />)
        screen.findByRole('button')
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
