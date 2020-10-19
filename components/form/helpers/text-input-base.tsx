import classNames from 'classnames'

import type { WithClickCallback } from '../../../hoc/with-click'
import type { AffixContent } from './text-input-affix'
import { Affix } from './text-input-affix'
import type { InputProps } from './text-input-element'
import { TextInputElement } from './text-input-element'
import { Feedback } from './text-input-feedback'
import { HelpText } from './text-input-help-text'
import { LabelGroup } from './text-input-label-group'
import { Progress } from './text-input-progress'
import { Status } from './text-input-status'
import { TextInputWrapper } from './text-input-wrapper'

// eslint-disable-next-line import/exports-last -- used by text-input
export type Type = 'text' | 'email' | 'number' | 'password' | 'search' | 'textarea' | 'url'
// eslint-disable-next-line import/exports-last -- used by text-input
export type Keyboard = 'decimal' | 'none' | 'email' | 'numeric' | 'search' | 'tel' | 'url'
// eslint-disable-next-line import/exports-last -- used in text-input-affix
export type Sizes = 'small' | 'default' | 'large'

// eslint-disable-next-line import/exports-last -- used by text-input
export type Autocomplete =
    | 'off'
    | 'on'
    | 'name'
    | 'honorific-prefix'
    | 'given-name'
    | 'additional-name'
    | 'family-name'
    | 'honorific-suffix'
    | 'nickname'
    | 'email'
    | 'username'
    | 'new-password'
    | 'current-password'
    | 'one-time-code'
    | 'organization-title'
    | 'organization'
    | 'street-address'
    | 'address-line1'
    | 'address-line2'
    | 'address-line3'
    | 'address-level1'
    | 'address-level2'
    | 'address-level3'
    | 'address-level4'
    | 'country'
    | 'country-name'
    | 'postal-code'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-additional-name'
    | 'cc-family-name'
    | 'cc-number'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-csc'
    | 'cc-type'
    | 'transaction-currency'
    | 'transaction-amount'
    | 'language'
    | 'bday'
    | 'bday-day'
    | 'bday-month'
    | 'bday-year'
    | 'sex'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-area-code'
    | 'tel-local'
    | 'tel-extension'
    | 'impp'
    | 'url'
    | 'photo'
    | ''

type Props = {
    children?: never
    type: Type
    id: string
    value: string
    name: string

    size?: Sizes
    optional?: boolean
    hideOptionalLabel?: boolean
    readonly?: boolean
    disabled?: boolean
    invalid?: boolean
    textRight?: boolean
    tabNums?: boolean
    label?: string
    help?: string
    info?: string
    error?: string
    success?: string
    progress?: string
    placeholder?: string
    prefix?: AffixContent
    suffix?: AffixContent
    prefixOnClick?: WithClickCallback
    suffixOnClick?: WithClickCallback
    keyboard?: Keyboard
    autoComplete?: Autocomplete
    onChange: (
        event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
    ) => void
    onFocus?: (
        event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLTextAreaElement>
    ) => void
    onBlur?: (
        event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLTextAreaElement>
    ) => void
}

type Size = {
    base: string
    pl: string
    pr: string
    prefix: string
    suffix: string
    icon: string
}

// eslint-disable-next-line import/exports-last -- used in text-input-affix
export const SIZE_MAP: Record<Sizes, Size> = {
    small: {
        base: 'py-2 text-sm',
        pl: 'pl-3',
        pr: 'pr-3',
        prefix: 'pl-2 pr-1 text-sm',
        suffix: 'pl-1 pr-2 text-sm',
        icon: 'w-4 mx-1',
    },
    default: {
        base: 'py-3',
        pl: 'pl-4',
        pr: 'pr-4',
        prefix: 'pl-4 pr-2',
        suffix: 'pl-2 pr-4',
        icon: 'w-6',
    },
    large: {
        base: 'py-4 text-lg',
        pl: 'pl-6',
        pr: 'pr-6',
        prefix: 'pl-4 pr-2 text-lg',
        suffix: 'pl-2 pr-4 text-lg',
        icon: 'w-8',
    },
}

const getInputClasses = (props: Props, size: Sizes): string => {
    return classNames(
        'w-full focus:outline-none bg-transparent',
        SIZE_MAP[size].base,
        `
            ${props.prefix ? '' : SIZE_MAP[size].pl}
            ${props.suffix ? '' : SIZE_MAP[size].pr}
        `,
        {
            'text-gray-900': !props.disabled,
            'text-gray cursor-not-allowed': props.disabled,
            'text-right': props.textRight,
            'tabular-nums': props.tabNums,
        }
    )
}

const getInputProps = (props: Props, size: Sizes): InputProps => {
    const classes = getInputClasses(props, size)
    const inputProps: InputProps = {
        type: props.type,
        value: props.value,
        id: props.id,
        name: props.name,
        className: classes,
        onChange: props.onChange,
    }
    if (props.readonly) inputProps.readOnly = true
    if (props.disabled) inputProps.disabled = true
    if (props.optional !== true) inputProps.required = true
    if (props.keyboard) inputProps.inputMode = props.keyboard
    if (props.onFocus) inputProps.onFocus = props.onFocus
    if (props.onBlur) inputProps.onBlur = props.onBlur
    if (props.autoComplete) inputProps.autoComplete = props.autoComplete
    if (props.placeholder) inputProps.placeholder = props.placeholder
    return inputProps
}

export const TextInputBase = (props: Props): JSX.Element => {
    const size = props.size ?? 'default'
    const hasError = Boolean(
        (typeof props.error !== 'undefined' && props.error !== '') || props.invalid
    )
    const inputProps = getInputProps(props, size)

    return (
        // eslint-disable-next-line jsx-a11y/label-has-for -- works in final HTML since input is wrapped in a component
        <label htmlFor={props.id} className='flex flex-col space-y-1'>
            <div className='flex items-baseline'>
                <div>
                    <LabelGroup label={props.label} info={props.info} />
                    <HelpText text={props.help} />
                </div>
                <Status
                    optional={props.optional && !props.hideOptionalLabel}
                    readonly={props.readonly && !props.disabled}
                />
            </div>

            {/* eslint-disable react/jsx-handler-names -- just passing down the functions */}
            <TextInputWrapper hasError={hasError} disabled={props.disabled}>
                <Affix
                    content={props.prefix}
                    size={size}
                    onClick={props.prefixOnClick}
                    type='prefix'
                />
                <TextInputElement type={props.type} value={props.value} props={inputProps} />
                <Affix
                    content={props.suffix}
                    size={size}
                    onClick={props.suffixOnClick}
                    type='suffix'
                />
            </TextInputWrapper>
            {/* eslint-enable react/jsx-handler-names -- done down the functions */}

            <div className='flex'>
                <Feedback error={props.error} success={props.success} />
                <Progress text={props.progress} invalid={hasError} />
            </div>
        </label>
    )
}

export type TextInputBase = ReturnType<typeof TextInputBase>
