import { Text } from '../../../elements/text'

type Props = {
    children?: never
    text: string | undefined
}

export const HelpText = ({ text }: Props): JSX.Element => {
    // eslint-disable-next-line react/jsx-no-useless-fragment -- base case
    if (!text) return <></>
    return (
        <Text tiny color='text-gray'>
            {text}
        </Text>
    )
}

export type HelpText = ReturnType<typeof HelpText>
