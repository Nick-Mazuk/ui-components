import classNames from 'classnames'

import type { Sizes } from 'components/form/helpers/text-input-base'
import { SIZE_MAP } from 'components/form/helpers/text-input-base'
import type { Icon } from 'elements/icon'
import type { WithClickCallback } from 'hoc/with-click'
import { WithClick } from 'hoc/with-click'

// eslint-disable-next-line import/exports-last -- used in text-input-base
export type AffixContent = string | Icon

type Props = {
    children?: never
    size: Sizes
    onClick: WithClickCallback | undefined
    content: AffixContent | undefined
    type: 'prefix' | 'suffix'
}

export const Affix = ({ content, size, onClick, type }: Props): JSX.Element => {
    // eslint-disable-next-line react/jsx-no-useless-fragment --  base case if Affix doesn't exist
    if (!content) return <></>

    const classes = classNames('self-stretch items-center flex', SIZE_MAP[size][type], {
        'hover:text-primary transition-colo duration-150': onClick,
    })

    let contentElement = <span className={SIZE_MAP[size].icon}>{content}</span>
    // eslint-disable-next-line react/jsx-no-useless-fragment -- necessary to turn into a reactNode
    if (typeof content === 'string') contentElement = <>{content}</>

    if (onClick) {
        return (
            <WithClick className={classes} callback={onClick}>
                {contentElement}
            </WithClick>
        )
    }
    return <div className={classes}>{contentElement}</div>
}

export type Affix = ReturnType<typeof Affix>
