// Constants
// import Constants from "../Hidden"

// CSS
import "../CSS/Contact.css"

// Components
import Landing from "../Components/Reuseable/Landing"

// Global Context
import { useThemeContext } from "../ThemeContextProvider"

// React
import React from "react"

// Custom Hooks
import useHover from "../Hooks/useHover"

export default function Contact(props) {
    const [ submitRef, isHoveringOverSubmit ] = useHover()
    const { themeState: { textColor, titleColor, buttonColor, buttonSecondaryColor } } = useThemeContext()

    const titleStyle = {
        color: titleColor
    }

    const textStyle = {
        color: textColor
    }

    const buttonStyle = {
        ...textStyle,
        backgroundColor: isHoveringOverSubmit ? buttonSecondaryColor : buttonColor
    }

    return (
        <>
            <Landing landingText="Contact Me" />

            <div className="panel">
                <form action="https://formspree.io/xqkedzrn" method="POST" style={ titleStyle }>
                    <label >Name:</label>
                    <input id="name" name="Name" type="text" placeholder="Name" required />
                    <label>Email:</label>
                    <input id="email" name="Email" type="email" placeholder="Email" required />
                    <label>Subject:</label>
                    <input id="subject" name="Subject" placeholder="Subject" required />
                    <label>Message:</label>
                    <textarea name="Body" id="Submit" placeholder="Message" cols="10" rows="10" required />
                    <button 
                    type="submit" 
                    className="default_button"
                    ref={ submitRef }
                    style={
                        buttonStyle
                    }>Submit</button>
                </form>
            </div>
        </>
    )
}