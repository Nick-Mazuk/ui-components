import { LoadingSpinner } from '../../elements/loading-spinner'

export const LoadingSection = (): JSX.Element => {
    return (
        <section className='py-32 flex items-center justify-around'>
            <LoadingSpinner />
        </section>
    )
}
