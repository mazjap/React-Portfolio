import React from "react"
import useOnScreen from "./Hooks/useOnScreen"
import { useThemeContext } from "./ThemeContextProvider"

function Panel(props) {
    const { backgroundColor } = props
    const isOnScreen = useOnScreen()
    const {  } = useThemeContext()

    return (
        <div 
        className="panel"
        style={
            {
                backgroundColor:
            }
        }>

        </div>
    )
}