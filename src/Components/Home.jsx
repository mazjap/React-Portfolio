import React from "react"
import Landing from "./Reuseable/Landing"
import profileImage from "../assets/Profile.png"
import { ProjectsPreview } from "./Projects"
import Contact from "./Contact"
import { useThemeContext } from "../ThemeContextProvider"
import Switch from "./Reuseable/Switch"
import useInterval from "./useInterval"

export default function Home(props) {
    const textFor = bool => {
        return bool 
        ? "console.log('Hello, World!')"
        : 'print("Hello, World!")'
    }

    const { themeState: { TitleColor, TextColor } } = useThemeContext()
    const [ isWebSelected, setIsWebSelected ] = React.useState(false)
    const [ landingText, setLandingText ] = useInterval(textFor(false))

    const toggleWebSelected = () => {
        const newValue = !isWebSelected

        setLandingText(textFor(newValue))
        setIsWebSelected(newValue)
    }
    return (
        <div>
            <Switch 
            isSelected={ isWebSelected } 
            leadingTitle="iOS"
            trailingTitle="Web"
            textColor={ TextColor }
            onClick={
                toggleWebSelected
            } />

            <Landing landingText={ landingText } />

            <AboutMe
            name="Jordan Christensen"
            title="iOS (& Aspiring Web) Developer"
            image={ profileImage }
            aboutMeText="My name is Jordan, I build websites & iOS applications. I currently live in Utah but have lived around the world. I love dogs, playing ukulele, and am a huge advocate of open-source software."
            socialMedia={
                [
                    {
                        href: "https://github.com/mazjap",
                        icon: "fa-github-square"
                    },
                    {
                        href: "https://www.linkedin.com/in/jordan-a-christensen/",
                        icon: "fa-linkedin"
                    },
                    {
                        href: "https://twitter.com/joshington_1",
                        icon: "fa-twitter-square"
                    }
                ]
            }
            titleColor={ TitleColor }
            textColor={ TextColor }
            />

            <ProjectsPreview />

            {/* <Timeline /> */}

            <Contact />
        </div>
    )
}

function AboutMe(props) {
    const { name, image, title, aboutMeText, socialMedia, titleColor, textColor } = props

    const MediaItem = (props) => {
        const { href, icon } = props

        return (
            <li key={ href }>
                <a
                href={ href }
                className="icon-link"
                target="_blank"
                rel="noopener noreferrer"
                >
                    <i className={ `fab ${icon}` }></i>
                </a>
            </li>
        )
    }

    return (
        <div id="about" className="panel" data-color="extra-light">
            <h2 className="section-heading">whoami</h2>
            <div id="about-content">
                <img src={ image } alt={ name } id="profile-image" />

                <div id="about-details">
                    <div id="about-heading">
                        <h2 id="about-name">{ name }</h2>
                        <p id="about-title">{ title }</p>
                    </div>

                    <p id="about-paragraph">{ aboutMeText }</p>

                    <div id="social-media">
                        <p id="social-details">Want to chat?</p>

                        <ul id="media-items">
                            { socialMedia.map(MediaItem) }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

// function Timeline(props) {
//     const TimelineItem = props => {
        
//         return (
//             <div className={ "timeline-item " + props.isEven ? "even" : "odd" }>

//             </div>
//         )
//     }

//     return (
//         <div className="panel" id="timeline">
//             { 
//                 props.items.map((item, index) => <TimelineItem isEven={ index % 2 == 0 } start={  } />)
//             }
//         </div>
//     )
// }