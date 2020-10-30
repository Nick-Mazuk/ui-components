import { render, screen } from '@testing-library/react'

import { NameInput } from '../name-input'

const Inputs = [['name input', 'NameInput', <NameInput key='name' />]]

test.each(Inputs)('%s renders without crashing', (_, Input) => {
    const { baseElement } = render(<Input label='Name' />)
    expect(baseElement).not.toBeEmptyDOMElement()
    expect(screen.getByText('Name')).toBeTruthy()
})
