import classNames from 'classnames'

import { Image } from 'elements/image'

type Size = 'smaller' | 'small' | 'default' | 'large' | 'larger' | 'largest'

type Props = {
    children?: never
    src: string
    name?: string
    size?: Size
}

const SIZE_MAP: Record<Size, string> = {
    smaller: 'w-4',
    small: 'w-6',
    default: 'w-8',
    large: 'w-12',
    larger: 'w-16',
    largest: 'w-24',
}

export const Avatar = (props: Props): JSX.Element => {
    const size = SIZE_MAP[props.size ?? 'default']
    const classes = classNames('overflow-hidden rounded-full', size)

    return (
        <div className={classes}>
            <Image src={props.src} alt={props.name ?? ''} ratio='1x1' />
        </div>
    )
}

export type Avatar = ReturnType<typeof Avatar>
