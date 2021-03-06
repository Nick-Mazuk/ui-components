import { Fragment, useState } from 'react'

import classNames from 'classnames'

import { formatNumber } from '@nick-mazuk/lib/number-styling'

import { WithClick } from '../hoc/with-click'
import { Star } from './icon'
import { Text } from './text'

type Size = 'default' | 'small'

type OnClick = (rating: number) => void

type Props = {
    rating: number
    reviews?: number
    editable?: boolean
    size?: Size
    onClick?: OnClick
}

const STAR_COUNT = 5

const createStars = (
    currentRating: number,
    setCurrentRating: OnClick,
    editable: boolean,
    size: Size
): JSX.Element[] => {
    const stars = []
    for (let index = 0; index < STAR_COUNT; index++) {
        const starClasses = classNames({
            'text-gray-300 dark:text-gray-d300': currentRating <= index,
            'text-warning-200 dark:text-warning-d700': currentRating > index,
            'cursor-pointer': editable,
            'w-6': size === 'default',
            'w-3': size === 'small',
        })
        if (editable) {
            stars.push(
                <Fragment key={`${index}${index <= currentRating}`}>
                    <WithClick
                        className={starClasses}
                        onClick={() => {
                            setCurrentRating(index + 1)
                        }}
                        name={`Rate ${index + 1} stars`}
                    >
                        <Star fill />
                    </WithClick>
                </Fragment>
            )
        } else {
            stars.push(
                <div className={starClasses} key={`${index}${index <= currentRating}`}>
                    <Star fill />
                </div>
            )
        }
    }
    return stars
}

export const StarRating = ({
    rating,
    reviews,
    editable = false,
    size = 'default',
    onClick,
}: Props): JSX.Element => {
    const [currentRating, setCurrentRating] = useState(rating)

    const handleClick: OnClick = (newRating) => {
        setCurrentRating(newRating)
        if (onClick) onClick(newRating)
    }

    const stars = createStars(currentRating, handleClick, editable, size)

    return (
        <div className='flex items-center'>
            {stars}
            {reviews && (
                <div className='ml-1'>
                    <Text tiny={size === 'small'}>({formatNumber(reviews)})</Text>
                </div>
            )}
        </div>
    )
}

export type StarRating = ReturnType<typeof StarRating>
