// Constants
import Constants from "../Hidden"

// CSS
import "./Contact.css"

// Global Context
import { useThemeContext } from "../ThemeContextProvider"

// React
import React from "react"

// Custom Hooks
import useHover from "../Hooks/useHover"

export default function Contact(props) {
    const [ ref, isHovering ] = useHover()
    const { themeState } = useThemeContext()

    return (
        <div className="panel"  data-color="med">
            <h2 className="section-heading">echo</h2>
            <p>
                <a 
                href={ Constants.sourceUrl }
                ref={ ref }
                style={
                    {
                        color: isHovering ? themeState.TextColor : themeState.TitleColor
                    }
                }>This website</a> is open source. If you find any issues or would like to chat, fill out the form below.
            </p>
            <form action="https://formspree.io/xqkedzrn" method="POST">
                <label>Name:</label>
                <input id="name" name="Name" type="text" placeholder="Name" required />
                <label>Email:</label>
                <input id="email" name="Email" type="email" placeholder="Email" required />
                <label>Subject:</label>
                <input id="subject" name="Subject" placeholder="Subject" required />
                <label>Message:</label>
                <textarea name="Body" id="Submit" placeholder="Message" cols="10" rows="10" required />
                <button type="submit" className="default_button" >Submit</button>
            </form>
        </div>
    )
}