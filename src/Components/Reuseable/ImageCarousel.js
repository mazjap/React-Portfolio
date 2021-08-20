import "./ImageCarousel.css"
import React from "react"

// Props is expected to have:
// link: string 
// images: [string] 
// index: int
// altText: string
export default function ImageCarousel(props) {
    const Image = (props) => {
        return (
            <div className="slideshow_item">
                <div className="project-img">
                    <a target="_blank" rel="noopener noreferrer" href={ props.url ?? "#" }><img src={ props.source } alt={ props.altText ?? "Image carousel" } /></a>
                </div>
            </div>
        )
    }

    return (
        <div className="slideshow_container">
            { (props.images ?? []).map(url => Image({ url, source: props.source })) }
            <button className="leftArrow" onclick={ `prevSlide(${props.index ?? 0})` }>❮</button>
            <button className="rightArrow" onclick={ `nextSlide(${props.index ?? 0})` }>❯</button>
        </div>
    )
}