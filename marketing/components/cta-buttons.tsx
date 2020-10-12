import type { Colors } from 'elements/button'
import { Button } from 'elements/button'
import type { Icon } from 'elements/icon'
import { ArrowRight } from 'elements/icon'

type ButtonProps = {
    value: string
    href: string
    icon?: Icon
}

// eslint-disable-next-line import/exports-last -- used in hero-simple
export type Buttons = [ButtonProps, ButtonProps]

type Props = {
    buttons: Buttons
    color?: Colors
}

export const CtaButtons = ({ buttons, color = 'primary' }: Props): JSX.Element => {
    return (
        <div>
            <Button
                value={buttons[0].value}
                color={color}
                href={buttons[0].href}
                icon={buttons[0].icon}
            />
            <span className='ml-2'>
                <Button
                    value={buttons[1].value}
                    style='text'
                    icon={<ArrowRight />}
                    iconPosition='after'
                    color={color}
                    href={buttons[1].href}
                />
            </span>
        </div>
    )
}

export type CtaButtons = ReturnType<typeof CtaButtons>
