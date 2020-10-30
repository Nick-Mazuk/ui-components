import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SearchInput } from '../search-input'

const sampleQueries: string[] = ['some query', 'some other query']

test.each(sampleQueries)('search input handles user typing "%s"', (query) => {
    const mock = jest.fn()
    render(<SearchInput onChange={mock} />)

    userEvent.type(screen.getByTestId('text-input-element'), query)

    expect(mock).toHaveBeenCalledTimes(query.length)
    expect(mock).toHaveBeenLastCalledWith(query)
})
