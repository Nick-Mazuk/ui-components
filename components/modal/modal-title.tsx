import { Text } from '../../elements/text'

type Props = {
    children?: never
    title?: string
}

export const ModalTitle = ({ title }: Props): JSX.Element => {
    // eslint-disable-next-line react/jsx-no-useless-fragment -- base case
    if (!title) return <></>
    return (
        <div className='flex justify-between px-8 pt-6 overflow-hidden'>
            <Text h5 as='p'>
                {title}
            </Text>
        </div>
    )
}

export type ModalTitle = ReturnType<typeof ModalTitle>
