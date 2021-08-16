import React from "react"

export default function Landing(props) {
    const { landingText } = props
    const [ isShowingScrollText, updateScrollTextIsActive ] = React.useState(true)

    React.useEffect(() => {
        window.onscroll = () => {
            if (window.scrollY) {
                updateScrollTextIsActive(false)
            } else {
                updateScrollTextIsActive(true)
            }
        }
    }, [])

    return (
        <div id="landing" className="panel" data-color="default">
            <div id="landing-text">
                <h1>{ landingText }</h1>
            </div>

            <div id="scroll-text">
                <p>{ isShowingScrollText ? "Scroll down for more" : "" }</p>
            </div>
        </div>
    )
}