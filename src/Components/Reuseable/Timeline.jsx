import React from "react"
import Constants from "../../Hidden"
import SectionHeading from "./SectionHeading"
import { useThemeContext } from "../../ThemeContextProvider"

import "../../CSS/Timeline.css"
import useHover from "../../Hooks/useHover"

// Timeline:
// title: string
// description
// start: Date
// end?: Date
// link?: string


function TimelineItem(props) {
    const { themeState: { titleColor, textColor, buttonColor, buttonSecondaryColor, backgroundColor } } = useThemeContext()
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
    
    const formatDate = dateString => {
        const date = new Date(dateString)
        
        if (!isNaN(date)) {
            return `${date.getFullYear() ?? date}`
        }
    }

    const start = formatDate(props.start)
    const end = formatDate(props.end)

    const timelineText = end
    ? `${start} - ${end}`
    : `${start.getFullYear() ?? start}`

    return (
        <div className={ (props.right ?? "left") + "-div side-padding" }>
            <div className={ "timeline-item shadowed " + props.right }>
                <h2 style={ titleStyle }>{ props.title }</h2>
                <p 
                    className="date" 
                    style={
                        {
                            color: backgroundColor,
                            backgroundColor: titleColor
                        }
                    }
                >{ timelineText }</p>
                <p style={ textStyle }>{ props.description }</p>
                <a 
                    className="learn-more-button"
                    rel="noopener noreferrer"
                    href={ props.link }
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
    const { themeState: { titleColor } } = useThemeContext()

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
                <span 
                    id="timeline-line"
                    style={
                        {
                            backgroundColor: titleColor
                        }
                    }
                ></span>
                {
                    timelineItems.map(
                        entry => {
                            return <TimelineItem
                                start={ entry.start }
                                end={ entry.end }
                                title={ entry.title }
                                description={ entry.description }
                                link={ entry.link }
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