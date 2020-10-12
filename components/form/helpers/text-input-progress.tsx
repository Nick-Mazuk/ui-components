import classNames from 'classnames'

import { Text } from '../../../elements/text'

type Props = {
    children?: never
    invalid: boolean
    text: string | undefined
}

export const Progress = ({ text, invalid }: Props): JSX.Element => {
    // eslint-disable-next-line react/jsx-no-useless-fragment -- base case
    if (!text) return <></>

    const classes = classNames('ml-auto', { 'text-error': invalid })

    return (
        <div className={classes}>
            <Text tiny>{text}</Text>
        </div>
    )
}

export type Progress = ReturnType<typeof Progress>
