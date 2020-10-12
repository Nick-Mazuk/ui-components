import type { TextChildren } from 'elements/text'
import { Text } from 'elements/text'
import type { Buttons } from 'marketing/components/cta-buttons'
import { CtaButtons } from 'marketing/components/cta-buttons'

type Colors = 'primary' | 'error' | 'success' | 'warning' | 'gray' | 'highlight'
type ColoredTitle = { text: string; color: string }[]

type Props = {
    title: string | ColoredTitle
    subtitle: string
    seoTitle?: string
    cta?: Buttons
    color?: Colors
}

export const HeroSimple = ({
    title,
    seoTitle,
    subtitle,
    cta,
    color = 'primary',
}: Props): JSX.Element => {
    let titleText: TextChildren = ''
    if (typeof title === 'string') {
        titleText = title
    } else {
        titleText = title.map((segment) => {
            return (
                <Text h1 as='span' color={segment.color} key={`${segment.text}${segment.color}`}>
                    {segment.text}{' '}
                </Text>
            )
        })
    }
    return (
        <section className='wrapper'>
            <Text h1 hidden>
                {seoTitle ?? titleText}
            </Text>
            <div className='flex flex-col max-w-4xl pt-16 pb-12 mx-auto space-y-4 text-center md:pb-12 md:pt-20 md:space-y-8 lg:space-y-12'>
                <Text h1 as='p'>
                    {titleText}
                </Text>
                <Text h5 semibold as='p'>
                    {subtitle}
                </Text>
                {cta && <CtaButtons buttons={cta} color={color === 'gray' ? 'default' : color} />}
            </div>
        </section>
    )
}

export type HeroSimple = ReturnType<typeof HeroSimple>
