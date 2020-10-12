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
    const containerClasses = classNames(
        'absolute pt-4 px-3 left-0 top-0 w-screen h-screen overflow-scroll sm:hidden',
        {
            hidden: !active,
        }
    )
    const buttonClasses = classNames(
        'fixed top-0 left-0 w-screen h-screen cursor-default opacity-0 sm:hidden',
        {
            hidden: !active,
        }
    )
    return (
        <>
            <button className={buttonClasses} onClick={toggle} />
            <div className={containerClasses}>
                <div>
                    <Box style='white' shadow='large'>
                        <div className='flex items-center justify-between mb-4'>
                            <Text h6 as='p' color='text-gray-400'>
                                {title}
                            </Text>
                            <WithClick callback={toggle} className='p-4 -m-4 text-gray'>
                                <X width='w-5' />
                            </WithClick>
                        </div>
                        {children}
                    </Box>
                </div>
            </div>
        </>
    )
}

export type Brand = ReturnType<typeof MobileContainer>
