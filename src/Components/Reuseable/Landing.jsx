import React from "react"
import { useThemeContext } from "../../ThemeContextProvider"

import "../../CSS/LandingText.css"

export default function Landing(props) {
    const { themeState: { titleSecondaryColor, titleColor, textColor } } = useThemeContext()
    const { landingText } = props
    const [ isShowingScrollText, setShowingScrollText ] = React.useState(true)
    const [ isShowingIndicator, setIndicatorShowing ] = React.useState(true)

    React.useEffect(() => {
        window.onscroll = () => {
            if (window.scrollY > 10) {
                setShowingScrollText(false)
            } else {
                setShowingScrollText(true)
            }
        }
    }, [])

    React.useEffect(() => {
        setTimeout(() => {
            setIndicatorShowing(!isShowingIndicator)
        }, 500)
    }, [isShowingIndicator])

    const style = {
        backgroundImage: `linear-gradient(to top, ${titleColor}, ${titleSecondaryColor})`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "none",
        transition: "color 500ms"
    }

    return (
        <div id="landing" className="panel">
            <div id="landing-text">
                <h1 
                style={ style }
                key="landing-text">
                    { landingText }
                </h1>
                <h1 
                style={ style } 
                id="landing-indicator" 
                className={ isShowingIndicator ? null : " hidden" }
                key="landing-indicator">
                    ｜
                </h1>
            </div>

            <div id="scroll-text">
                <p style={
                    {
                        color: textColor,
                        transition: "500ms"
                    }
                }>{ isShowingScrollText ? "Scroll down for more" : "" }</p>
            </div>
        </div>
    )
}