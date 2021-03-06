import classNames from 'classnames'

import type { Icon } from '../../../elements/icon'
import { WithClick } from '../../../hoc/with-click'
import type { WithClickCallback } from '../../../hoc/with-click'
import { SIZE_MAP } from './text-input-base'
import type { Sizes } from './text-input-base'

// eslint-disable-next-line import/exports-last -- used in text-input-base
export type AffixContent = string | Icon

type Props = {
    children?: never
    size: Sizes
    content: AffixContent | undefined
    type: 'prefix' | 'suffix'
    onClick?: WithClickCallback
    buttonName?: string
}

export const Affix = ({ content, size, onClick, type, buttonName }: Props): JSX.Element => {
    // eslint-disable-next-line react/jsx-no-useless-fragment --  base case if Affix doesn't exist
    if (!content) return <></>

    const classes = classNames('self-stretch items-center flex', SIZE_MAP[size][type], {
        'hover:text-primary transition-color duration-150': onClick,
    })

    let contentElement: JSX.Element | string = (
        <span className={SIZE_MAP[size].icon} data-testid={`text-input-${type}`}>
            {content}
        </span>
    )
    if (typeof content === 'string') contentElement = content

    if (onClick && buttonName) {
        return (
            <WithClick className={classes} onClick={onClick} name={buttonName}>
                {contentElement}
            </WithClick>
        )
    }
    return <div className={classes}>{contentElement}</div>
}

export type Affix = ReturnType<typeof Affix>
