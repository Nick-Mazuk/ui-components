import type { ReactNode } from 'react'

type Props = {
    children: ReactNode | ReactNode[]
}

export const ModalBody = ({ children }: Props): JSX.Element => {
    return <div className='px-8 py-6'>{children}</div>
}

export type ModalBody = ReturnType<typeof ModalBody>
