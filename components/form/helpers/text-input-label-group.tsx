import { Info } from '../../../elements/info'
import { Text } from '../../../elements/text'
import { Tooltip } from '../../../elements/tooltip'

type Props = {
    children?: never
    label: string | undefined
    info: string | undefined
}

export const LabelGroup = ({ label, info }: Props): JSX.Element => {
    // eslint-disable-next-line react/jsx-no-useless-fragment -- base case
    if (!label && !info) return <></>
    return (
        <div className='flex items-center space-x-2'>
            {label && <Text semibold>{label}</Text>}
            {info && (
                <Tooltip content={info} position='right'>
                    <Info size='default' />
                </Tooltip>
            )}
        </div>
    )
}

export type LabelGroup = ReturnType<typeof LabelGroup>
