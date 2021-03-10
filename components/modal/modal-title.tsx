import { Text } from '../../elements/text'

type Props = {
    children: string
}

export const ModalTitle = ({ children }: Props): JSX.Element => {
    return (
        <div className='flex justify-between px-8 pt-6 overflow-hidden'>
            <Text h5 as='p'>
                {children}
            </Text>
        </div>
    )
}

export type ModalTitle = ReturnType<typeof ModalTitle>
