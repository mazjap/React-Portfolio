import React from "react"
import { useThemeContext } from "../../ThemeContextProvider"

import "../../CSS/Footer.css"

export default function Footer(props) {
    const { themeState: { titleColor, backgroundColor } } = useThemeContext()
    const currentYear = new Date().getFullYear()

    const style = {
        backgroundColor: titleColor,
        color: backgroundColor
    }

    return (
      <div id="footer" style={ style }>
        <p>&copy; 2019-{ currentYear } Jordan Christensen | All Rights Reserved</p>
      </div>
    )
  }