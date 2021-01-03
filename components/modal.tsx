import type { ReactNode } from 'react'

import classNames from 'classnames'

import { Box } from '../elements/box'
import { Button } from '../elements/button'
import { X } from '../elements/icon'
import { Text } from '../elements/text'
import { WithClick } from '../hoc/with-click'

type OnClose = (value: string) => void

type Props = {
    children: ReactNode | ReactNode[]
    isOpen: boolean
    onClose: OnClose
    title?: string
    color?: 'primary' | 'warning' | 'error' | 'default'
    primaryButton: string
    secondaryButton?: string
}

const ModalButtons = ({
    primaryButton,
    secondaryButton,
    color,
    onClose,
}: Omit<Props, 'children' | 'title' | 'isOpen'>): JSX.Element => {
    return (
        <>
            {secondaryButton && (
                <>
                    <Button
                        value={secondaryButton}
                        style='text'
                        onClick={() => {
                            onClose(secondaryButton)
                        }}
                        color={color}
                        size='small'
                    />
                    <div className='inline-block w-2' />
                </>
            )}
            <Button
                value={primaryButton}
                color={color}
                onClick={() => {
                    onClose(primaryButton)
                }}
                size='small'
            />
        </>
    )
}

const Title = ({ title, onClose }: { title?: string; onClose: OnClose }): JSX.Element => {
    // eslint-disable-next-line react/jsx-no-useless-fragment -- base case
    if (!title) return <></>
    return (
        <div className='flex justify-between px-8 pt-6 overflow-hidden'>
            <Text h5 as='p'>
                {title}
            </Text>
            <WithClick
                callback={() => {
                    onClose('close')
                }}
                className='px-8 py-4 -mx-8 -my-6 transition-colors duration-150 text-gray hover:text-gray-900 hover:bg-gray-20'
            >
                <X width='w-5' />
            </WithClick>
        </div>
    )
}

export const Modal = ({
    children,
    isOpen,
    title,
    color = 'default',
    primaryButton,
    secondaryButton,
    onClose,
}: Props): JSX.Element => {
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
                    onClose('close')
                }}
                data-testid='modal-scrim'
            />
            <div className='relative w-full max-w-xl max-h-screen'>
                <Box style='white' padding='none' shadow='large' contain>
                    <Title title={title} onClose={onClose} />
                    <div className='px-8 py-6'>{children}</div>
                    <div className='pl-8 pr-4 pb-4 text-right'>
                        <ModalButtons
                            primaryButton={primaryButton}
                            secondaryButton={secondaryButton}
                            onClose={onClose}
                            color={color}
                        />
                    </div>
                </Box>
            </div>
        </div>
    )
}

export type Modal = ReturnType<typeof Modal>
