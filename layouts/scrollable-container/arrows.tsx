import classNames from 'classnames'

import { ChevronLeft, ChevronRight } from '../../elements/icon'
import { WithClick } from '../../hoc/with-click'

type Props = {
    children?: never
    showLeft: boolean
    showRight: boolean
    setScroll: (direction: 'left' | 'right') => void
}

export const Arrows = ({ showLeft, showRight, setScroll }: Props): JSX.Element => {
    const arrowClasses =
        'absolute flex items-center justify-around w-12 h-12 duration-150 transform -translate-y-1/2 bg-white border border-gray-100 rounded-full shadow-md cursor-pointer top-1/2 hover:text-white hover:bg-primary hover:border-primary transition-color'
    const leftArrowClasses = classNames(arrowClasses, '-left-6', { hidden: !showLeft })
    const rightArrowClasses = classNames(arrowClasses, '-right-6', { hidden: !showRight })
    return (
        <>
            <WithClick callback={() => setScroll('left')} className={leftArrowClasses}>
                <ChevronLeft width='w-8' />
            </WithClick>
            <WithClick callback={() => setScroll('right')} className={rightArrowClasses}>
                <ChevronRight width='w-8' />
            </WithClick>
        </>
    )
}
