import type { TextChildren } from '../../elements/text'
import { Text } from '../../elements/text'
import type { Buttons } from './cta-buttons'
import { CtaButtons } from './cta-buttons'

type Props = {
    children?: never
    title: TextChildren
    body: TextChildren
    kicker?: TextChildren
    cta?: Buttons
}

export const FeatureText = ({ title, body, kicker, cta }: Props): JSX.Element => {
    return (
        <>
            {kicker && (
                <Text small uppercase color='text-gray-600 md:mb-2'>
                    {kicker}
                </Text>
            )}
            <Text h3>{title}</Text>
            <div className='mt-6'>
                <Text p color='text-gray-600'>
                    {body}
                </Text>
            </div>
            {cta && (
                <div className='mt-6'>
                    <CtaButtons buttons={cta} />
                </div>
            )}
        </>
    )
}

export type FeatureText = ReturnType<typeof FeatureText>
