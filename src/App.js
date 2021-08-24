// Constants
import Constants from "./Hidden"

// CSS
import "./App.css"
import "./Navigation.css"

// Global Context
import { useThemeContext } from "./ThemeContextProvider"

// Node Modules
import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

// Custom Hooks
import useHover from "./Hooks/useHover"

export default function App() {
  const { themeState, theme, toggleTheme } = useThemeContext()
  const { StartingPanelColor, TitleColor, TextColor } = themeState
  const [ navIsOpen, setNavIsOpen ] = React.useState(false)
  const tabs = Constants.tabs

  // Body
  return (
    <Router>
      <div id="app-container">
      <NavigationBar
      tabs={ tabs }
      isOpen={ navIsOpen }
      toggleIsOpen={
        () => {
          setNavIsOpen(!navIsOpen)
        }
      }
      backgroundColor={ StartingPanelColor }
      textColor={ TextColor }
      selectedTextColor={ TitleColor }
      themeKey={ theme }
      toggleTheme={ toggleTheme }
      />
        <Switch>
          {
            tabs.map((item, index) => tabs[tabs.length - 1 - index]).map(({ link, component }) => {
              return (
                <Route path={ link } key={ link }>
                  { component }
                </Route>
              )
            })
          }
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

function NavigationBar(props) {
  const { tabs, isOpen, toggleIsOpen, backgroundColor, textColor, selectedTextColor, themeKey, toggleTheme } = props
  const [ resumeRef, isHoveringOverResume ] = useHover()
  const [ sourceRef, isHoveringOverSource ] = useHover()
  const [ themeRef, isHoveringOverTheme ] = useHover()

  function ListItem(props) {
    const { name, link } = props
    const [ ref, isHovering ] = useHover()

    return (
      <li key={ link }>
        <Link
          ref={ ref }
          to={ link }
          className="nav-link"
          style={
            {
              color: isHovering ? selectedTextColor : textColor
            }
          }>
          { name }
        </Link>
      </li>
    )
  }

  const defaultStyle = (transform) => {
    return {
      opacity: 1,
      backgroundColor: isOpen ? textColor : selectedTextColor,
      color: isOpen ? textColor : selectedTextColor,
      transform: isOpen ? transform ?? "rotate(45deg) translate(5px, 0)" : "none",
      boxShadow: isOpen ? "none" : "1.5px 1.5px 1px 1px rgba(0, 0, 0, .3)",
    }
  }

  const styles = {
    firstSpanStyle: defaultStyle(),
    middleSpanStyle: {
      ...defaultStyle("rotate(0deg) scale(0.1, 0.1)"),
      opacity: isOpen ? 0 : 1
    },
    lastSpanStyle: defaultStyle("rotate(-45deg)"),
    imageStyle: {
      fill: backgroundColor,
      stroke: themeKey == "light" ? "black" : "white"
    }
  }

  return (
    <header id="app-navigation-bar">
        <div id="menu-toggle">
          <input type="checkbox" defaultChecked={ isOpen } onClick={ toggleIsOpen } />
          
          <div className="flex-container" >
            <span style={ styles.firstSpanStyle } />
            <span
            style={ styles.middleSpanStyle } />
            <span
            style={ styles.lastSpanStyle } />
          </div>
        </div>
        <nav 
         id="top-nav" 
         className={ isOpen ? "open" : "close" } 
         role="navigation"
         style={{
           backgroundColor: backgroundColor,
           color: textColor
         }}>

          <ul id="nav-list">
            {
              tabs.map(ListItem)
            }
            <li>
                <p className="nav-link-border unselectable">|</p>
            </li>
            <li>
                <a
                  href="./assets/Jordan Christensen Resume.pdf" 
                  className="nav-link"
                  ref={ resumeRef }
                  style={
                    {
                      color: isHoveringOverResume ? selectedTextColor : textColor
                    }
                  }>
                Resume
                </a>
            </li>
            <li>
                <a
                  href={ Constants.sourceUrl }
                  className="nav-link"
                  ref={ sourceRef }
                  style={
                    {
                      color: isHoveringOverSource ? selectedTextColor : textColor
                    }
                  }>
                Source
                </a>
            </li>
            <li>
              <button
              ref={ themeRef }
              onClick={ toggleTheme }
              style={
                {
                  backgroundColor: backgroundColor,
                  border: "none",
                  width: "30px",
                  transition: "500ms",
                  cursor: "pointer"
                }
              }>
                <ThemeImage 
                fillColor={ backgroundColor } 
                strokeColor={ textColor } 
                themeKey={ themeKey } />
              </button>
            </li>
          </ul>
        </nav>
      </header>
  )
}

function Footer(props) {
  return (
    <div className="footer">
      <p></p>
    </div>
  )
}

function ThemeImage(props) {
  const { themeKey, fillColor, strokeColor } = props

  const style = {
    fill: fillColor,
    stroke: strokeColor,
    strokeLinejoin: "round",
    strokeLinecap: "round",
    strokeWidth: "1px",
    transition: "500ms"
  }

  let image

  switch (themeKey) {
    // Custom made :)
    case "light":
      image = (
        <>
          <circle cx="16" cy="16" r="8" />
          <path 
          strokeWidth="1.25px"
          d="
            M 16,1 L 16,6
            M 23,9 L 25.23,6.77
            M 26,16 L 31,16
            M 23,23 L 25.23,25.23
            M 16,26 L 16,31
            M 9,23 L 6.77,25.23
            M 1,16 L 6,16
            M 9,9 L 6.77,6.77
          " />
        </>
      )
      break
    default:
      image = (
        <path 
        transform="rotate(-20, 20, 20)"
        d="
          M 24,3 
          C 0,1 0,31 24,29
            10,19 10,13 24,3
        " />
      )
      break
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <g style={ style }>
        { image }
      </g>
    </svg>
  )
}