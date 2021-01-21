import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { useCallback, useEffect, useState, useRef } from 'react'

import classNames from 'classnames'

import { debounce } from 'debounce'
import ResizeObserver from 'resize-observer-polyfill'

import { Arrows } from './arrows'
import { Gradients } from './gradients'

type Gap = 'small' | 'default' | 'large'
type GapData = {
    class: string
    pixels: number
}
type ColumnWidth = number | { base: number; sm?: number; md?: number; lg?: number; xl?: number }

type Props = {
    children: ReactNode | ReactNode[]
    columnWidth: ColumnWidth
    gap?: Gap
    shadow?: boolean
}

const GAP_MAP: Record<Gap, GapData> = {
    small: { class: 'gap-4', pixels: 16 },
    default: { class: 'gap-8', pixels: 32 },
    large: { class: 'gap-12', pixels: 48 },
}

const DEBOUNCE_INTERVAL = 100

const checkOverflowBase = (
    div: HTMLDivElement,
    setContainerWidth: Dispatch<SetStateAction<number>>,
    setOverflowLeft: Dispatch<SetStateAction<boolean>>,
    setOverflowRight: Dispatch<SetStateAction<boolean>>
) => {
    const { scrollLeft, scrollWidth, clientWidth } = div
    setContainerWidth(clientWidth)
    setOverflowLeft(scrollLeft > 0)
    setOverflowRight(scrollLeft !== scrollWidth - clientWidth)
}

const overflowDebouncedBefore = debounce(checkOverflowBase, DEBOUNCE_INTERVAL, true)

const overflowDebouncedAfter = debounce(checkOverflowBase, DEBOUNCE_INTERVAL)

const checkOverflowDebounced = (
    div: HTMLDivElement,
    setContainerWidth: Dispatch<SetStateAction<number>>,
    setOverflowLeft: Dispatch<SetStateAction<boolean>>,
    setOverflowRight: Dispatch<SetStateAction<boolean>>
) => {
    overflowDebouncedBefore(div, setContainerWidth, setOverflowLeft, setOverflowRight)
    overflowDebouncedAfter(div, setContainerWidth, setOverflowLeft, setOverflowRight)
}

const getPreferredColWidth = (columnWidth: ColumnWidth): number => {
    if (typeof columnWidth === 'number') return columnWidth
    if (typeof window === 'undefined') return columnWidth.base
    const windowWidth = window.innerWidth
    if (windowWidth < 640) return columnWidth.base
    if (windowWidth < 768) return columnWidth.sm ?? columnWidth.base
    if (windowWidth < 1024) return columnWidth.md ?? columnWidth.sm ?? columnWidth.base
    if (windowWidth < 1280)
        return columnWidth.lg ?? columnWidth.md ?? columnWidth.sm ?? columnWidth.base
    return columnWidth.xl ?? columnWidth.lg ?? columnWidth.md ?? columnWidth.sm ?? columnWidth.base
}

const getColWidthAndCount = (
    gap: Gap,
    containerWidth: number,
    columnWidth: ColumnWidth
): { width: number; count: number } => {
    const preferredWidth = getPreferredColWidth(columnWidth)
    const TAILWIND_SPACING_FACTOR = 4
    const gapWidth = GAP_MAP[gap].pixels
    const count = Math.floor(
        (containerWidth + gapWidth) /
            (preferredWidth * TAILWIND_SPACING_FACTOR + GAP_MAP[gap].pixels)
    )
    const width = (containerWidth - gapWidth * (count - 1)) / count
    return { count, width }
}

const getColumnCount = (children: ReactNode[], count: number): number => {
    return Math.max(children.length, count)
}

// eslint-disable-next-line max-lines-per-function -- TEMP
export const ScrollableContainer = ({
    children,
    gap = 'default',
    columnWidth,
    shadow,
}: // eslint-disable-next-line sonarjs/cognitive-complexity -- FIX
Props): JSX.Element => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(200)
    const [overflowLeft, setOverflowLeft] = useState(false)
    const [overflowRight, setOverflowRight] = useState(false)
    const containerClasses = classNames('grid overflow-x-scroll scrollbar-hide', GAP_MAP[gap].class)
    const observer = useRef<ResizeObserver>()
    const { width, count } = getColWidthAndCount(gap, containerWidth, columnWidth)

    const setScroll = (direction: 'left' | 'right') => {
        if (direction === 'left')
            containerRef.current?.scrollBy({ left: -1 * containerWidth, behavior: 'smooth' })
        else containerRef.current?.scrollBy({ left: containerWidth, behavior: 'smooth' })
    }
    const checkForOverflow = useCallback(() => {
        if (containerRef.current === null) return
        checkOverflowDebounced(
            containerRef.current,
            setContainerWidth,
            setOverflowLeft,
            setOverflowRight
        )
    }, [])
    useEffect(() => {
        if (!observer.current) observer.current = new ResizeObserver(checkForOverflow)
        const container = containerRef.current
        const resizeObserver = observer.current
        if (container) {
            container.addEventListener('scroll', checkForOverflow)
            resizeObserver.observe(container)
        }

        checkForOverflow()
        return () => {
            container?.removeEventListener('scroll', checkForOverflow)
            resizeObserver.disconnect()
        }
    }, [checkForOverflow])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        const { scrollLeft, scrollWidth, clientWidth } = container
        setContainerWidth(clientWidth)
        setOverflowLeft(scrollLeft > 0)
        setOverflowRight(scrollLeft !== scrollWidth - clientWidth)
    }, [children])

    const childrenArray = Array.isArray(children) ? children : [children]

    return (
        <div className='relative'>
            <div
                className={containerClasses}
                style={{
                    gridTemplateColumns: `repeat(${getColumnCount(
                        childrenArray,
                        count
                    )}, minmax(${width}px, 1fr))`,
                    scrollSnapType: 'x mandatory',
                }}
                ref={containerRef}
            >
                {childrenArray.map((child) => (
                    <div key={child?.toString()} style={{ scrollSnapAlign: 'start' }}>
                        {child}
                    </div>
                ))}
            </div>
            <Gradients showLeft={overflowLeft} showRight={overflowRight} isVisible={shadow} />
            <Arrows showLeft={overflowLeft} showRight={overflowRight} setScroll={setScroll} />
        </div>
    )
}
