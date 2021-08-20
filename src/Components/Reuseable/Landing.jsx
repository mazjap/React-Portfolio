import React from "react"

export default function Landing(props) {
    const { landingText } = props
    const [ isShowingScrollText, setShowingScrollText ] = React.useState(true)
    const [ isShowingIndicator, setIndicatorShowing ] = React.useState(true)

    React.useEffect(() => {
        window.onscroll = () => {
            if (window.scrollY) {
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

    return (
        <div id="landing" className="panel" data-color="default">
            <div id="landing-text">
                <h1>{ landingText }</h1>
                <h1 className={ "landing-indicator" + (isShowingIndicator ? "" : " hidden") }>|</h1>
            </div>

            <div id="scroll-text">
                <p>{ isShowingScrollText ? "Scroll down for more" : "" }</p>
            </div>
        </div>
    )
}