import { useCallback } from 'react'

import { Button } from '../../elements/button'

type Props = {
    value: number
    active: boolean
    onClick: (newPage: number) => void
}

export const PaginationButton = ({ value, active, onClick }: Props): JSX.Element => {
    const handleClick = useCallback(() => {
        onClick(value)
    }, [onClick, value])
    return (
        <Button
            value={String(value)}
            size='small'
            style={active ? 'filled' : 'outlined'}
            color={active ? 'primary' : 'default'}
            square
            onClick={handleClick}
        />
    )
}
