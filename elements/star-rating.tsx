import { useState } from 'react'

import classNames from 'classnames'

import { WithClick } from '../hoc/with-click'
import { Star } from './icon'

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
    for (let index = 0; index < STAR_COUNT; index++) {
        const starClasses = classNames({
            'text-gray-300 dark:text-gray-d300': currentRating <= index,
            'text-warning-200 dark:text-warning-d700': currentRating > index,
            'cursor-pointer': editable,
        })
        stars.push(
            <WithClick
                key={`${index}${index <= currentRating}`}
                className={starClasses}
                // eslint-disable-next-line react/jsx-no-bind -- need the callback to include the star number
                callback={() => {
                    updateStarRating(index + 1)
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
