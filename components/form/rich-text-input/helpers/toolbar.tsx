import type { Heading } from '..'
import {
    Bold,
    Code,
    HeadingLarge,
    HeadingSmall,
    Image,
    Italic,
    ListBulleted,
    ListNumbered,
    Underline,
    Url,
} from '../../../../elements/icon'
import { ToolbarButton } from './toolbar-button'

type Elements = {
    h1?: boolean | Heading
    h2?: boolean | Heading
    bold?: boolean
    italic?: boolean
    underline?: boolean
    link?: boolean
    ol?: boolean
    ul?: boolean
    code?: boolean
    image?: boolean
}

type Props = {
    elements: Elements
}

// eslint-disable-next-line max-lines-per-function -- FIX
export const RichTextToolbar = ({ elements }: Props): JSX.Element => {
    return (
        <div id='rich-text-toolbar' className='text-center border-b-2 border-gray-50'>
            <ToolbarButton
                visible={Boolean(elements.h1)}
                description='Heading 1'
                quillClass='ql-header'
                quillValue={typeof elements.h1 === 'string' ? elements.h1 : '2'}
            >
                <HeadingLarge width='w-6' />
            </ToolbarButton>
            <ToolbarButton
                visible={Boolean(elements.h2)}
                description='Heading 2'
                quillClass='ql-header'
                quillValue={typeof elements.h2 === 'string' ? elements.h2 : '3'}
            >
                <HeadingSmall width='w-6' />
            </ToolbarButton>
            <ToolbarButton visible={elements.bold} description='Bold' quillClass='ql-bold'>
                <Bold width='w-6' />
            </ToolbarButton>
            <ToolbarButton visible={elements.italic} description='Italic' quillClass='ql-italic'>
                <Italic width='w-6' />
            </ToolbarButton>
            <ToolbarButton
                visible={elements.underline}
                description='Underline'
                quillClass='ql-underline'
            >
                <Underline width='w-6' />
            </ToolbarButton>
            <ToolbarButton visible={elements.link} description='Url' quillClass='ql-link'>
                <Url width='w-6' />
            </ToolbarButton>
            <ToolbarButton
                visible={elements.ol}
                description='Numbered list'
                quillClass='ql-list'
                quillValue='ordered'
            >
                <ListNumbered width='w-6' />
            </ToolbarButton>
            <ToolbarButton
                visible={elements.ul}
                description='Bulleted list'
                quillClass='ql-list'
                quillValue='bullet'
            >
                <ListBulleted width='w-6' />
            </ToolbarButton>
            <ToolbarButton visible={elements.code} description='Code' quillClass='ql-code-block'>
                <Code width='w-6' />
            </ToolbarButton>
            <ToolbarButton visible={elements.image} description='Image' quillClass='ql-image'>
                <Image width='w-6' />
            </ToolbarButton>
        </div>
    )
}
