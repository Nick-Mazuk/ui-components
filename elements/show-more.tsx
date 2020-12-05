import { motion } from 'framer-motion'

import { WithClick } from '../hoc/with-click'
import { ChevronDown } from './icon'
import { Text } from './text'

type Props = {
    children?: never
    expanded: boolean
    onClick: (
        event:
            | React.MouseEvent<HTMLDivElement | HTMLSpanElement | HTMLButtonElement>
            | React.KeyboardEvent<HTMLDivElement | HTMLSpanElement | HTMLButtonElement>
    ) => void
}

export const ShowMore = ({ expanded, onClick }: Props): JSX.Element => {
    const chevronStates = {
        expanded: { rotate: 180 },
        condensed: { rotate: 0 },
    }

    return (
        <div className='relative text-center'>
            <div className='absolute w-full transform -translate-y-1/2 border-b-2 border-gray-30 top-1/2' />
            <WithClick
                callback={onClick}
                className='relative inline-block px-4 py-2 transition-all duration-150 bg-white rounded-full shadow-md text-gray hover:text-gray-900 hover:shadow-lg'
            >
                <div className='flex space-x-2'>
                    <Text tiny uppercase>
                        {expanded ? 'Show less' : 'Show more'}
                    </Text>
                    <motion.div
                        variants={chevronStates}
                        animate={expanded ? 'expanded' : 'condensed'}
                    >
                        <ChevronDown width='w-4' />
                    </motion.div>
                </div>
            </WithClick>
        </div>
    )
}

export type ShowMore = ReturnType<typeof ShowMore>
