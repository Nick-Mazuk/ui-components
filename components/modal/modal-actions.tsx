import type { ReactNode } from 'react'

type Props = {
    children: ReactNode | ReactNode[]
}

export const ModalActions = ({ children }: Props): JSX.Element => {
    return <div className='px-8 pb-6 flex justify-end space-x-2'>{children}</div>
}

export type ModalActions = ReturnType<typeof ModalActions>
