import classNames from 'classnames'

import type { FormSync } from '.'
import { Button } from '../../elements/button'
import { Note } from '../../elements/note'
import { Progress } from '../../elements/progress'
import { Text } from '../../elements/text'

type Props = {
    formSync: FormSync
    progress?: number
    margin?: string
    value?: string
    successMessage?: string
    errorMessage?: string
    errorLabel?: string
}

export const Submit = ({
    formSync,
    progress,
    margin,
    value = 'Submit',
    successMessage = 'Submitted successfully',
    errorLabel = 'Error',
    errorMessage = 'Something went wrong, please try again',
}: Props): JSX.Element => {
    const containerClasses = classNames('flex items-baseline justify-end space-x-4', margin)
    return (
        <div className={containerClasses}>
            {formSync.state === 'submitted' && <Text small>{successMessage}</Text>}
            {formSync.state === 'error' && (
                <Note label={errorLabel} small type='error' variant='contrast'>
                    {errorMessage}
                </Note>
            )}
            {typeof progress !== 'undefined' && formSync.state === 'submitting' && (
                <div className='w-full'>
                    <Progress value={progress} max={1} />
                </div>
            )}
            <div className='flex-none'>
                <Button
                    value={value}
                    color='primary'
                    type='submit'
                    size='small'
                    disabled={formSync.state === 'submitting'}
                />
            </div>
        </div>
    )
}
