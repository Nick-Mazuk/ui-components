import { Text } from 'elements/text'

export const JumpToContent = (): JSX.Element => {
    return (
        <a
            className='absolute top-0 left-0 z-50 px-6 py-4 -mt-64 text-white underline select-none bg-primary-800 focus:outline-none focus:mt-0'
            href='#content'
        >
            <Text large>Jump to content</Text>
        </a>
    )
}

export type JumpToContent = ReturnType<typeof JumpToContent>
