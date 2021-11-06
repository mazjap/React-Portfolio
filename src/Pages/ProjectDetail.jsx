import React from "react"
import Constants from "../Hidden"
import ImageCarousel from "../Components/Reuseable/ImageCarousel"

export default function ProjectDetail(props) {
    const { projectId } = props
    const [ project, setProject ] = React.useState()
    const [ encounteredError, setError ] = React.useState()

    React.useEffect(() => {
        let url = Constants.baseUrl + "/projects/" + (projectId || 0)

        console.log(url)

        fetch(url)
        .then(value => {
            value.json()
            .then(json => {
                console.log(json)
                setProject(json)
            })
        })
        .catch(error => {
            setError(error.message)
        })

        return () => {}
    }, [projectId])

    if (!projectId || isNaN(projectId)) {
        return <h2>You must provide a valid id in the url: /projects/10</h2>
    }

    if (encounteredError) {
        return (
            <div>
                <h2>Encountered an error while trying to fetch project data.</h2>
                <p>{ encounteredError }</p>
            </div>
        )
    }

    return (
        project
        ? <div>

        </div>
        : <h2>Fetching info for project...</h2>
    )
}