import type { ReactNode } from 'react'

import classNames from 'classnames'

// eslint-disable-next-line import/exports-last -- import necessary as this file contains multiple components
export const Li = (props: { children: ReactNode[] | ReactNode }): JSX.Element => {
    return <li>{props.children}</li>
}

// eslint-disable-next-line import/exports-last -- import necessary as this file contains multiple components
export type Li = ReturnType<typeof Li>

type ListProps = {
    children: Li[] | Li
}

const createListClasses = (listType?: string) => {
    return classNames('grid grid-flow-row gap-2 ml-8', listType)
}

export const Ol = (props: ListProps): JSX.Element => {
    const listClasses = createListClasses('list-decimal')
    return <ol className={listClasses}>{props.children}</ol>
}

export type Ol = ReturnType<typeof Ol>

export const Ul = (props: ListProps): JSX.Element => {
    const listClasses = createListClasses('list-disc')
    return <ul className={listClasses}>{props.children}</ul>
}

export type Ul = ReturnType<typeof Ul>
