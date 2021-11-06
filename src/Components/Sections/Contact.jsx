import { Contact as C } from "../Reuseable/Contact"
import SectionHeading from "../Reuseable/SectionHeading"

export default function Contact(props) {
    return (
        <div className="panel">
            <SectionHeading 
                command={ props.title ?? "echo" }
                subHeading={ props.desc ?? "This portfolio website is open source (see the nav bar for source code). I'd love to hear your feedback, questions, or about any issues you find on the site (feel free to open a pull request too). Fill out the form below and I'll get back to you once I have the chance." }
            />
            <C />
        </div>
    )
}