type Props = {
    title: string
    content: string
}

export const Description = ({ title, content }: Props): JSX.Element => {
    return (
        <>
            <dt className='text-xs font-medium tracking-wide text-gray-700 uppercase dark:text-gray-d700'>
                {title}
            </dt>
            <dd className='font-semibold'>{content}</dd>
        </>
    )
}

export type Description = ReturnType<typeof Description>
