import React from "react"
import { useThemeContext } from "../../ThemeContextProvider"
import ImageCarousel from "./ImageCarousel"
import { Link } from "react-router-dom"
import Constants from "../../Hidden"
import useHover from "../../Hooks/useHover"

import "../../CSS/Project.css"

export const PROJECT_FILTER = Object.freeze({
    "web" : 1,
    "ios" : 2,
    "appstore" : 3,
    "opensource" : 4,
    "name" : 5
})

function ProjectItem(props) {
    const { isPreview, projectId } = props
    const { themeState: { textColor, buttonColor, buttonSecondaryColor } } = useThemeContext()
    const link = props.production ?? props.github
    const { learnMoreRef, isLearnMoreHovering } = useHover()

    const textStyle = {
        color: textColor
    }

    const buttonStyle = {
        backgroundColor: isLearnMoreHovering ? buttonSecondaryColor : buttonColor,
        color: textColor
    }

    return (
        <div className={ "project-item shadowed " + (props.right || "left") }>
            <h4 style={ textStyle }>{ props.languages }</h4>
            <h4 style={ textStyle }>{ props.techStack }</h4>
            <h3 style={ textStyle }>{ props.name }</h3>
            {
                isPreview
                ? null
                : <ImageCarousel
                    link={ link }
                    images={ props.images }
                    altText={ "Image carousel showing images of " + props.name }
                />
            }
            <p style={ textStyle }>{
                props.description.length > 255
                ? props.description.slice(0, 255)
                : props.description
            }</p>

            <Link
            className="default_button" 
            to={ `/projects/${projectId}` }
            ref={ learnMoreRef }
            style={ 
                buttonStyle
            }>Learn More</Link>
        </div>
    )
}

export function Projects(props) {
    const [projects, setProjects] = React.useState([])
    const [error, setError] = React.useState(null)
    const isPreview = props.isPreview ?? false
    const { themeState: { textColor } } = useThemeContext()

    React.useEffect(() => {
        let url = Constants.baseUrl + "/projects"
        if (props.limit) {
            url += "?limit=" + props.limit + "&"
        } else {
            url += "?"
        }

        url += "filter=" + props.filter

        fetch(url)
        .then(value => {
            value.json()
            .then(json => {
                console.log(json)
                setProjects(json)
                setError(null)
            })
        })
        .catch(error => {
            console.log(error)
            setError(error)
        })
    }, [props.limit, props.filter])

    if (error || !projects) {
        return <h3>Uh oh, there was an issue while trying to grab the projects. Please try again later</h3>
    }

    return (
        <>
            <div id="project-container">
                { projects.map((project, index) => (
                    <ProjectItem 
                    isPreview={ isPreview }
                    textColor={ textColor }
                    projectId={ project.id }
                    right={ index % 2 === 1 ? "right" : "" }
                    name={ project.name }
                    key={ project.id }
                    description={ project.description }
                    languages={ project.languages }
                    techStack={ project.techStack }
                    images={ project.images }
                    />
                )) }
            </div>
            {
                isPreview
                ? <Link 
                className="default_button"
                to="/projects"
                style={ { color: textColor } }>View All</Link>
                : null
            }
        </>
    )
}