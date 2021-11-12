import "../../CSS/ImageCarousel.css"
import React from "react"

// Props -
// url: string?
// images: [string]?
// index: int?
// altText: string?
export default function ImageCarousel(props) {
    const [imageIndex, setImageIndex] = React.useState(props.index ?? 0)
    const images = props.images ?? []

    console.log(imageIndex)
    
    const styleFor = index => {
        return {
            display: index !== imageIndex ? "none" : "block" 
        }
    }

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
            <div className="slideshow_item" style={ { display: props.isShown ? "block" : "none" } }>
                <div className="project-img">
                    <a target="_blank" rel="noopener noreferrer" href={ props.url ?? "#" }>
                        <img src={ props.imageSource } alt={ props.altText ?? "" } />
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="slideshow_container">
            { (props.images ?? []).map((url, index) => <Image redirect={ props.url } imageSource={ url } key={ url } isShown={ index == imageIndex } />) }
            <button className="left arrow" onClick={ decrementImage }>❮</button>
            <button className="right arrow" onClick={ incrementImage }>❯</button>
        </div>
    )
}