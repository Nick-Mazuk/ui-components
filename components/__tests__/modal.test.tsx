import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Text } from '../../elements/text'
import { Modal } from '../modal'

test('renders without crashing', () => {
    const { baseElement } = render(
        <Modal primaryButton='Ok' isOpen onClose={jest.fn()}>
            <Text>Some content</Text>
        </Modal>
    )
    expect(baseElement).not.toBeEmptyDOMElement()
})

test('Children is rendered', () => {
    render(
        <Modal primaryButton='Ok' title='Title' isOpen onClose={jest.fn()}>
            <Text>Some content</Text>
        </Modal>
    )

    expect(screen.getByText('Some content')).toBeTruthy()
})

test('Title is rendered', () => {
    render(
        <Modal primaryButton='Ok' title='Title' isOpen onClose={jest.fn()}>
            <Text>Some content</Text>
        </Modal>
    )

    expect(screen.getByText('Title')).toBeTruthy()
})

test('if modal is closed, nothing should render', () => {
    const { container } = render(
        <Modal primaryButton='Ok' isOpen={false} onClose={jest.fn()}>
            <Text>Some content</Text>
        </Modal>
    )
    expect(container).toBeEmptyDOMElement()
})

test('clicking the scrim should close the modal', () => {
    const onCloseMock = jest.fn()
    render(
        <Modal primaryButton='Ok' isOpen onClose={onCloseMock}>
            <Text>Some content</Text>
        </Modal>
    )
    userEvent.click(screen.getByTestId('modal-scrim'))
    expect(onCloseMock).toHaveBeenCalledTimes(1)
    expect(onCloseMock).toHaveBeenCalledWith('close')
})

test('the close button should close the modal', () => {
    const onCloseMock = jest.fn()
    render(
        <Modal primaryButton='Ok' title='Title' isOpen onClose={onCloseMock}>
            <Text>Some content</Text>
        </Modal>
    )

    userEvent.click(screen.getAllByRole('button')[1])
    expect(onCloseMock).toHaveBeenCalledTimes(1)
    expect(onCloseMock).toHaveBeenCalledWith('close')
})

test('pressing the primary button should close the modal', () => {
    const onCloseMock = jest.fn()
    render(
        <Modal primaryButton='Ok' title='Title' isOpen onClose={onCloseMock}>
            <Text>Some content</Text>
        </Modal>
    )

    userEvent.click(screen.getByText('Ok'))
    expect(onCloseMock).toHaveBeenCalledTimes(1)
    expect(onCloseMock).toHaveBeenCalledWith('Ok')
})

test('pressing the secondary button should close the modal', () => {
    const onCloseMock = jest.fn()
    render(
        <Modal
            primaryButton='Ok'
            secondaryButton='Cancel'
            title='Title'
            isOpen
            onClose={onCloseMock}
        >
            <Text>Some content</Text>
        </Modal>
    )

    userEvent.click(screen.getByText('Cancel'))
    expect(onCloseMock).toHaveBeenCalledTimes(1)
    expect(onCloseMock).toHaveBeenCalledWith('Cancel')
})
