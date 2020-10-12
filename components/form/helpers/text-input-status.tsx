import { Text } from 'elements/text'

type Props = {
    children?: never
    optional: boolean | undefined
    readonly: boolean | undefined
}

const createMessage = (message: string) => {
    return (
        <span className='self-end ml-auto'>
            <Text tiny color='text-gray'>
                ({message})
            </Text>
        </span>
    )
}

export const Status = ({ optional, readonly }: Props): JSX.Element => {
    if (readonly) return createMessage('readonly')
    if (optional) return createMessage('optional')
    // eslint-disable-next-line react/jsx-no-useless-fragment -- base case
    return <></>
}

export type Status = ReturnType<typeof Status>
