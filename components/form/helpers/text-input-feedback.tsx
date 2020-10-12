import { Error } from 'elements/error'
import { Success } from 'elements/success'

type Props = {
    children?: never
    error: string | undefined
    success: string | undefined
}

export const Feedback = ({ error, success }: Props): JSX.Element => {
    if (error) return <Error size='small'>{error}</Error>
    if (success) return <Success size='small'>{success}</Success>
    // eslint-disable-next-line react/jsx-no-useless-fragment -- needs to return an empty fragment
    return <></>
}

export type Feedback = ReturnType<typeof Feedback>
