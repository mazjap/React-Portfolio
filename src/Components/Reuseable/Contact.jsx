// Constants
// import Constants from "../Hidden"

// CSS
import "../../CSS/Contact.css"

// Global Context
import { useThemeContext } from "../../ThemeContextProvider"

// React
import React from "react"

// Custom Hooks
import useHover from "../../Hooks/useHover"

export function Contact(props) {
    const [ submitRef, isHoveringOverSubmit ] = useHover()
    const { themeState: { textColor, buttonColor, buttonSecondaryColor } } = useThemeContext()

    const defaultStyle = {
        color: textColor
    }

    return (
        <>
            <form action="https://formspree.io/xqkedzrn" method="POST">
                <label style={ defaultStyle }>Name:</label>
                <input id="name" name="Name" type="text" placeholder="Name" required />
                <label style={ defaultStyle }>Email:</label>
                <input id="email" name="Email" type="email" placeholder="Email" required />
                <label style={ defaultStyle }>Subject:</label>
                <input id="subject" name="Subject" placeholder="Subject" required />
                <label style={ defaultStyle }>Message:</label>
                <textarea name="Body" id="Submit" placeholder="Message" cols="10" rows="10" required />
                <button
                type="submit"
                className="default_button"
                ref={ submitRef }
                style={
                    {
                        backgroundColor: isHoveringOverSubmit ? buttonSecondaryColor : buttonColor,
                        color: textColor
                    }
                }>Submit</button>
            </form>
        </>
    )
}