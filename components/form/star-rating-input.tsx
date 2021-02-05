import { useEffect, useState } from 'react'

import { slugify } from '@nick-mazuk/lib/text-styling'

import type { FormSync } from '.'
import { Error } from '../../elements/error'
import { StarRating } from '../../elements/star-rating'
import { LabelGroup } from './text-input-helpers/text-input-label-group'

type Props = {
    children?: never
    label?: string
    name?: string

    info?: string
    defaultValue?: number

    onChange?: (value: number) => void

    formSync?: FormSync
}

export const StarRatingInput = (props: Props): JSX.Element => {
    const [isInvalid, setIsInvalid] = useState(false)
    const label = props.label ?? 'Star rating'
    const name = props.name ?? slugify(label)
    const { onChange } = props

    const syncWithForm = (value: number) => {
        if (props.formSync) {
            props.formSync.updateForm(
                name,
                value,
                () => {
                    const isValid = value > 0
                    setIsInvalid(!isValid)
                    return isValid
                },
                () => true
            )
        }
    }
    const handleClick = (value: number) => {
        if (onChange) onChange(value)
        syncWithForm(value)
        return value
    }

    useEffect(() => {
        syncWithForm(props.defaultValue ?? 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run once
    }, [])
    return (
        <div className='flex flex-col space-y-1'>
            <LabelGroup label={label} info={props.info} />
            <StarRating rating={props.defaultValue ?? 0} editable onClick={handleClick} />
            {isInvalid && <Error>Select a rating</Error>}
        </div>
    )
}

export type StarRatingInput = ReturnType<typeof StarRatingInput>
