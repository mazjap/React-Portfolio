import React from "react"
import useHover from "../../Hooks/useHover"
import { useThemeContext } from "../../ThemeContextProvider"
import SectionHeading from "./SectionHeading"

import "../../CSS/AboutMe.css"

export default function AboutMe(props) {
    const { name, image, title, aboutMeText, socialMedia } = props
    const { themeState: { titleColor, textColor } } = useThemeContext()
    
    const MediaItem = (props) => {
        const { href, icon, color, selectedColor } = props
        const [ iconRef, isHoveringOverIcon ] = useHover()

        const itemStyle = {
            color: isHoveringOverIcon ? selectedColor : color
        }

        return (
            <li key={ href }>
                <a
                    href={ href }
                    className="icon-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i 
                    className={ `fab ${icon}` }
                    ref={ iconRef }
                    style={ itemStyle }
                    ></i>
                </a>
            </li>
        )
    }

    const titleStyle = {
        color: titleColor
    }

    const textStyle = {
        color: textColor
    }

    return (
        <div id="about" className="panel" data-color="extra-light">
            <SectionHeading command="whoami" />
            <div id="about-content">
                <img src={ image } alt={ name } id="profile-image" />

                <div id="about-details">
                    <div id="about-heading">
                        <h2
                        id="about-name"
                        style={ titleStyle }>{ name }</h2>
                        <p
                        id="about-title"
                        style={ textStyle }
                        >{ title }</p>
                    </div>

                    <p 
                    id="about-paragraph"
                    style={ textStyle }>{ aboutMeText }</p>

                    <div id="social-media">
                        <p 
                        id="social-details"
                        style={ textStyle }>Want to chat?</p>

                        <ul id="media-items">
                            { socialMedia.map(MediaItem) }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}