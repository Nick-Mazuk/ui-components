import classNames from 'classnames'

import type { Color } from '../../header'
import { useHeaderContext } from '../../header'

const COLOR_MAP: Record<Color, string> = {
    white: 'border-gray-30',
    dark: 'border-gray-500',
    primary: 'border-primary-300',
}

export const DropdownDivider = (): JSX.Element => {
    const { color } = useHeaderContext()
    const classes = classNames('border-t my-2', COLOR_MAP[color])
    return <div className={classes} />
}

export type DropdownDivider = ReturnType<typeof DropdownDivider>
