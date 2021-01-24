import { Fragment, useCallback } from 'react'

import { Button } from '../../elements/button'
import { ChevronLeft, ChevronRight } from '../../elements/icon'
import { PaginationButton } from './pagination-button'
import { PaginationSeparator } from './pagination-separator'

type Align = 'left' | 'right' | 'center'

type Props = {
    children?: never
    current: number
    pageCount: number
    surroundCurrent?: number
    onPageChange: (newPage: number) => void
    align?: Align
    startOnly?: boolean
}

type MiddleButtonProps = {
    current: number
    pageCount: number
    surroundCurrent: number
    onPageChange: (newPage: number) => void
    startOnly: boolean
}

const getMiddleButtons = (props: MiddleButtonProps): JSX.Element[] => {
    const middleButtons: JSX.Element[] = []
    const lowerPadding = props.current - 2
    const upperPadding = props.pageCount - props.current - 1
    if (lowerPadding > props.surroundCurrent) middleButtons.push(<PaginationSeparator />)
    const middleStartIndex = Math.max(props.current - props.surroundCurrent, 2)
    for (let index = middleStartIndex; index < props.current; index++) {
        middleButtons.push(
            <PaginationButton
                value={index}
                active={false}
                onClick={props.onPageChange}
                key={index}
            />
        )
    }

    if (props.current !== 1 && props.current !== props.pageCount) {
        middleButtons.push(
            <PaginationButton
                value={props.current}
                active
                onClick={props.onPageChange}
                key={props.current}
            />
        )
    }

    const middleEndIndex = Math.min(props.current + props.surroundCurrent + 1, props.pageCount)
    for (let index = props.current + 1; index < middleEndIndex; index++) {
        middleButtons.push(
            <PaginationButton
                value={index}
                active={false}
                onClick={props.onPageChange}
                key={index}
            />
        )
    }

    if (upperPadding > props.surroundCurrent && !props.startOnly)
        middleButtons.push(<PaginationSeparator />)

    return middleButtons
}

const isValidPagination = (current: number, pageCount: number): boolean => {
    return pageCount >= 1 && pageCount % 1 === 0 && current >= 1 && current % 1 === 0
}

const ALIGN_MAP: Record<Align, string> = {
    left: 'flex',
    center: 'flex justify-around',
    right: 'flex flex-row-reverse',
}

// eslint-disable-next-line max-lines-per-function -- still readable
export const Pagination = ({
    current,
    pageCount,
    onPageChange,
    surroundCurrent = 1,
    align = 'center',
    startOnly = false,
}: Props): JSX.Element => {
    const middleButtons = getMiddleButtons({
        current,
        pageCount,
        onPageChange,
        surroundCurrent,
        startOnly,
    })
    const handleGoToStart = useCallback(() => onPageChange(current - 1), [current, onPageChange])
    const handleGoToEnd = useCallback(() => onPageChange(current + 1), [current, onPageChange])

    // eslint-disable-next-line react/jsx-no-useless-fragment -- base case
    if (!isValidPagination(current, pageCount)) return <></>
    return (
        <div className={ALIGN_MAP[align]}>
            <div className='grid grid-flow-col gap-4'>
                {current !== 1 && (
                    <Button
                        value='Previous'
                        size='small'
                        style='text'
                        color='primary'
                        icon={<ChevronLeft />}
                        onClick={handleGoToStart}
                        key='previous'
                    />
                )}
                <PaginationButton
                    value={1}
                    active={current === 1}
                    onClick={onPageChange}
                    key='first'
                />
                {middleButtons.map((button, index) => {
                    return <Fragment key={index}>{button}</Fragment>
                })}
                {pageCount !== 1 && (!startOnly || pageCount - current - 1 < surroundCurrent) && (
                    <PaginationButton
                        value={pageCount}
                        active={current === pageCount}
                        onClick={onPageChange}
                        key='last'
                    />
                )}
                {current < pageCount && (
                    <Button
                        value='Next'
                        size='small'
                        style='text'
                        color='primary'
                        icon={<ChevronRight />}
                        iconPosition='after'
                        onClick={handleGoToEnd}
                        key='next'
                    />
                )}
            </div>
        </div>
    )
}

export type Pagination = ReturnType<typeof Pagination>
