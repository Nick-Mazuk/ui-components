import { useState } from 'react'

import classNames from 'classnames'

import { Star } from 'elements/icon'
import { WithClick } from 'hoc/with-click'

type Props = {
    rating: number
    reviews?: number
    editable?: boolean
}

const STAR_COUNT = 5

export const StarRating = ({ rating, reviews, editable = false }: Props): JSX.Element => {
    const [currentRating, setCurrentRating] = useState(rating)

    const updateStarRating = (newRating: number): void => {
        if (editable) setCurrentRating(newRating)
    }

    const stars = []
    for (let i = 0; i < STAR_COUNT; i++) {
        const starClasses = classNames({
            'text-gray-300 dark:text-gray-d300': currentRating <= i,
            'text-warning-200 dark:text-warning-d700': currentRating > i,
            'cursor-pointer': editable,
        })
        stars.push(
            <WithClick
                key={`${i}${i <= currentRating}`}
                className={starClasses}
                // eslint-disable-next-line react/jsx-no-bind -- need the callback to include the star number
                callback={() => {
                    updateStarRating(i + 1)
                }}
            >
                <Star width='w-6' fill />
            </WithClick>
        )
    }

    return (
        <div className='flex items-center'>
            {stars}
            {reviews && <span>(reviews)</span>}
        </div>
    )
}
