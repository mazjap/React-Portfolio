import React from "react"
import { Projects as P } from "../Components/Reuseable/Projects"
import Landing from "../Components/Reuseable/Landing"

export default function Projects(props) {
    return (
        <div className="panel">
            <Landing landingText="All Projects" />
            <P />
        </div>
    )
}

export function ProjectsPreview(props) {
    return <Projects limit={ 6 } isPreview={ true } filter={ props.filter } />
}