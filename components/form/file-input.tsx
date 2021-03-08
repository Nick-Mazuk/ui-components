import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'

import { slugify } from '@nick-mazuk/lib/text-styling'

import type { FormSync } from '.'
import { Upload } from '../../elements/icon'
import { Text } from '../../elements/text'
import { Feedback } from './text-input-helpers/text-input-feedback'
import { HelpText } from './text-input-helpers/text-input-help-text'
import { LabelGroup } from './text-input-helpers/text-input-label-group'
import { Status } from './text-input-helpers/text-input-status'
import { TextInputWrapper } from './text-input-helpers/text-input-wrapper'

type FileType = 'image' | 'audio' | 'pdf'

type FileFormatData = {
    mime: string
    accept: string
}

const FILE_TYPE_MAP: Record<FileType, FileFormatData> = {
    image: { mime: 'image/png image/jpg', accept: 'image/png, image/jpeg' },
    audio: { mime: 'audio/mpeg', accept: 'audio/mpeg' },
    pdf: { mime: 'application/pdf', accept: 'application/pdf' },
}

type Props = {
    children?: never
    label?: string
    name?: string
    id?: string

    help?: string
    info?: string
    optional?: boolean
    readonly?: boolean
    disabled?: boolean

    fileType: FileType
    maxFiles?: number
    maxUploadSize?: number
    maxFileSize?: number

    fileReader?: FileReader
    formSync?: FormSync
}

const getIdentificationData = (props: Props): [string, string, string] => {
    let { name, label, id } = props
    if (!label && !name && !id) throw new Error('Input must have a label, name, or id')
    if (!name) name = id ?? slugify(label ?? '')
    if (!id) id = name
    if (!label) label = ''
    return [name, label, id]
}

const updateFileReader = (files: FileList, fileType: FileType, fileReader?: FileReader): void => {
    if (!fileReader) return

    if (fileType === 'image') fileReader.readAsDataURL(files[0])
    if (fileType === 'pdf') fileReader.readAsArrayBuffer(files[0])
}

const getSizeInMB = (file: File) => {
    return file.size / (1024 * 1024)
}

const getFileNames = (files: FileList): string[] => {
    const fileNames: string[] = []

    for (const file of files) fileNames.push(file.name)

    return fileNames
}

const FileName = ({ children }: { children: string }): JSX.Element => {
    return (
        <Text truncate tiny>
            {children}
        </Text>
    )
}

const ClickToUpload = ({
    fileNames,
    multiple,
}: {
    fileNames: string[]
    multiple: boolean
}): JSX.Element => {
    return (
        <>
            <div className='grid items-center h-20 text-gray-700'>
                <div className='flex flex-col items-center cursor-pointer pointer-events-none select-none'>
                    <div className='w-6'>
                        <Upload />
                    </div>
                    <Text small semibold>
                        {multiple ? 'Choose files…' : 'Choose a file…'}
                    </Text>
                </div>
            </div>
            <div className='px-2 py-1 transition-colors duration-150 border-t border-gray-300 text-gray group-hover:border-gray-900'>
                {fileNames.length === 0 ? (
                    <FileName>No file selected</FileName>
                ) : (
                    fileNames.map((name) => <FileName key={name}>{name}</FileName>)
                )}
            </div>
        </>
    )
}

// eslint-disable-next-line max-lines-per-function, sonarjs/cognitive-complexity -- will fix
export const FileInput = (props: Props): JSX.Element => {
    const [fileNames, setFileNames] = useState<string[]>([])
    const [name, label, id] = getIdentificationData(props)
    const [errorMessage, setErrorMessage] = useState('')
    const [files, setFiles] = useState<FileList | null>(null)
    const [isValid, setIsValid] = useState(true)
    const maxFiles = props.maxFiles ?? 1

    const validate = (newFiles: FileList | null): boolean => {
        if (newFiles === null || newFiles.length === 0) {
            if (props.optional) {
                setErrorMessage('')
                return true
            }
            setErrorMessage(`Select a file`)
            return false
        }
        if (newFiles.length > maxFiles) {
            setErrorMessage(`Max of ${maxFiles}`)
            return false
        }

        let uploadSize = 0
        // eslint-disable-next-line unicorn/no-for-loop, @typescript-eslint/prefer-for-of -- FileList is not an array
        for (let index = 0; index < newFiles.length; index++) {
            const fileSize = getSizeInMB(newFiles[index])
            if (props.maxFileSize && fileSize > props.maxFileSize) {
                setErrorMessage(`Each file must be under ${props.maxFileSize} MB`)
                return false
            }
            uploadSize += fileSize
        }
        if (props.maxUploadSize && uploadSize > props.maxUploadSize) {
            setErrorMessage(`Files must be under ${props.maxUploadSize} MB total`)
            return false
        }
        setErrorMessage('')
        return true
    }

    const syncWithForm = (newFiles: FileList | null, newValidation?: boolean) => {
        const newIsValid = newValidation ?? validate(newFiles)
        if (props.formSync) {
            props.formSync.updateForm(
                name,
                newFiles ?? '',
                () => {
                    setIsValid(newIsValid)
                    return newIsValid
                },
                () => true
            )
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newFiles = event.target.files

        const newIsValid = validate(newFiles)

        setIsValid(newIsValid)
        syncWithForm(newFiles, newIsValid)

        if (newFiles === null || newFiles.length === 0) {
            setFileNames([])
            setFiles(null)
            return
        }

        updateFileReader(newFiles, props.fileType, props.fileReader)
        setFileNames(getFileNames(newFiles))
        setFiles(newFiles)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run once
    useEffect(() => syncWithForm(files), [])

    return (
        <div className='relative flex flex-col space-y-1'>
            <div className='flex items-baseline'>
                <div>
                    <LabelGroup label={label} info={props.info} />
                    <HelpText text={props.help} />
                </div>
                <Status optional={props.optional} readonly={props.readonly && !props.disabled} />
            </div>
            <TextInputWrapper>
                <div className='relative w-full overflow-hidden group'>
                    <ClickToUpload fileNames={fileNames} multiple={maxFiles > 1} />
                    <input
                        type='file'
                        name={name}
                        id={id}
                        onChange={handleChange}
                        className='absolute inset-0 w-full opacity-0 cursor-pointer -top-16'
                        readOnly={props.readonly}
                        disabled={props.disabled}
                        accept={FILE_TYPE_MAP[props.fileType].accept}
                        multiple={maxFiles > 1}
                    />
                </div>
            </TextInputWrapper>
            <div className='flex'>
                <Feedback error={isValid ? '' : errorMessage} success='' />
            </div>
        </div>
    )
}
