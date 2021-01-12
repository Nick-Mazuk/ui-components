import classNames from 'classnames'

type Props = {
    children?: never
    showLeft: boolean
    showRight: boolean
    isVisible?: boolean
}

export const Gradients = ({ showLeft, showRight, isVisible }: Props): JSX.Element => {
    const hideLeftGradient = !showLeft || !isVisible
    const hideRightGradient = !showRight || !isVisible
    const gradientClasses =
        'absolute top-0 bottom-0 w-12 from-transparent to-white transition-opacity duration-300 pointer-events-none'
    const leftGradientClasses = classNames('left-0 bg-gradient-to-l', gradientClasses, {
        'opacity-0': hideLeftGradient,
    })
    const rightGradientClasses = classNames('right-0 bg-gradient-to-r', gradientClasses, {
        'opacity-0': hideRightGradient,
    })
    return (
        <>
            <div className={leftGradientClasses} />
            <div className={rightGradientClasses} />
        </>
    )
}
