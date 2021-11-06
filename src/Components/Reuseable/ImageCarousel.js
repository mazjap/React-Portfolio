import "./ImageCarousel.css"
import React from "react"

// Props -
// url: string?
// images: [string]?
// index: int?
// altText: string?
export default function ImageCarousel(props) {
    const [imageIndex, setImageIndex] = React.useState(props.index ?? 0)
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
            setImageIndex(images.length - 1)
        } else {
            setImageIndex(imageIndex - 1)
        }
    }

    const Image = (props) => {
        return (
            <div className="slideshow_item">
                <div className="project-img">
                    <a target="_blank" rel="noopener noreferrer" href={ props.url ?? "#" }><img src={ props.imageSource } alt={ props.altText ?? "" } /></a>
                </div>
            </div>
        )
    }

    return (
        <div className="slideshow_container">
            { (props.images ?? []).map(url => <Image redirect={ props.url } imageSource={ url } key={ url } />) }
            <button className="leftArrow" onClick={ decrementImage }>❮</button>
            <button className="rightArrow" onClick={ incrementImage }>❯</button>
        </div>
    )
}