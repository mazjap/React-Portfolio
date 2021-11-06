import React from "react"
import { useThemeContext } from "../../ThemeContextProvider"

export default function SectionHeading(props) {
    const { command } = props
    const { themeState: { titleColor, textColor } } = useThemeContext()

    return (
        <>
            <h2 
            className="section-heading"
            style={
                {
                    color: titleColor
                }
            }>{ command }</h2>
            {
                props.subHeading
                ? (
                    <p
                    style={
                        {
                            color: textColor,
                            textAlign: "center"
                        }
                    }
                    >{ props.subHeading }</p>
                )
                : null
            }
        </>
    )
}