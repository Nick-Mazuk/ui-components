import type { ReactNode } from 'react'

type Props = {
    children?: never
    image: ReactNode | ReactNode[]
    text: ReactNode | ReactNode[]
    reversed?: boolean
}

export const ImageAndText = ({ text, image, reversed = false }: Props): JSX.Element => {
    return (
        <div className='grid items-center mt-20 grid-flow-rows-dense md:gap-12 md:grid-cols-2'>
            <div className='row-start-2 mt-12 md:mt-0 md:row-start-auto'>{text}</div>
            <div className={reversed ? 'md:col-start-1 md:row-start-1' : ''}>{image}</div>
        </div>
    )
}

export type ImageAndText = ReturnType<typeof ImageAndText>
