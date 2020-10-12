import type { ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import { ease } from '@nick-mazuk/lib/animation'
import { motion } from 'framer-motion'

import { WithClick } from '../hoc/with-click'
import { ChevronDown } from './icon'
import { Text } from './text'

type Props = {
    children: ReactNode | ReactNode[]
    title: string
    subtitle?: string
    small?: boolean
}

type Size = {
    top: string
    bottom: string
    chevron: string
}

const SIZE_MAP: Record<'small' | 'default', Size> = {
    small: {
        top: 'pt-4',
        bottom: 'pb-4',
        chevron: 'w-4',
    },
    default: {
        top: 'pt-6',
        bottom: 'pb-6',
        chevron: 'w-6',
    },
}

// eslint-disable-next-line max-lines-per-function, import/exports-last -- it's still readable
export const Accordion = ({ children, title, subtitle, small = false }: Props): JSX.Element => {
    const [open, setOpen] = useState(false)
    const [contentHeight, setContentHeight] = useState(0)
    const content = useRef<HTMLDivElement>(null)
    const size = small ? 'small' : 'default'

    const toggleOpen = useCallback(() => {
        setOpen(!open)
    }, [open])

    const chevronStates = {
        open: { rotate: 180 },
        closed: { rotate: 0 },
    }

    const contentStates = {
        open: { height: contentHeight },
        closed: { height: 0 },
    }

    const containerClasses = classNames('border-b-2 first:border-t-2 border-gray-20')
    const headerClasses = classNames(SIZE_MAP[size].top, SIZE_MAP[size].bottom)
    const chevronClasses = classNames(SIZE_MAP[size].chevron)

    useEffect(() => {
        setContentHeight(content.current?.clientHeight ?? 0)
    }, [children])
    return (
        <motion.div
            initial='closed'
            animate={open ? 'open' : 'closed'}
            className={containerClasses}
        >
            <WithClick callback={toggleOpen} className={headerClasses}>
                <div className='flex items-center justify-between'>
                    <Text h4={!small} h6={small} as='p'>
                        {title}
                    </Text>
                    <motion.div variants={chevronStates} className={chevronClasses}>
                        <ChevronDown />
                    </motion.div>
                </div>
                {subtitle && (
                    <Text color='text-gray' small={small}>
                        {subtitle}
                    </Text>
                )}
            </WithClick>

            <motion.div
                className='overflow-hidden'
                transition={{ duration: 0.15, ease: ease['ease-in-out-quad'] }}
                variants={contentStates}
            >
                <div className={SIZE_MAP[size].bottom} ref={content}>
                    {children}
                </div>
            </motion.div>
        </motion.div>
    )
}

// eslint-disable-next-line import/exports-last -- file contains two components
export type Accordion = ReturnType<typeof Accordion>

type GroupProps = {
    children: Accordion | Accordion[]
}

export const AccordionGroup = ({ children }: GroupProps): JSX.Element => {
    return <div>{children}</div>
}

export type AccordionGroup = ReturnType<typeof AccordionGroup>
