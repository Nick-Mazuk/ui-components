import type { ReactNode } from 'react'

import classNames from 'classnames'

import { Box } from '../../elements/box'

type OnClose = () => void
// eslint-disable-next-line import/exports-last -- used later in file
export type ModalColor = 'primary' | 'warning' | 'error' | 'default'

type Props = {
    children: ReactNode | ReactNode[]
    isOpen: boolean
    onClose: OnClose
}

export const Modal = ({ children, isOpen, onClose }: Props): JSX.Element => {
    const buttonClasses = classNames(
        'h-screen absolute w-screen cursor-default opacity-50 bg-black'
    )

    // eslint-disable-next-line react/jsx-no-useless-fragment -- base case
    if (!isOpen) return <></>

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-around p-6'>
            <button
                className={buttonClasses}
                onClick={() => {
                    onClose()
                }}
                data-testid='modal-scrim'
            />
            <div className='relative w-full max-w-xl max-h-screen'>
                <Box style='white' padding='none' shadow='large' contain>
                    {children}
                </Box>
            </div>
        </div>
    )
}

export type Modal = ReturnType<typeof Modal>
