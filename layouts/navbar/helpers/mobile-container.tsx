import type { ReactNode } from 'react'

import classNames from 'classnames'

import { Box } from '../../../elements/box'
import { X } from '../../../elements/icon'
import { Text } from '../../../elements/text'
import { WithClick } from '../../../hoc/with-click'

export type Props = {
    children?: ReactNode | ReactNode[]
    active: boolean
    toggle: () => void
    title?: string
}

export const MobileContainer = ({
    children,
    active,
    toggle,
    title = 'Navigation',
}: Props): JSX.Element => {
    const containerClasses = classNames('fixed inset-0 sm:hidden', {
        hidden: !active,
    })
    const buttonClasses = classNames(
        'h-screen absolute w-screen cursor-default opacity-50 bg-black'
    )
    return (
        <div className={containerClasses}>
            <button className={buttonClasses} onClick={toggle} />
            <div className='relative pt-4 px-3 overflow-scroll'>
                <Box style='white' shadow='large'>
                    <div className='flex items-center justify-between mb-4'>
                        <Text h6 as='p' color='text-gray'>
                            {title}
                        </Text>
                        <WithClick
                            onClick={toggle}
                            className='p-4 -m-4 text-gray'
                            name='Close menu'
                        >
                            <X width='w-5' />
                        </WithClick>
                    </div>
                    {children}
                </Box>
            </div>
        </div>
    )
}

export type Brand = ReturnType<typeof MobileContainer>
