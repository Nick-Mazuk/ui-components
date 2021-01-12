import { render, screen } from '@testing-library/react'

import type { FillableIconProps, IconProps } from '../icon'
import * as AllIconsImport from '../icon'

type IconFunction = (props: IconProps | FillableIconProps) => JSX.Element

// name, icon, fillable
const icons: [string, IconFunction][] = []

// automatically add all exported icons to the test suite
const AllIcons: Record<string, unknown> = AllIconsImport

Object.keys(AllIcons).forEach((potentialIcon) => {
    if (!['Icon', 'FillableIconProps', 'IconProps'].includes(potentialIcon)) {
        const iconFunction = AllIcons[potentialIcon] as IconFunction
        icons.push([potentialIcon, iconFunction])
    }
})

test.each(icons)('"%s" icon renders without crashing', (_, Icon) => {
    const { baseElement } = render(<Icon />)
    expect(baseElement).not.toBeEmptyDOMElement()
})

test.each(icons)('"%s" icon has a test id according to it\'s name', (_, Icon) => {
    render(<Icon />)
    expect(screen.getByTestId(`icon-${Icon.name}`)).toBeTruthy()
})

test.each(icons)('if "%s" icon has a width, it has the correct class', (iconName, Icon) => {
    render(<Icon width='w-6' />)
    expect(screen.getByTestId(`icon-${iconName}`)).toHaveClass('w-6')
})
