import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

const contentItems = [...iconContent, ...textContent]

test('renders without crashing', () => {
    const testFunction = jest.fn()
    const { baseElement } = render(
        <Affix content='' size='default' type='prefix' onClick={testFunction} />
    )
    expect(baseElement).not.toBeEmptyDOMElement()
})

describe('renders text and icons as content', () => {
    test.each(contentItems)(
        'renders content %s directly when onClick is undefined',
        (_, content) => {
            render(<Affix content={content} size='default' type='prefix' onClick={undefined} />)
            if (typeof content === 'string') expect(screen.getByText(content)).toBeTruthy()
            else expect(screen.getByTestId('text-input-affix')).not.toBeEmptyDOMElement()
        }
    )
    test.each(contentItems)('renders %s when onClick is defined', (_, content) => {
        const testFunction = jest.fn()
        render(<Affix content={content} size='default' type='prefix' onClick={testFunction} />)
        if (typeof content === 'string') expect(screen.getByText(content)).toBeTruthy()
        else expect(screen.getByTestId('text-input-affix')).not.toBeEmptyDOMElement()
    })
})

describe('onClick event works', () => {
    it('When onClick is undefined, nothing should happen when clicked', () => {
        render(<Affix content='$' size='default' type='prefix' onClick={undefined} />)
        expect(screen.queryByRole('button')).toBeFalsy()
    })

    it('When onClick is defined, it should have a role of button', () => {
        const testFunction = jest.fn()
        render(<Affix content='$' size='default' type='prefix' onClick={testFunction} />)
        expect(screen.queryByRole('button')).toBeTruthy()
    })

    it('function runs when clicked', () => {
        const testFunction = jest.fn()
        render(<Affix content='$' size='default' type='prefix' onClick={testFunction} />)
        userEvent.click(screen.getByRole('button'))
        expect(testFunction).toHaveBeenCalledTimes(1)
    })

    it.each(contentItems)('if content is %s, clicking still works', (_, content) => {
        const testFunction = jest.fn()
        render(<Affix content={content} size='default' type='prefix' onClick={testFunction} />)
        userEvent.click(screen.getByRole('button'))
        expect(testFunction).toHaveBeenCalledTimes(1)
    })
})
