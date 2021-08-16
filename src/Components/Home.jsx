import React from "react"
import Landing from "./Reuseable/Landing"
import profileImage from "../assets/Profile.png"

export default function Home(props) {
    return (
        <div>
            <Landing landingText='print("Hello, World!")' />

            <AboutMe
            name="Jordan Christensen"
            title="iOS Developer"
            image={ profileImage }
            aboutMeText="I have cheese to thank for my career in software development."
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
            />
        </div>
    )
}

function AboutMe(props) {
    const { name, image, title, aboutMeText, socialMedia } = props

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
    )
}