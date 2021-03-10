import type { ReactNode } from 'react'

type Props = {
    children: ReactNode | ReactNode[]
}

export const ModalActions = ({ children }: Props): JSX.Element => {
    return <div className='pl-8 pr-4 pb-4 flex justify-end space-x-2'>{children}</div>
}

export type ModalActions = ReturnType<typeof ModalActions>
