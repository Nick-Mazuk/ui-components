import type { ReactNode } from 'react'

import classNames from 'classnames'

import { Button } from '../elements/button'
import type { Icon } from '../elements/icon'
import type { Image } from '../elements/image'
import { Text } from '../elements/text'

type ButtonProps = {
    value: string
    href?: string
    onClick?: () => void
    icon?: Icon
}

type Props = {
    children?: never
    title: string
    text: string
    image: Image
    cta?: ButtonProps
    secondaryCta?: ButtonProps
    customCta?: ReactNode | ReactNode[]

    center?: boolean
}

/* eslint-disable react/jsx-handler-names -- just passing down the functions */
const getCtaElements = (
    cta: ButtonProps | undefined,
    secondaryCta: ButtonProps | undefined,
    customCta: ReactNode | ReactNode[] | undefined
): ReactNode | ReactNode[] => {
    if (typeof customCta !== 'undefined') return customCta

    return (
        <>
            {typeof cta !== 'undefined' && (
                <Button
                    value={cta.value}
                    href={cta.href}
                    icon={cta.icon}
                    onClick={cta.onClick}
                    color='primary'
                />
            )}
            {typeof secondaryCta !== 'undefined' && (
                <Button
                    value={secondaryCta.value}
                    href={secondaryCta.href}
                    icon={secondaryCta.icon}
                    onClick={secondaryCta.onClick}
                    color='primary'
                    style='text'
                />
            )}
        </>
    )
}
/* eslint-enable react/jsx-handler-names -- just passing down the functions */

export const EmptyState = ({
    title,
    text,
    image,
    cta,
    secondaryCta,
    customCta,
    center = false,
}: Props): JSX.Element => {
    const ctaElements = getCtaElements(cta, secondaryCta, customCta)
    const containerClasses = classNames('max-w-2xl', {
        'mx-auto': center,
    })
    return (
        <div className={containerClasses}>
            <div className='w-32 h-32 mx-auto'>{image}</div>
            <div className='mt-8'>
                <Text h5 as='p' center balanced>
                    {title}
                </Text>
            </div>
            <div className='mt-2'>
                <Text center balanced>
                    {text}
                </Text>
            </div>
            <div className='mt-8 text-center'>{ctaElements}</div>
        </div>
    )
}
