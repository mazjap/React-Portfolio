import { Projects as P } from "../Reuseable/Projects"
import SectionHeading from "../Reuseable/SectionHeading"

export default function Projects(props) {
    return (
        <div className="panel">
            <SectionHeading command="ls" />
            <P 
                limit={ 6 }
                filter={ props.filter }
            />
        </div>
    )
}