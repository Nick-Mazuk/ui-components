import { WithClick } from '../../../hoc/with-click'

type HamburgerProps = {
    toggle: () => void
}

export const Hamburger = ({ toggle }: HamburgerProps): JSX.Element => {
    return (
        <WithClick
            className='flex self-stretch px-6 ml-auto -mr-6 cursor-pointer sm:hidden'
            callback={toggle}
        >
            <svg className='w-4 m-auto fill-current' viewBox='0 0 100 100'>
                <rect y='10' width='100' height='10' rx='5' />
                <rect y='45' width='100' height='10' rx='5' />
                <rect y='80' width='100' height='10' rx='5' />
            </svg>
        </WithClick>
    )
}

export type Hamburger = ReturnType<typeof Hamburger>
