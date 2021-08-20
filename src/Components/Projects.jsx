import React from "react"
import ImageCarousel from "./Reuseable/ImageCarousel"

function ProjectItem(props) {
    return (
        <div className="project-item">
            <h4>{ props.languages }</h4>
            <h4>{ props.techStack }</h4>
            <h3>{ props.name }</h3>
            <ImageCarousel link={ props.production ?? props.github } images={ props.images } />
            <p>{ props.description }</p>
        </div>
    )
}

export default function Projects(props) {
    const [projects, setProjects] = React.useState([])
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        let url = "http://localhost:3001/projects"
        if (props.limit) {
            url += "?limit=" + props.limit
        }

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
    }, [props.limit])

    if (error) {
        return <h3>Uh oh, there was an issue while trying to grab the projects. Try again later</h3>
    }

    if (!projects) {
        return <h3>No projects</h3>
    }

    return (
        <div className="panel">
            <h2 className="section-heading">Projects</h2>
            <div className="project-container">
                { projects.map((project) => ProjectItem(project)) }
            </div>
        </div>
    )
}

export function ProjectsPreview(props) {
    return Projects({ limit: 6 })
}