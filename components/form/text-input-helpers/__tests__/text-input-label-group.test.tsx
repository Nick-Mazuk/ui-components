import { render, screen } from '@testing-library/react'

import { LabelGroup } from '../text-input-label-group'

test('renders without crashing', () => {
    const { baseElement } = render(<LabelGroup label='label' info='info' />)
    expect(baseElement).not.toBeEmptyDOMElement()
})

test("is empty when there's no text", () => {
    const { container } = render(<LabelGroup label='' info='' />)
    expect(container).toBeEmptyDOMElement()
})

describe('renders label', () => {
    const labels = ['label', 'Email', 'Two words', 'Keeps Caps consTANT']
    test.each(labels)('label "%s" renders when provided', (label) => {
        render(<LabelGroup label={label} info='' />)
        expect(screen.getByText(label)).toBeTruthy()
    })
    test.each(labels)('label "%s" renders even when info is provided', (label) => {
        render(<LabelGroup label={label} info='This is just some info text' />)
        expect(screen.getByText(label)).toBeTruthy()
    })
})

describe('renders info icon', () => {
    test('renders icon when info is provided', () => {
        const { container } = render(<LabelGroup label='' info='Some info text' />)
        expect(container.querySelector('svg')).toBeTruthy()
    })
    test('renders icon when info and label is provided', () => {
        const { container } = render(<LabelGroup label='label' info='Some info text' />)
        expect(container.querySelector('svg')).toBeTruthy()
    })
    test("doesn't render when not provided", () => {
        const { container } = render(<LabelGroup label='label' info='' />)
        expect(container.querySelector('svg')).toBeFalsy()
    })
})

describe('renders tooltip', () => {
    test('tooltip exists when info is provided', () => {
        render(<LabelGroup label='' info='Some info text' />)
        expect(screen.getByTestId('tooltip')).toBeTruthy()
        expect(screen.getByText('Some info text')).toBeTruthy()
    })
    test('tooltip exists when info and label is provided', () => {
        render(<LabelGroup label='label' info='Some info text' />)
        expect(screen.getByTestId('tooltip')).toBeTruthy()
        expect(screen.getByText('Some info text')).toBeTruthy()
    })
    test("tooltip doesn't exist when info isn't provided", () => {
        render(<LabelGroup label='label' info='' />)
        expect(screen.queryByTestId('tooltip')).toBeFalsy()
    })
})
