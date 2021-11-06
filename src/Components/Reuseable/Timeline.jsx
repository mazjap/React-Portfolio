import React from "react"
import Constants from "../../Hidden"
import SectionHeading from "./SectionHeading"
import { useThemeContext } from "../../ThemeContextProvider"

import "../../CSS/Timeline.css"
import useHover from "../../Hooks/useHover"

function TimelineItem(props) {
    const { themeState: { titleColor, textColor, buttonColor, buttonSecondaryColor } } = useThemeContext()
    const { buttonRef, isHoveringButton } = useHover()

    const titleStyle = {
        color: titleColor
    }

    const textStyle = {
        color: textColor
    }

    const buttonStyle = {
        ...textStyle,
        backgroundColor: isHoveringButton ? buttonSecondaryColor : buttonColor
    }

    return (
        <div className={ (props.right ?? "left") + "-div side-padding" }>
            <div className={ "timeline-item shadowed " + props.right }>
                <h2 style={ titleStyle }>{ props.title }</h2>
                <p className="date" style={ textStyle }>2019 - Present</p>
                <p style={ textStyle }>Completed and endorsed by Lambda School: A year long computer science & software engineering program with an immersive hands-on curriculum focused on iOS and engaging Python, algorithms, data structures, graphs, Django, C, as well as other operating systems.</p>
                <a 
                    className="learn-more-button" 
                    rel="noopener noreferrer" 
                    href={ props.links[0] }
                    ref={ buttonRef }
                    style={
                        buttonStyle
                    }
                >
                    Learn More
                </a>
            </div>
        </div>
    )
}

export default function Timeline(props) {
    const [ timelineItems, setTimelineItems ] = React.useState([])

    React.useEffect((intervalId) => {
        let url = Constants.baseUrl + "/timeline" // limit?

        fetch(url)
        .then(value => {
            value.json()
            .then(timelineItems => {
                console.log(timelineItems)
                setTimelineItems(timelineItems)
            })
        })
        .catch(error => {
            console.log(error)
        })

        return () => { clearInterval(intervalId) }
    }, [])

    if (timelineItems.length === 0) {
        return <div id="timeline"></div>
    }

    return (
        <div className="panel" id="timeline">
            <SectionHeading command="history" />
            <div id="timeline-container">
                <span id="timeline-line"></span>
                {
                    timelineItems.map(
                        entry => {
                            return <TimelineItem
                            start={ entry.start }
                            end={ entry.end }
                            title={ entry.title }
                            description={ entry.description }
                            links={ entry.links }
                            id={ entry.id }
                            key={ entry.title }
                            /> 
                        }
                    )
                }
            </div>
        </div>
    )
}