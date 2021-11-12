import React from "react"
import Landing from "../Components/Reuseable/Landing"
import profileImage from "../assets/Profile.png"
import Projects from "../Components/Sections/Projects"
import { PROJECT_FILTER } from "../Components/Reuseable/Projects"
import Contact from "../Components/Sections/Contact"
import { useThemeContext } from "../ThemeContextProvider"
import Switch from "../Components/Reuseable/Switch"
import useIntervaledText from "../Hooks/useIntervaledText"
import AboutMe from "../Components/Reuseable/AboutMe"
import Timeline from "../Components/Reuseable/Timeline"

export default function Home(props) {
    const textFor = bool => {
        return bool
        ? "console.log('Hello, World!');"
        : 'print("Hello, World!")'
    }

    const { themeState: { textColor } } = useThemeContext()
    const [ ref, isOnScreen ] = useOnScreen()
    const [ isWebSelected, setIsWebSelected ] = React.useState(false)
    const [ landingText, setLandingText ] = useIntervaledText(textFor(isWebSelected), isOnScreen ? 70 : null)

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
                textColor={ textColor }
                onClick={
                    toggleWebSelected
                }
            />

            <div ref={ ref }>
                <Landing landingText={ landingText } />
            </div>

            <AboutMe
                name="Jordan Christensen"
                title={
                    (
                        isWebSelected
                        ? "Aspiring Web"
                        : "iOS"
                    ) + " Developer"
                }
                image={ profileImage }
                aboutMeText="My name is Jordan, I build websites & iOS applications. I currently live in Utah but have lived around the world. I love dogs, playing ukulele, and am a huge advocate of open-source software. I currently work as an iOS Developer, but am going to school to learn Web Development fundamentals."
                socialMedia={
                    [
                        {
                            href: "https://github.com/mazjap",
                            icon: "fa-github-square",
                            color: "#223344",
                            selectedColor: "#000000"
                        },
                        {
                            href: "https://www.linkedin.com/in/jordan-a-christensen/",
                            icon: "fa-linkedin",
                            color: "#2e76c8",
                            selectedColor: "#0e76a8"
                        },
                        {
                            href: "https://twitter.com/joshington_1",
                            icon: "fa-twitter-square",
                            color: "#588aac",
                            selectedColor: "#38a1f3"
                        }
                    ]
                }
            />

            <Projects 
                filter={
                    isWebSelected
                    ? PROJECT_FILTER.web
                    : PROJECT_FILTER.ios
                }
            />

            <Timeline />

            <Contact />
        </div>
    )
}

// Hook
function useOnScreen(rootMargin = "0px") {
    // State and setter for storing whether element is visible
    const element = React.useRef()
    const [ isIntersecting, setIntersecting ] = React.useState(false)

    React.useLayoutEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            // Update our state when observer callback fires
            setIntersecting(entry.isIntersecting)
        },
        {
            rootMargin
        }
        )
        if (element.current) {
            observer.observe(element.current)
        }

        return () => observer.unobserve(element.current)
    }, []) // Empty array ensures that effect is only run on mount and unmount

    return [ element, isIntersecting ]
}