import type { ModalColor } from '.'
import { Button } from '../../elements/button'

type Props = {
    children?: never
    value: string
    onClick?: () => void
    color?: ModalColor
    secondary?: boolean
}

export const ModalActionButton = ({ onClick, value, color, secondary }: Props): JSX.Element => {
    return (
        <Button
            value={value}
            onClick={onClick}
            color={color}
            size='small'
            style={secondary ? 'text' : 'filled'}
        />
    )
}

export type ModalActionButton = ReturnType<typeof ModalActionButton>
