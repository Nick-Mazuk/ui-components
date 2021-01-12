import type { Accordion } from '.'

type GroupProps = {
    children: Accordion | Accordion[]
}

export const AccordionGroup = ({ children }: GroupProps): JSX.Element => {
    return <div>{children}</div>
}

export type AccordionGroup = ReturnType<typeof AccordionGroup>
