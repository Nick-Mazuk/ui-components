import { useCallback, useState } from 'react'

import classNames from 'classnames'

import { ChevronDown } from 'elements/icon'
import { Link } from 'elements/link'
import { Text } from 'elements/text'
import { WithClick } from 'hoc/with-click'

type Props = {
    title: string
    links: { text: string; path: string }[]
}

export const FooterList = ({ title, links }: Props): JSX.Element => {
    const [collapsed, setCollapsed] = useState(true)
    const toggleCollapsedState = useCallback((): void => {
        setCollapsed(!collapsed)
    }, [setCollapsed, collapsed])
    const expandIconClasses = classNames('transition-transform duration-150 md:hidden', {
        'transform rotate-180 origin-center': !collapsed,
    })
    const linkContainerClasses = classNames('flex pb-3 flex-col md:block', {
        hidden: collapsed,
    })
    const linkSpanClasses = 'pl-4 md:block md:pl-0 md:w-auto'
    const linkClasses =
        'text-gray-600 dark:text-gray-d600 py-3 block hover:text-primary dark:hover:text-primary-d text-sm md:text-base md:text-gray-600 md:dark:text-gray-d600 md:inline-block md:py-2'

    return (
        <div className='border-b border-gray-100 first:border-t dark:border-gray-d100 md:border-none md:w-full md:p-0'>
            <div className='md:hidden'>
                <WithClick callback={toggleCollapsedState}>
                    <div className='flex items-center justify-between py-6 cursor-pointer select-none text-gray dark:text-gray-d width-full'>
                        <Text uppercase tiny>
                            {title}
                        </Text>
                        <span className={expandIconClasses}>
                            <ChevronDown width='w-4' />
                        </span>
                    </div>
                </WithClick>
            </div>
            <div className='hidden pb-2 md:block'>
                <Text uppercase tiny color='text-gray dark:text-gray-d'>
                    {title}
                </Text>
            </div>
            <div className={linkContainerClasses}>
                {links.map((link) => {
                    return (
                        <span className={linkSpanClasses} key={`${link.path}${link.text}`}>
                            <Link href={link.path} className={linkClasses}>
                                <Text p as='span' small>
                                    {link.text}
                                </Text>
                            </Link>
                        </span>
                    )
                })}
            </div>
        </div>
    )
}
