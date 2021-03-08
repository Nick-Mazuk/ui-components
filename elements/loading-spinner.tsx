export const LoadingSpinner = (): JSX.Element => {
    return (
        <div
            className='w-6 h-6 border-2 border-gray-400 rounded-full animate animate-spin'
            style={{ borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite' }}
        />
    )
}

export type LoadingSpinner = ReturnType<typeof LoadingSpinner>
