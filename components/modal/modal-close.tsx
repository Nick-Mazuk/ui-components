import { X } from '../../elements/icon'
import { WithClick } from '../../hoc/with-click'

type Props = {
    children?: never

    onClick: () => void
}

export const ModalClose = ({ onClick }: Props): JSX.Element => {
    return (
        <WithClick
            onClick={onClick}
            className='h-12 w-12 flex items-center justify-center -mx-8 -my-6 transition-colors duration-150 text-gray hover:text-gray-900 hover:bg-gray-30 focus:text-gray-900 focus:bg-gray-30 focus:outline-none'
            name='Close modal'
        >
            <X width='w-5' />
        </WithClick>
    )
}

export type ModalClose = ReturnType<typeof ModalClose>
