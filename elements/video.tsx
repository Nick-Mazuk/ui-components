import { Ratio } from './ratio'

type Props = {
    children?: never
}

// eslint-disable-next-line import/exports-last -- there are multiple components in this file
export const Video = (properties: Props): JSX.Element => {
    return (
        <p>
            Not stable. Do not use. If needing a YouTube video, use <code>YouTube</code> instead
            {properties}
        </p>
    )
}

// eslint-disable-next-line import/exports-last -- there are multiple components in this file
export type Video = ReturnType<typeof Video>

type YouTubeProps = {
    children?: never
    id: string
    title: string
    noRatio?: boolean
    onPlay?: () => void
}

export const YouTube = ({ id, title, noRatio }: YouTubeProps): JSX.Element => {
    // eslint-disable-next-line unicorn/prevent-abbreviations -- not an abbreviation
    const iFrame = (
        <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1?enablejsapi=1`}
            srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${id}?autoplay=1><img src='https://i.ytimg.com/vi/${id}/maxresdefault.jpg' onload="if (this.naturalWidth === 120) {this.src = this.currentSrc.replace('maxresdefault', 'hqdefault');}" alt='${title}'><span>▶</span></a>`}
            frameBorder='0'
            allow='autoplay; encrypted-media; picture-in-picture'
            allowFullScreen
            className='w-full h-full'
            title={title}
            loading='lazy'
        />
    )

    if (noRatio === true) return iFrame
    return (
        <Ratio as='figure' ratio='16x9'>
            {iFrame}
        </Ratio>
    )
}

export type YouTube = ReturnType<typeof YouTube>
