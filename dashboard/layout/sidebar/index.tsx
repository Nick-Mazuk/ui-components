import type { ReactNode } from 'react'

import type { SidebarItem } from './sidebar-item'

type SidebarChildren = SidebarItem

type Props = {
    children?: never
    items: SidebarChildren | SidebarChildren[]
    content: ReactNode | ReactNode[]
}

export const Sidebar = ({ items, content }: Props): JSX.Element => {
    return (
        <div className='flex max-h-full'>
            <div className='self-stretch pt-4 pb-6 pr-6 min-w-64'>
                <div className='sticky max-h-screen pb-32 -mb-24 overflow-scroll top-24'>
                    {items}
                </div>
            </div>
            <div className='w-full max-h-full mx-6 my-8'>{content}</div>
        </div>
    )
}

export type Sidebar = ReturnType<typeof Sidebar>
