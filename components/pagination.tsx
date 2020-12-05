import { Fragment, useCallback } from 'react'

import { Button } from '../elements/button'
import { ChevronLeft, ChevronRight } from '../elements/icon'
import { Text } from '../elements/text'

type Props = {
    children?: never
    current: number
    pageCount: number
    surroundCurrent?: number
    onPageChange: (newPage: number) => void
}

type PaginationButtonProps = {
    value: number
    active: boolean
    onClick: (newPage: number) => void
}

const PaginationButton = ({ value, active, onClick }: PaginationButtonProps) => {
    const handleClick = useCallback(() => {
        onClick(value)
    }, [onClick, value])
    return (
        <Button
            value={String(value)}
            size='small'
            style={active ? 'filled' : 'outlined'}
            color={active ? 'primary' : 'default'}
            square
            onClick={handleClick}
        />
    )
}

const Separator = () => <Text color='text-gray'>…</Text>

type MiddleButtonProps = {
    current: number
    pageCount: number
    surroundCurrent: number
    onPageChange: (newPage: number) => void
}

const getMiddleButtons = (props: MiddleButtonProps): JSX.Element[] => {
    const middleButtons: JSX.Element[] = []
    const lowerPadding = props.current - 2
    const upperPadding = props.pageCount - props.current - 1
    if (lowerPadding > props.surroundCurrent) middleButtons.push(<Separator />)
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

    if (upperPadding > props.surroundCurrent) middleButtons.push(<Separator />)

    return middleButtons
}

const isValidPagination = (current: number, pageCount: number): boolean => {
    return pageCount >= 1 && pageCount % 1 === 0 && current >= 1 && current % 1 === 0
}

// eslint-disable-next-line max-lines-per-function -- still readable
export const Pagination = ({
    current,
    pageCount,
    onPageChange,
    surroundCurrent = 1,
}: Props): JSX.Element => {
    const middleButtons = getMiddleButtons({ current, pageCount, onPageChange, surroundCurrent })
    const handleGoToStart = useCallback(() => onPageChange(current - 1), [current, onPageChange])
    const handleGoToEnd = useCallback(() => onPageChange(current + 1), [current, onPageChange])

    // eslint-disable-next-line react/jsx-no-useless-fragment -- base case
    if (!isValidPagination(current, pageCount)) return <></>
    return (
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
            <PaginationButton value={1} active={current === 1} onClick={onPageChange} key='first' />
            {middleButtons.map((button, index) => {
                return <Fragment key={index}>{button}</Fragment>
            })}
            {pageCount !== 1 && (
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
    )
}

export type Pagination = ReturnType<typeof Pagination>
