import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'

import classNames from 'classnames'

import type { FormSync } from '.'
import { CheckSquare, Square } from '../../elements/icon'
import { Text } from '../../elements/text'

type Props = {
    name: string
    label: string
    defaultValue?: 'checked' | 'unchecked'
    formSync?: FormSync
    optional?: boolean
    disabled?: boolean
}

// eslint-disable-next-line max-lines-per-function -- WILL FIX
export const CheckBoxInput = ({
    name,
    label,
    defaultValue = 'unchecked',
    optional = false,
    disabled = false,
    formSync,
}: Props): JSX.Element => {
    const [checked, setChecked] = useState(defaultValue === 'checked')
    const [isValid, setIsValid] = useState<boolean>(optional || checked || disabled)
    const [hideInvalidOutline, setHideInvalidOutline] = useState(true)
    const labelClasses = classNames('block cursor-pointer relative py-1', {
        'text-gray-300': disabled,
    })
    const checkedClasses = classNames('absolute top-0 w-full', { 'opacity-0': !checked })
    const uncheckedClasses = classNames('absolute top-0 w-full', { 'opacity-0': checked })
    const invalidClasses = classNames('absolute border rounded -inset-x-2 inset-y-0 border-error', {
        'opacity-0': isValid || hideInvalidOutline,
    })

    const validate = (newCheckState: boolean): boolean => {
        if (newCheckState || optional || disabled) return true
        return false
    }

    const resetToDefault = () => {
        setChecked(defaultValue === 'checked')
        setIsValid(optional || checked || disabled)
        setHideInvalidOutline(true)
    }

    const syncWithForm = (newCheckState: boolean, newValidState: boolean) => {
        const getValidity = () => {
            setHideInvalidOutline(false)
            return newValidState
        }
        if (formSync) formSync.updateForm(name, newCheckState, getValidity, resetToDefault)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newCheckState = event.target.checked
        setChecked(newCheckState)
        const newValidState = validate(newCheckState)
        setIsValid(newValidState)
        syncWithForm(newCheckState, newValidState)
        setHideInvalidOutline(false)
    }

    useEffect(() => {
        syncWithForm(checked, isValid)
        // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run once, otherwise infinite loops
    }, [])

    return (
        <label htmlFor={name} className={labelClasses}>
            <div className={invalidClasses} data-testid='check-box-invalid-outline' />
            <div className='flex space-x-2 flex-start'>
                <div className='flex-none w-4 h-4 mt-1'>
                    <div aria-hidden className='relative'>
                        <div className={checkedClasses}>
                            <CheckSquare />
                        </div>
                        <div className={uncheckedClasses}>
                            <Square />
                        </div>
                    </div>
                    <input
                        className='sr-only'
                        id={name}
                        name={name}
                        type='checkbox'
                        checked={checked}
                        onChange={handleChange}
                        required={!optional}
                        aria-invalid={!isValid}
                        disabled={disabled}
                    />
                </div>
                <Text small>
                    {label}
                    {optional ? (
                        <Text span color='text-gray'>
                            {' '}
                            (optional)
                        </Text>
                    ) : (
                        ''
                    )}
                </Text>
            </div>
        </label>
    )
}

export type CheckBoxInput = ReturnType<typeof CheckBoxInput>
