import type { ReactNode } from 'react'

import { Text } from '../../elements/text'

type Props = {
    children: ReactNode | ReactNode[]
    title: string
    description: string
}

const FormSectionText = ({
    title,
    description,
}: {
    title: string
    description: string
}): JSX.Element => {
    return (
        <div>
            <Text h5 as='p'>
                {title}
            </Text>
            <Text small color='text-gray'>
                {description}
            </Text>
        </div>
    )
}

export const FormSection = (props: Props): JSX.Element => {
    return (
        <div className='flex pt-6 pb-2 lg:space-x-12'>
            <div className='hidden w-full max-w-xs mt-6 sm:mt-12 lg:block'>
                <FormSectionText title={props.title} description={props.description} />
            </div>
            <div className='w-full lg:max-w-2xl lg:p-12 lg:rounded-lg lg:shadow-md flex-shrink-1/2'>
                <div className='grid grid-flow-row gap-4'>
                    <div className='lg:hidden'>
                        <FormSectionText title={props.title} description={props.description} />
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
