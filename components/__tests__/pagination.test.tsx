import { mount, render, shallow } from 'enzyme'

import { Pagination } from '../pagination'

/* left:
   - test that pressing each button calls the onPageChange function
   - test that each function call has the correct parameters
   - ensure that there are enough surrounding buttons
   - ensure that separators are present when necessary */

const handlePageChange = jest.fn()

test('renders without crashing', () => {
    expect(
        shallow(
            <Pagination current={3} pageCount={10} onPageChange={handlePageChange} />
        ).isEmptyRender()
    ).toEqual(false)
})

describe('current button is always highlighted', () => {
    test("if current is the first button, it's still blue", () => {
        const button = mount(
            <Pagination current={1} pageCount={10} onPageChange={handlePageChange} />
        )
            .find('Button')
            .findWhere((element) => element.prop('value') === '1')
        expect(button.prop('color')).toEqual('primary')
    })
    test("if current is in the middle, it's still blue", () => {
        const button = mount(
            <Pagination current={4} pageCount={10} onPageChange={handlePageChange} />
        )
            .find('Button')
            .findWhere((element) => element.prop('value') === '4')
        expect(button.prop('color')).toEqual('primary')
    })
    test("if current is last, it's still blue", () => {
        const button = mount(
            <Pagination current={4} pageCount={4} onPageChange={handlePageChange} />
        )
            .find('Button')
            .findWhere((element) => element.prop('value') === '4')
        expect(button.prop('color')).toEqual('primary')
    })
})

describe('next/previous buttons are shown', () => {
    test('previous button is not shown when current page is 1', () => {
        expect(
            render(<Pagination current={1} pageCount={10} onPageChange={handlePageChange} />)
                .html()
                ?.match('Previous')
        ).toBeNull()
    })
    test('previous button is shown when current page is not 1', () => {
        expect(
            render(<Pagination current={2} pageCount={10} onPageChange={handlePageChange} />)
                .html()
                ?.match('Previous')
        ).toBeTruthy()
    })
    test('next button is not shown when current page is same as pageCount', () => {
        expect(
            render(<Pagination current={10} pageCount={10} onPageChange={handlePageChange} />)
                .html()
                ?.match('Next')
        ).toBeNull()
    })
    test('next button is shown when current page is less than pageCount', () => {
        expect(
            render(<Pagination current={3} pageCount={10} onPageChange={handlePageChange} />)
                .html()
                ?.match('Next')
        ).toBeTruthy()
    })
    test('if pageCount equals one, neither button is shown', () => {
        const wrapper = render(
            <Pagination current={1} pageCount={1} onPageChange={handlePageChange} />
        ).html()
        expect(wrapper?.match('Previous')).toBeNull()
        expect(wrapper?.match('Next')).toBeNull()
    })
})
