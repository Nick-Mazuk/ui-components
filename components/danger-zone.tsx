import { Button } from '../elements/button'
import { Text } from '../elements/text'

type Props = {
    children?: never
    title: string
    description: string
    buttonText: string
    onClick: () => void
}

export const EmptyState = ({ title, description, buttonText, onClick }: Props): JSX.Element => {
    return (
        <div className='p-8 border rounded-lg border-error'>
            <div className='flex items-center justify-between space-x-12'>
                <div>
                    <Text semibold>{title}</Text>
                    <Text small>{description}</Text>
                </div>
                <div className='flex-none'>
                    <Button
                        value={buttonText}
                        color='error'
                        size='small'
                        style='text'
                        onClick={onClick}
                        glue={['right']}
                    />
                </div>
            </div>
        </div>
    )
}
