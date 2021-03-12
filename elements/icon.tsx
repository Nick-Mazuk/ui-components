/*

for sake of maintainability, icons are grouped into three groups:
1. Main icon functionality
2. Social media icons (e.g., Facebook, Google, YouTube)
   Found at https://simpleicons.org/
3. UI Icons
   Found at https://vercel.com/design/icons
   If the desired icon doesn't exist, go to https://feathericons.com/

Within each of these groups, icons are organized alphabetically
When adding a new icon, make sure to export it as a function component
Make sure the points given are for svg *paths*, not polygons, rect, circle, etc.
Icons are tree-shakable, meaning that extra icons don't hurt performance

NOTE: Some icons can be filled, others stroked, and others both or none
      Make sure you have the correct prop type and parameters

Helper functions and type definitions are located at the bottom of this file

*/

type iconFunctionProps = {
    name: string
    stroke?: boolean
    fill?: boolean
    width?: string
    viewBox?: string
    thinStroke?: string
}

// eslint-disable-next-line import/exports-last -- used in test suite
export type IconProps = {
    width?: string
}

// eslint-disable-next-line import/exports-last -- used in test suite
export type FillableIconProps = {
    fill?: boolean
} & IconProps

const icon = (path: string, props: iconFunctionProps) => {
    if (props.width && !props.width.match(/^w-(\d{1,2}|px)$/u)) {
        throw new Error(
            'Icon width must be a static Tailwind CSS width class (e.g., w-4 not w-full).'
        )
    }

    const pathProps: Record<string, unknown> = { className: '' }
    if (props.fill === true) pathProps.className += ' fill-current'
    else pathProps.fill = 'none'

    if (props.stroke === true) {
        pathProps.strokeLinecap = 'round'
        pathProps.strokeLinejoin = 'round'
        pathProps.strokeWidth = '2'
        pathProps.className += ' stroke-current'
    }
    const thinStrokeProps = { ...pathProps }
    thinStrokeProps.strokeWidth = '0.75'
    return (
        <svg
            viewBox={props.viewBox ?? '0 0 24 24'}
            xmlns='http://www.w3.org/2000/svg'
            className={props.width ?? ''}
            shapeRendering='geometricPrecision'
            data-testid={`icon-${props.name}`}
        >
            <path d={path} {...pathProps} data-testid='icon-path' />
            {props.thinStroke && <path d={props.thinStroke} {...thinStrokeProps} />}
        </svg>
    )
}

/* 
   
   
   
   social Icons
   
   
   
    */

export const Apple = (props: IconProps): JSX.Element => {
    return icon(
        'M7.078 23.55c-.473-.316-.893-.703-1.244-1.15-.383-.463-.738-.95-1.064-1.454-.766-1.12-1.365-2.345-1.78-3.636-.5-1.502-.743-2.94-.743-4.347 0-1.57.34-2.94 1.002-4.09.49-.9 1.22-1.653 2.1-2.182.85-.53 1.84-.82 2.84-.84.35 0 .73.05 1.13.15.29.08.64.21 1.07.37.55.21.85.34.95.37.32.12.59.17.8.17.16 0 .39-.05.645-.13.145-.05.42-.14.81-.31.386-.14.692-.26.935-.35.37-.11.728-.21 1.05-.26.39-.06.777-.08 1.148-.05.71.05 1.36.2 1.94.42 1.02.41 1.843 1.05 2.457 1.96-.26.16-.5.346-.725.55-.487.43-.9.94-1.23 1.505-.43.77-.65 1.64-.644 2.52.015 1.083.29 2.035.84 2.86.387.6.904 1.114 1.534 1.536.31.21.582.355.84.45-.12.375-.252.74-.405 1.1-.347.807-.76 1.58-1.25 2.31-.432.63-.772 1.1-1.03 1.41-.402.48-.79.84-1.18 1.097-.43.285-.935.436-1.452.436-.35.015-.7-.03-1.034-.127-.29-.095-.576-.202-.856-.323-.293-.134-.596-.248-.905-.34-.38-.1-.77-.148-1.164-.147-.4 0-.79.05-1.16.145-.31.088-.61.196-.907.325-.42.175-.695.29-.855.34-.324.096-.656.154-.99.175-.52 0-1.004-.15-1.486-.45zm6.854-18.46c-.68.34-1.326.484-1.973.436-.1-.646 0-1.31.27-2.037.24-.62.56-1.18 1-1.68.46-.52 1.01-.95 1.63-1.26.66-.34 1.29-.52 1.89-.55.08.68 0 1.35-.25 2.07-.228.64-.568 1.23-1 1.76-.435.52-.975.95-1.586 1.26z',
        { width: props.width, fill: true, name: 'Apple' }
    )
}

export const Facebook = (props: IconProps): JSX.Element => {
    return icon(
        'M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z',
        { width: props.width, fill: true, name: 'Facebook' }
    )
}

export const GitHub = (props: IconProps): JSX.Element => {
    return icon(
        'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
        { width: props.width, fill: true, name: 'GitHub' }
    )
}

export const Google = (props: IconProps): JSX.Element => {
    return icon(
        'M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z',
        { width: props.width, fill: true, name: 'Google' }
    )
}

export const GoogleMaps = (props: IconProps): JSX.Element => {
    return icon(
        'M19.527 4.799c1.212 2.608.937 5.678-.405 8.173-1.101 2.047-2.744 3.74-4.098 5.614-.619.858-1.244 1.75-1.669 2.727-.141.325-.263.658-.383.992-.121.333-.224.673-.34 1.008-.109.314-.236.684-.627.687h-.007c-.466-.001-.579-.53-.695-.887-.284-.874-.581-1.713-1.019-2.525-.51-.944-1.145-1.817-1.79-2.671L19.527 4.799zM8.545 7.705l-3.959 4.707c.724 1.54 1.821 2.863 2.871 4.18.247.31.494.622.737.936l4.984-5.925-.029.01c-1.741.601-3.691-.291-4.392-1.987a3.377 3.377 0 0 1-.209-.716c-.063-.437-.077-.761-.004-1.198l.001-.007zM5.492 3.149l-.003.004c-1.947 2.466-2.281 5.88-1.117 8.77l4.785-5.689-.058-.05-3.607-3.035zM14.661.436l-3.838 4.563a.295.295 0 0 1 .027-.01c1.6-.551 3.403.15 4.22 1.626.176.319.323.683.377 1.045.068.446.085.773.012 1.22l-.003.016 3.836-4.561A8.382 8.382 0 0 0 14.67.439l-.009-.003zM9.466 5.868L14.162.285l-.047-.012A8.31 8.31 0 0 0 11.986 0a8.439 8.439 0 0 0-6.169 2.766l-.016.018 3.665 3.084z',
        { width: props.width, fill: true, name: 'GoogleMaps' }
    )
}

export const LinkedIn = (props: IconProps): JSX.Element => {
    return icon(
        'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
        { width: props.width, fill: true, name: 'LinkedIn' }
    )
}

export const Medium = (props: IconProps): JSX.Element => {
    return icon(
        'M0 0v24h24V0H0zm19.938 5.686L18.651 6.92a.376.376 0 0 0-.143.362v9.067a.376.376 0 0 0 .143.361l1.257 1.234v.271h-6.322v-.27l1.302-1.265c.128-.128.128-.165.128-.36V8.99l-3.62 9.195h-.49L6.69 8.99v6.163a.85.85 0 0 0 .233.707l1.694 2.054v.271H3.815v-.27L5.51 15.86a.82.82 0 0 0 .218-.707V8.027a.624.624 0 0 0-.203-.527L4.019 5.686v-.27h4.674l3.613 7.923 3.176-7.924h4.456v.271z',
        { width: props.width, fill: true, name: 'Medium' }
    )
}

export const Patreon = (props: IconProps): JSX.Element => {
    return icon(
        'M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003',
        { width: props.width, fill: true, name: 'Patreon' }
    )
}

export const PayPal = (props: IconProps): JSX.Element => {
    return icon(
        'M6.908 24H3.804c-.664 0-1.086-.529-.936-1.18l.149-.674h2.071c.666 0 1.336-.533 1.482-1.182l1.064-4.592c.15-.648.816-1.18 1.48-1.18h.883c3.789 0 6.734-.779 8.84-2.34s3.16-3.6 3.16-6.135c0-1.125-.195-2.055-.588-2.789 0-.016-.016-.031-.016-.046l.135.075c.75.465 1.32 1.064 1.711 1.814.404.75.598 1.68.598 2.791 0 2.535-1.049 4.574-3.164 6.135-2.1 1.545-5.055 2.324-8.834 2.324h-.9c-.66 0-1.334.525-1.484 1.186L8.39 22.812c-.149.645-.81 1.17-1.47 1.17L6.908 24zm-2.677-2.695H1.126c-.663 0-1.084-.529-.936-1.18L4.563 1.182C4.714.529 5.378 0 6.044 0h6.465c1.395 0 2.609.098 3.648.289 1.035.189 1.92.519 2.684.99.736.465 1.322 1.072 1.697 1.818.389.748.584 1.68.584 2.797 0 2.535-1.051 4.574-3.164 6.119-2.1 1.561-5.056 2.326-8.836 2.326h-.883c-.66 0-1.328.524-1.478 1.169L5.7 20.097c-.149.646-.817 1.172-1.485 1.172l.016.036zm7.446-17.369h-1.014c-.666 0-1.332.529-1.48 1.178l-.93 4.02c-.15.648.27 1.179.93 1.179h.766c1.664 0 2.97-.343 3.9-1.021.929-.686 1.395-1.654 1.395-2.912 0-.83-.301-1.445-.9-1.84-.6-.404-1.5-.605-2.686-.605l.019.001z',
        { width: props.width, fill: true, name: 'PayPal' }
    )
}

export const RSS = (props: IconProps): JSX.Element => {
    return icon(
        'M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415c1.814 0 3.293 1.479 3.293 3.295 0 1.813-1.485 3.29-3.301 3.29C1.47 24 0 22.526 0 20.71s1.475-3.294 3.291-3.295zM15.909 24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909 7.184 15.909 15.91z',
        { width: props.width, fill: true, name: 'RSS' }
    )
}

export const SoundCloud = (props: IconProps): JSX.Element => {
    return icon(
        'M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c0-.057-.045-.1-.09-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c0 .055.045.094.09.094s.089-.045.104-.104l.21-1.319-.21-1.334c0-.061-.044-.09-.09-.09m1.83-1.229c-.061 0-.12.045-.12.104l-.21 2.563.225 2.458c0 .06.045.12.119.12.061 0 .105-.061.121-.12l.254-2.474-.254-2.548c-.016-.06-.061-.12-.121-.12m.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.138.149.138.075 0 .135-.061.15-.15l.24-2.532-.24-2.623c0-.075-.06-.135-.135-.135l-.031-.017zm1.155.36c-.005-.09-.075-.149-.159-.149-.09 0-.158.06-.164.149l-.217 2.43.2 2.563c0 .09.075.157.159.157.074 0 .148-.068.148-.158l.227-2.563-.227-2.444.033.015zm.809-1.709c-.101 0-.18.09-.18.181l-.21 3.957.187 2.563c0 .09.08.164.18.164.094 0 .174-.09.18-.18l.209-2.563-.209-3.972c-.008-.104-.088-.18-.18-.18m.959-.914c-.105 0-.195.09-.203.194l-.18 4.872.165 2.548c0 .12.09.209.195.209.104 0 .194-.089.21-.209l.193-2.548-.192-4.856c-.016-.12-.105-.21-.21-.21m.989-.449c-.121 0-.211.089-.225.209l-.165 5.275.165 2.52c.014.119.104.225.225.225.119 0 .225-.105.225-.225l.195-2.52-.196-5.275c0-.12-.105-.225-.225-.225m1.245.045c0-.135-.105-.24-.24-.24-.119 0-.24.105-.24.24l-.149 5.441.149 2.503c.016.135.121.24.256.24s.24-.105.24-.24l.164-2.503-.164-5.456-.016.015zm.749-.134c-.135 0-.255.119-.255.254l-.15 5.322.15 2.473c0 .15.12.255.255.255s.255-.12.255-.27l.15-2.474-.165-5.307c0-.148-.12-.27-.271-.27m1.005.166c-.164 0-.284.135-.284.285l-.103 5.143.135 2.474c0 .149.119.277.284.277.149 0 .271-.12.284-.285l.121-2.443-.135-5.112c-.012-.164-.135-.285-.285-.285m1.184-.945c-.045-.029-.105-.044-.165-.044s-.119.015-.165.044c-.09.054-.149.15-.149.255v.061l-.104 6.048.115 2.449v.008c.008.06.03.135.074.18.058.061.142.104.234.104.08 0 .158-.044.209-.09.058-.06.091-.135.091-.225l.015-.24.117-2.203-.135-6.086c0-.104-.061-.193-.135-.239l-.002-.022zm1.006-.547c-.045-.045-.09-.061-.15-.061-.074 0-.149.016-.209.061-.075.061-.119.15-.119.24v.029l-.137 6.609.076 1.215.061 1.185c0 .164.148.314.328.314.181 0 .33-.15.33-.329l.15-2.414-.15-6.637c0-.12-.074-.221-.165-.277m8.934 3.777c-.405 0-.795.086-1.139.232-.24-2.654-2.46-4.736-5.188-4.736-.659 0-1.305.135-1.889.359-.225.09-.27.18-.285.359v9.368c.016.18.15.33.33.345h8.185C22.681 17.218 24 15.914 24 14.28s-1.319-2.952-2.938-2.952',
        { width: props.width, fill: true, name: 'SoundCloud' }
    )
}

export const Spotify = (props: IconProps): JSX.Element => {
    return icon(
        'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z',
        { width: props.width, fill: true, name: 'Spotify' }
    )
}

export const Twitter = (props: IconProps): JSX.Element => {
    return icon(
        'M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z',
        { width: props.width, fill: true, name: 'Twitter' }
    )
}

export const Windows = (props: IconProps): JSX.Element => {
    return icon(
        'M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801',
        { width: props.width, fill: true, name: 'Windows' }
    )
}

export const YouTube = (props: IconProps): JSX.Element => {
    return icon(
        'M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z',
        { width: props.width, fill: true, name: 'YouTube' }
    )
}

/* 
   
   
   
   general UI Icons
   
   
   
    */

export const Alert = (props: IconProps): JSX.Element => {
    return icon('M12 8v4 M12 16h.01', {
        stroke: true,
        width: props.width,
        name: 'Alert',
    })
}

export const AlertCircle = (props: IconProps): JSX.Element => {
    return icon('M12 8v4 M12 16h.01 M2,12a10,10 0 1,0 20,0a10,10 0 1,0 -20,0', {
        stroke: true,
        width: props.width,
        name: 'AlertCircle',
    })
}

export const AlertTriangle = (props: IconProps): JSX.Element => {
    return icon(
        'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01',
        {
            stroke: true,
            width: props.width,
            name: 'AlertTriangle',
        }
    )
}

export const AlignCenter = (props: IconProps): JSX.Element => {
    return icon('M18 10H6 M21 6H3 M21 14H3 M18 18H6', {
        stroke: true,
        width: props.width,
        name: 'AlignCenter',
    })
}

export const AlignJustify = (props: IconProps): JSX.Element => {
    return icon('M21 10H3 M21 6H3 M21 14H3 M21 18H3', {
        stroke: true,
        width: props.width,
        name: 'AlignJustify',
    })
}
export const AlignLeft = (props: IconProps): JSX.Element => {
    return icon('M17 10H3 M21 6H3 M21 14H3 M17 18H3', {
        stroke: true,
        width: props.width,
        name: 'AlignLeft',
    })
}

export const AlignRight = (props: IconProps): JSX.Element => {
    return icon('M21 10H7 M21 6H3 M21 14H3 M21 18H7', {
        stroke: true,
        width: props.width,
        name: 'AlignRight',
    })
}

export const ArrowDown = (props: IconProps): JSX.Element => {
    return icon('M19 12l-7 7-7-7 M12 5v14', {
        stroke: true,
        width: props.width,
        name: 'ArrowDown',
    })
}

export const ArrowLeft = (props: IconProps): JSX.Element => {
    return icon('M19 12H5 M12 19l-7-7 7-7', {
        stroke: true,
        width: props.width,
        name: 'ArrowLeft',
    })
}

export const ArrowRight = (props: IconProps): JSX.Element => {
    return icon('M5 12h14 M12 5l7 7-7 7', {
        stroke: true,
        width: props.width,
        name: 'ArrowRight',
    })
}

export const ArrowUp = (props: IconProps): JSX.Element => {
    return icon('M12 19V5 M5 12l7-7 7 7', {
        stroke: true,
        width: props.width,
        name: 'ArrowUp',
    })
}

export const Award = (props: IconProps): JSX.Element => {
    return icon('M8.21 13.89L7 23l5-3 5 3-1.21-9.12 M5,8a7,7 0 1,0 14,0a7,7 0 1,0 -14,0', {
        stroke: true,
        width: props.width,
        name: 'Award',
    })
}

export const BarChart = (props: IconProps): JSX.Element => {
    return icon('M12 20V10 M18 20V4 M6 20v-4', {
        stroke: true,
        width: props.width,
        name: 'BarChart',
    })
}

export const Bell = (props: FillableIconProps): JSX.Element => {
    return icon('M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0', {
        stroke: true,
        width: props.width,
        fill: props.fill,
        name: 'Bell',
    })
}

export const BellOff = (props: IconProps): JSX.Element => {
    return icon(
        'M13.73 21a2 2 0 01-3.46 0 M18.63 13A17.89 17.89 0 0118 8 M6.26 6.26A5.86 5.86 0 006 8c0 7-3 9-3 9h14 M18 8a6 6 0 00-9.33-5 M1 1l22 22',
        {
            stroke: true,
            width: props.width,
            name: 'BellOff',
        }
    )
}

export const Bold = (props: IconProps): JSX.Element => {
    return icon('M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z', {
        stroke: true,
        width: props.width,
        name: 'Bold',
    })
}

export const Book = (props: IconProps): JSX.Element => {
    return icon(
        'M4 19.5A2.5 2.5 0 016.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z',
        {
            stroke: true,
            width: props.width,
            name: 'Book',
        }
    )
}

export const BookOpen = (props: IconProps): JSX.Element => {
    return icon('M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z', {
        stroke: true,
        width: props.width,
        name: 'BookOpen',
    })
}

export const Calendar = (props: IconProps): JSX.Element => {
    return icon(
        'M18.75,4.75C18.75,3.646 17.854,2.75 16.75,2.75L2.75,2.75C1.646,2.75 0.75,3.646 0.75,4.75L0.75,18.75C0.75,19.854 1.646,20.75 2.75,20.75L16.75,20.75C17.854,20.75 18.75,19.854 18.75,18.75L18.75,4.75Z M13.75,0.75L13.75,4.75 M5.75,0.75L5.75,4.75 M0.75,8.75L18.75,8.75',
        {
            stroke: true,
            width: props.width,
            name: 'Calendar',
        }
    )
}

export const Check = (props: IconProps): JSX.Element => {
    return icon('M20 6L9 17l-5-5', {
        stroke: true,
        width: props.width,
        name: 'Check',
    })
}

export const CheckCircle = (props: IconProps): JSX.Element => {
    return icon('M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3', {
        stroke: true,
        width: props.width,
        name: 'CheckCircle',
    })
}

export const CheckSquare = (props: IconProps): JSX.Element => {
    return icon('M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11', {
        stroke: true,
        width: props.width,
        name: 'CheckSquare',
    })
}

export const ChevronDown = (props: IconProps): JSX.Element => {
    return icon('M6 9l6 6 6-6', {
        stroke: true,
        width: props.width,
        name: 'ChevronDown',
    })
}

export const ChevronLeft = (props: IconProps): JSX.Element => {
    return icon('M15 18l-6-6 6-6', {
        stroke: true,
        width: props.width,
        name: 'ChevronLeft',
    })
}

export const ChevronRight = (props: IconProps): JSX.Element => {
    return icon('M9 18l6-6-6-6', {
        stroke: true,
        width: props.width,
        name: 'ChevronRight',
    })
}

export const ChevronUp = (props: IconProps): JSX.Element => {
    return icon('M18 15l-6-6-6 6', {
        stroke: true,
        width: props.width,
        name: 'ChevronUp',
    })
}

export const Clock = (props: IconProps): JSX.Element => {
    return icon('M12 6v6l4 2 M2,12a10,10 0 1,0 20,0a10,10 0 1,0 -20,0', {
        stroke: true,
        width: props.width,
        name: 'Clock',
    })
}

export const Code = (props: IconProps): JSX.Element => {
    return icon('M16 18l6-6-6-6 M8 6l-6 6 6 6', {
        stroke: true,
        width: props.width,
        name: 'Code',
    })
}

export const Command = (props: IconProps): JSX.Element => {
    return icon(
        'M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z',
        {
            stroke: true,
            width: props.width,
            name: 'Command',
        }
    )
}

export const Dollar = (props: IconProps): JSX.Element => {
    return icon('M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6', {
        stroke: true,
        width: props.width,
        name: 'Dollar',
    })
}

export const DotsHorizontal = (props: IconProps): JSX.Element => {
    return icon(
        'M11,12a1,1 0 1,0 2,0a1,1 0 1,0 -2,0 M18,12a1,1 0 1,0 2,0a1,1 0 1,0 -2,0 M4,12a1,1 0 1,0 2,0a1,1 0 1,0 -2,0',
        {
            stroke: true,
            width: props.width,
            name: 'DotsHorizontal',
        }
    )
}

export const DotsVertical = (props: IconProps): JSX.Element => {
    return icon(
        'M11,12a1,1 0 1,0 2,0a1,1 0 1,0 -2,0 M11,5a1,1 0 1,0 2,0a1,1 0 1,0 -2,0 M11,19a1,1 0 1,0 2,0a1,1 0 1,0 -2,0',
        {
            stroke: true,
            width: props.width,
            name: 'DotsVertical',
        }
    )
}

export const Download = (props: IconProps): JSX.Element => {
    return icon('M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3', {
        stroke: true,
        width: props.width,
        name: 'Download',
    })
}

export const DownloadCloud = (props: IconProps): JSX.Element => {
    return icon('M8 17l4 4 4-4 M12 12v9 M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29', {
        stroke: true,
        width: props.width,
        name: 'DownloadCloud',
    })
}

export const Edit = (props: IconProps): JSX.Element => {
    return icon('M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z', {
        stroke: true,
        width: props.width,
        name: 'Edit',
    })
}

export const Edit2 = (props: IconProps): JSX.Element => {
    return icon('M12 20h9 M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z', {
        stroke: true,
        width: props.width,
        name: 'Edit2',
    })
}

export const Edit3 = (props: IconProps): JSX.Element => {
    return icon(
        'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z',
        {
            stroke: true,
            width: props.width,
            name: 'Edit3',
        }
    )
}

export const ExternalUrl = (props: IconProps): JSX.Element => {
    return icon('M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6 M15 3h6v6 M10 14L21 3', {
        stroke: true,
        width: props.width,
        name: 'ExternalUrl',
    })
}

export const Eye = (props: IconProps): JSX.Element => {
    return icon('M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M9,12a3,3 0 1,0 6,0a3,3 0 1,0 -6,0', {
        stroke: true,
        width: props.width,
        name: 'Eye',
    })
}

export const EyeOff = (props: IconProps): JSX.Element => {
    return icon(
        'M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24 M1 1l22 22',
        {
            stroke: true,
            width: props.width,
            name: 'EyeOff',
        }
    )
}

export const File = (props: IconProps): JSX.Element => {
    return icon('M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z M13 2v7h7', {
        stroke: true,
        width: props.width,
        name: 'File',
    })
}

export const FileMinus = (props: IconProps): JSX.Element => {
    return icon('M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M9 15h6', {
        stroke: true,
        width: props.width,
        name: 'FileMinus',
    })
}

export const FilePlus = (props: IconProps): JSX.Element => {
    return icon(
        'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M12 18v-6 M9 15h6',
        {
            stroke: true,
            width: props.width,
            name: 'FilePlus',
        }
    )
}

export const FileText = (props: IconProps): JSX.Element => {
    return icon(
        'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
        {
            stroke: true,
            width: props.width,
            name: 'FileText',
        }
    )
}

export const Filter = (props: IconProps): JSX.Element => {
    return icon('M22 3H2l8 9.46V19l4 2v-8.54L22 3z', {
        stroke: true,
        width: props.width,
        name: 'Filter',
    })
}

export const Grid = (props: IconProps): JSX.Element => {
    return icon('M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z', {
        stroke: true,
        width: props.width,
        name: 'Grid',
    })
}

export const Hashtag = (props: IconProps): JSX.Element => {
    return icon('M4 9h16 M4 15h16 M10 3L8 21 M16 3l-2 18', {
        stroke: true,
        width: props.width,
        name: 'Hashtag',
    })
}

export const Headphones = (props: IconProps): JSX.Element => {
    return icon(
        'M3 18v-6a9 9 0 0118 0v6 M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z',
        {
            stroke: true,
            width: props.width,
            name: 'Headphones',
        }
    )
}

export const HeadingLarge = (props: IconProps): JSX.Element => {
    return icon('M4,4L8,4 M16,4L20,4 M4,20L8,20 M16,20L20,20 M6,4L6,20 M18,4L18,20 M6,12L18,12', {
        stroke: true,
        width: props.width,
        name: 'HeadingLarge',
    })
}

export const HeadingSmall = (props: IconProps): JSX.Element => {
    return icon(
        'M7,10L9.5,10 M14.5,10L17,10 M7,20L9.5,20 M14.5,20L17,20 M8.25,10L8.25,20 M15.75,10L15.75,20 M8.25,15L15.75,15',
        {
            stroke: true,
            width: props.width,
            name: 'HeadingSmall',
        }
    )
}

export const HelpCircle = (props: IconProps): JSX.Element => {
    return icon(
        'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3 M11.5,17a0.5,0.5 0 1,0 1,0a0.5,0.5 0 1,0 -1,0',
        {
            stroke: true,
            width: props.width,
            name: 'HelpCircle',
        }
    )
}

export const Home = (props: IconProps): JSX.Element => {
    return icon('M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10', {
        stroke: true,
        width: props.width,
        name: 'Home',
    })
}

export const Image = (props: IconProps): JSX.Element => {
    return icon(
        'M21,5C21,3.896 20.104,3 19,3L5,3C3.896,3 3,3.896 3,5L3,19C3,20.104 3.896,21 5,21L19,21C20.104,21 21,20.104 21,19L21,5Z M21,15L16,10L5,21 M7,8.5a1.5,1.5 0 1,0 3,0a1.5,1.5 0 1,0 -3,0',
        {
            stroke: true,
            width: props.width,
            name: 'Image',
        }
    )
}

export const Information = (props: IconProps): JSX.Element => {
    return icon('M12 16v-4 M12 8h.01', {
        stroke: true,
        width: props.width,
        name: 'Information',
    })
}

export const InformationCircle = (props: IconProps): JSX.Element => {
    return icon('M12 16v-4 M12 8h.01 M2,12a10,10 0 1,0 20,0a10,10 0 1,0 -20,0', {
        stroke: true,
        width: props.width,
        name: 'InformationCircle',
    })
}

export const Italic = (props: IconProps): JSX.Element => {
    return icon('M19 4h-9 M14 20H5 M15 4L9 20', {
        stroke: true,
        width: props.width,
        name: 'Italic',
    })
}

export const Layout = (props: IconProps): JSX.Element => {
    return icon(
        'M21,5C21,3.896 20.104,3 19,3L5,3C3.896,3 3,3.896 3,5L3,19C3,20.104 3.896,21 5,21L19,21C20.104,21 21,20.104 21,19L21,5Z M3,9L21,9 M9,21L9,9',
        {
            stroke: true,
            width: props.width,
            name: 'Layout',
        }
    )
}

export const ListBulleted = (props: IconProps): JSX.Element => {
    return icon('M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01', {
        stroke: true,
        width: props.width,
        name: 'ListBulleted',
    })
}

export const ListNumbered = (props: IconProps): JSX.Element => {
    return icon('M8.503,6L21.503,6 M8.503,12L21.503,12 M8.503,18L21.503,18', {
        stroke: true,
        width: props.width,
        name: 'ListNumbered',
        thinStroke:
            'M3.508,4.5L3.508,7.5 M4.513,16.5L4.513,19.5 M4.53,10.5L2.497,13.5 M2.513,10.5L4.513,10.5 M2.513,13.5L4.513,13.5 M2.513,19.5L4.513,19.5 M3.513,18L4.513,18 M2.513,16.5L4.513,16.5',
    })
}

export const Loader = (props: IconProps): JSX.Element => {
    return icon(
        'M12 2v4 M12 18v4 M4.93 4.93l2.83 2.83 M16.24 16.24l2.83 2.83 M2 12h4 M18 12h4 M4.93 19.07l2.83-2.83 M16.24 7.76l2.83-2.83',
        {
            stroke: true,
            width: props.width,
            name: 'Loader',
        }
    )
}

export const Lock = (props: IconProps): JSX.Element => {
    return icon(
        'M21,13C21,11.896 20.104,11 19,11L5,11C3.896,11 3,11.896 3,13L3,20C3,21.104 3.896,22 5,22L19,22C20.104,22 21,21.104 21,20L21,13Z M7 11V7a5 5 0 0110 0v4',
        {
            stroke: true,
            width: props.width,
            name: 'Lock',
        }
    )
}

export const LogIn = (props: IconProps): JSX.Element => {
    return icon('M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4 M10 17l5-5-5-5 M15 12H3', {
        stroke: true,
        width: props.width,
        name: 'LogIn',
    })
}

export const LogOut = (props: IconProps): JSX.Element => {
    return icon('M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9', {
        stroke: true,
        width: props.width,
        name: 'LogOut',
    })
}

export const Mail = (props: IconProps): JSX.Element => {
    return icon(
        'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
        {
            stroke: true,
            width: props.width,
            name: 'Mail',
        }
    )
}

export const Menu = (props: IconProps): JSX.Element => {
    return icon('M3 12h18 M3 6h18 M3 18h18', {
        stroke: true,
        width: props.width,
        name: 'Menu',
    })
}

export const MessageCircle = (props: IconProps): JSX.Element => {
    return icon(
        'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z',
        {
            stroke: true,
            width: props.width,
            name: 'MessageCircle',
        }
    )
}

export const MessageSquare = (props: IconProps): JSX.Element => {
    return icon('M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z', {
        stroke: true,
        width: props.width,
        name: 'MessageSquare',
    })
}

export const Minus = (props: IconProps): JSX.Element => {
    return icon('M5 12h14', {
        stroke: true,
        width: props.width,
        name: 'Minus',
    })
}

export const MousePointer = (props: IconProps): JSX.Element => {
    return icon('M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z M13 13l6 6', {
        stroke: true,
        width: props.width,
        name: 'MousePointer',
    })
}

export const Music = (props: IconProps): JSX.Element => {
    return icon(
        'M9 18V5l12-2v13 M3,18a3,3 0 1,0 6,0a3,3 0 1,0 -6,0 M15,16a3,3 0 1,0 6,0a3,3 0 1,0 -6,0',
        {
            stroke: true,
            width: props.width,
            name: 'Music',
        }
    )
}

export const PauseCircle = (props: IconProps): JSX.Element => {
    return icon('M10 15V9 M14 15V9 M2,12a10,10 0 1,0 20,0a10,10 0 1,0 -20,0', {
        stroke: true,
        width: props.width,
        name: 'PauseCircle',
    })
}

export const Percentage = (props: IconProps): JSX.Element => {
    return icon(
        'M19 5L5 19 M4,6.5a2.5,2.5 0 1,0 5,0a2.5,2.5 0 1,0 -5,0 M15,17.5a2.5,2.5 0 1,0 5,0a2.5,2.5 0 1,0 -5,0',
        {
            stroke: true,
            width: props.width,
            name: 'Percentage',
        }
    )
}

export const Phone = (props: FillableIconProps): JSX.Element => {
    return icon(
        'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z',
        {
            stroke: true,
            fill: props.fill,
            width: props.width,
            name: 'Phone',
        }
    )
}

export const PlayCircle = (props: IconProps): JSX.Element => {
    return icon('M10 8l6 4-6 4V8z M2,12a10,10 0 1,0 20,0a10,10 0 1,0 -20,0', {
        stroke: true,
        width: props.width,
        name: 'PlayCircle',
    })
}

export const Plus = (props: IconProps): JSX.Element => {
    return icon('M12 5v14 M5 12h14', {
        stroke: true,
        width: props.width,
        name: 'Plus',
    })
}

export const Refresh = (props: IconProps): JSX.Element => {
    return icon(
        'M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15',
        {
            stroke: true,
            width: props.width,
            name: 'Refresh',
        }
    )
}

export const Save = (props: IconProps): JSX.Element => {
    return icon(
        'M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8 M7 3v5h8',
        {
            stroke: true,
            width: props.width,
            name: 'Save',
        }
    )
}

export const Search = (props: IconProps): JSX.Element => {
    return icon('M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z M16 16l4.5 4.5', {
        stroke: true,
        width: props.width,
        name: 'Search',
    })
}

export const Send = (props: IconProps): JSX.Element => {
    return icon('M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z', {
        stroke: true,
        width: props.width,
        name: 'Send',
    })
}

export const Settings = (props: IconProps): JSX.Element => {
    return icon(
        'M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z M9,12a3,3 0 1,0 6,0a3,3 0 1,0 -6,0',
        {
            stroke: true,
            width: props.width,
            name: 'Settings',
        }
    )
}

export const ShoppingBag = (props: IconProps): JSX.Element => {
    return icon('M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z M3 6h18 M16 10a4 4 0 01-8 0', {
        stroke: true,
        width: props.width,
        name: 'ShoppingBag',
    })
}

export const ShoppingCart = (props: IconProps): JSX.Element => {
    return icon(
        'M8,21a1,1 0 1,0 2,0a1,1 0 1,0 -2,0 M19,21a1,1 0 1,0 2,0a1,1 0 1,0 -2,0 M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6',
        {
            stroke: true,
            width: props.width,
            name: 'ShoppingCart',
        }
    )
}

export const Smartphone = (props: IconProps): JSX.Element => {
    return icon(
        'M12,18L12.01,18 M19,4C19,2.896 18.104,2 17,2L7,2C5.896,2 5,2.896 5,4L5,20C5,21.104 5.896,22 7,22L17,22C18.104,22 19,21.104 19,20L19,4Z',
        {
            stroke: true,
            width: props.width,
            name: 'Smartphone',
        }
    )
}

export const Square = (props: IconProps): JSX.Element => {
    return icon(
        'M21,5C21,3.896 20.104,3 19,3L5,3C3.896,3 3,3.896 3,5L3,19C3,20.104 3.896,21 5,21L19,21C20.104,21 21,20.104 21,19L21,5Z',
        {
            stroke: true,
            width: props.width,
            name: 'Square',
        }
    )
}

export const Star = (props: FillableIconProps): JSX.Element => {
    return icon(
        'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
        {
            stroke: true,
            fill: props.fill,
            width: props.width,
            name: 'Star',
        }
    )
}

export const Tag = (props: IconProps): JSX.Element => {
    return icon(
        'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01',
        {
            stroke: true,
            width: props.width,
            name: 'Tag',
        }
    )
}

export const ThumbsDown = (props: FillableIconProps): JSX.Element => {
    return icon(
        'M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3zm7-13h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17',
        {
            stroke: true,
            fill: props.fill,
            width: props.width,
            name: 'ThumbsDown',
        }
    )
}

export const ThumbsUp = (props: FillableIconProps): JSX.Element => {
    return icon(
        'M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3',
        {
            stroke: true,
            fill: props.fill,
            width: props.width,
            name: 'ThumbsUp',
        }
    )
}

export const Tool = (props: FillableIconProps): JSX.Element => {
    return icon(
        'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z',
        {
            stroke: true,
            fill: props.fill,
            width: props.width,
            name: 'Tool',
        }
    )
}

export const Trash = (props: FillableIconProps): JSX.Element => {
    return icon(
        'M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2 M10 11v6 M14 11v6',
        {
            stroke: true,
            fill: props.fill,
            width: props.width,
            name: 'Trash',
        }
    )
}
export const Trash2 = (props: IconProps): JSX.Element => {
    return icon(
        'M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2 M10 11v6 M14 11v6',
        {
            stroke: true,
            width: props.width,
            name: 'Trash2',
        }
    )
}

export const TrendingDown = (props: IconProps): JSX.Element => {
    return icon('M23 18l-9.5-9.5-5 5L1 6 M17 18h6v-6', {
        stroke: true,
        width: props.width,
        name: 'TrendingDown',
    })
}

export const TrendingUp = (props: IconProps): JSX.Element => {
    return icon('M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6', {
        stroke: true,
        width: props.width,
        name: 'TrendingUp',
    })
}

export const Type = (props: IconProps): JSX.Element => {
    return icon('M4 7V4h16v3 M9 20h6 M12 4v16', {
        stroke: true,
        width: props.width,
        name: 'Type',
    })
}

export const Underline = (props: IconProps): JSX.Element => {
    return icon('M6 3v7a6 6 0 006 6 6 6 0 006-6V3 M4 21h16', {
        stroke: true,
        width: props.width,
        name: 'Underline',
    })
}

export const Url = (props: IconProps): JSX.Element => {
    return icon(
        'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71',
        { stroke: true, width: props.width, name: 'Url' }
    )
}

export const Url2 = (props: IconProps): JSX.Element => {
    return icon('M15 7h3a5 5 0 015 5 5 5 0 01-5 5h-3m-6 0H6a5 5 0 01-5-5 5 5 0 015-5h3 M8 12h8', {
        stroke: true,
        width: props.width,
        name: 'Url2',
    })
}

export const Upload = (props: IconProps): JSX.Element => {
    return icon('M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12', {
        stroke: true,
        width: props.width,
        name: 'Upload',
    })
}

// user icons come from hero icons: https://heroicons.com/

export const User = (props: IconProps): JSX.Element => {
    return icon(
        'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        {
            stroke: true,
            width: props.width,
            name: 'User',
        }
    )
}

export const UserGroup = (props: IconProps): JSX.Element => {
    return icon(
        'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        {
            stroke: true,
            width: props.width,
            name: 'UserGroup',
        }
    )
}

export const Video = (props: IconProps): JSX.Element => {
    return icon(
        'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z',
        {
            stroke: true,
            width: props.width,
            name: 'Video',
        }
    )
}

export const X = (props: IconProps): JSX.Element => {
    return icon('M18 6L6 18 M6 6l12 12', {
        stroke: true,
        width: props.width,
        name: 'X',
    })
}

export const XCircle = (props: IconProps): JSX.Element => {
    return icon('M15 9l-6 6 M9 9l6 6 M2,12a10,10 0 1,0 20,0a10,10 0 1,0 -20,0', {
        stroke: true,
        width: props.width,
        name: 'XCircle',
    })
}

export type Icon = ReturnType<typeof icon>
