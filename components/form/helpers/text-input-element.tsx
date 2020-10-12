import type { InputHTMLAttributes } from 'react'

import type { Type } from './text-input-base'

// eslint-disable-next-line import/exports-last -- used in text-input-base
export type InputProps = React.DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> &
    React.DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

type Props = {
    children?: never
    type: Type
    value: string
    props: InputProps
}

export const TextInputElement = ({ type, props, value }: Props): JSX.Element => {
    if (type === 'textarea') {
        return (
            <textarea rows={4} {...props}>
                {value}
            </textarea>
        )
    }
    return <input type={type} value={value} {...props} />
}

export type TextInputElement = ReturnType<typeof TextInputElement>
