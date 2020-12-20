import classNames from 'classnames'

import type { Icon } from '../../../../elements/icon'
import { Tooltip } from '../../../../elements/tooltip'

type Props = {
    children: string | Icon
    visible?: boolean
    description: string
    quillClass?: string
    quillValue?: string
}

export const ToolbarButton = ({
    children,
    visible = false,
    description,
    quillClass = '',
    quillValue,
}: Props): JSX.Element => {
    const classes = classNames('w-10 p-2 pt-4 text-gray-700 hover:text-gray-900', quillClass)
    // eslint-disable-next-line react/jsx-no-useless-fragment -- base case
    if (!visible) return <></>
    return (
        <Tooltip content={description} position='bottom'>
            <button className={classes} value={quillValue}>
                {children}
            </button>
        </Tooltip>
    )
}
