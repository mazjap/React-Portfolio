import "./ImageCarousel.css"
import React from "react"

// Props is expected to have:
// link: string 
// images: [string] 
// index: int
// altText: string
export default function ImageCarousel(props) {
    const [imageIndex, setImageIndex] = React.useState(0)
    const images = props.images ?? []

    const incrementImage = () => {
        if (imageIndex + 1 >= images.length) {
            setImageIndex(0)
        } else {
            setImageIndex(imageIndex + 1)
        }
    }

    const decrementImage = () => {
        if (imageIndex - 1 < 0) {
            setImageIndex(images.length)
        } else {
            setImageIndex(images.length - 1)
        }
    }

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
            <button className="leftArrow" onClick={ incrementImage }>❮</button>
            <button className="rightArrow" onClick={ decrementImage }>❯</button>
        </div>
    )
}