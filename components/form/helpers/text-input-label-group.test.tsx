import { shallow } from 'enzyme'

import { LabelGroup } from './text-input-label-group'

test('renders without crashing', () => {
    const wrapper = shallow(<LabelGroup label='label' info='info' />)
    expect(wrapper.isEmptyRender()).toEqual(false)
})

describe('renders label', () => {
    test('label renders when provided', () => {
        expect(
            shallow(<LabelGroup label='label' info='' />)
                .find('Text')
                .prop('children')
        ).toEqual('label')
        expect(
            shallow(<LabelGroup label='Email' info='' />)
                .find('Text')
                .prop('children')
        ).toEqual('Email')
        expect(
            shallow(<LabelGroup label='Two words' info='' />)
                .find('Text')
                .prop('children')
        ).toEqual('Two words')
        expect(
            shallow(<LabelGroup label='Keeps Caps consTANT' info='' />)
                .find('Text')
                .prop('children')
        ).toEqual('Keeps Caps consTANT')
        expect(
            shallow(
                <LabelGroup label='Renders even with info' info='This is just some info text' />
            )
                .find('Text')
                .prop('children')
        ).toEqual('Renders even with info')
    })
    test("doesn't render when not provided", () => {
        expect(
            shallow(<LabelGroup label='' info='' />)
                .find('Text')
                .exists()
        ).toEqual(false)
        expect(
            shallow(<LabelGroup label='' info={"Here's some info text"} />)
                .find('Text')
                .exists()
        ).toEqual(false)
    })
})

describe('renders info icon', () => {
    test('renders icon when info is provided', () => {
        expect(
            shallow(<LabelGroup label='' info='Some info text' />)
                .find('Info')
                .exists()
        ).toEqual(true)
        expect(
            shallow(<LabelGroup label='label' info='Some info text' />)
                .find('Info')
                .exists()
        ).toEqual(true)
    })
    test("doesn't render when not provided", () => {
        expect(
            shallow(<LabelGroup label='' info='' />)
                .find('Info')
                .exists()
        ).toEqual(false)
        expect(
            shallow(<LabelGroup label='label' info='' />)
                .find('Info')
                .exists()
        ).toEqual(false)
    })
})

describe('renders tooltip', () => {
    test('tooltip exists when info is provided', () => {
        expect(
            shallow(<LabelGroup label='' info='Some info text' />)
                .find('Tooltip')
                .exists()
        ).toEqual(true)
        expect(
            shallow(<LabelGroup label='label' info='Some other info text' />)
                .find('Tooltip')
                .exists()
        ).toEqual(true)
    })
    test('tooltip has info content', () => {
        expect(
            shallow(<LabelGroup label='' info='Some info text' />)
                .find('Tooltip')
                .prop('content')
        ).toEqual('Some info text')
        expect(
            shallow(<LabelGroup label='label' info='Some other info text' />)
                .find('Tooltip')
                .prop('content')
        ).toEqual('Some other info text')
    })
    test("tooltip doesn't exist when info isn't provided", () => {
        expect(
            shallow(<LabelGroup label='' info='' />)
                .find('Tooltip')
                .exists()
        ).toEqual(false)
        expect(
            shallow(<LabelGroup label='label' info='' />)
                .find('Tooltip')
                .exists()
        ).toEqual(false)
    })
})
