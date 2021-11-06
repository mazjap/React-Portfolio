// Constants
import Constants from "./Hidden"

// CSS
import "./CSS/App.css"
import "./Navigation.css"

// Global Context
import { useThemeContext } from "./ThemeContextProvider"

// Node Modules
import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

// Components & Pages
import NavigationBar from "./Components/Reuseable/NavigationBar"
import Home from "./Pages/Home"
import Projects from "./Pages/Projects"
import ProjectDetail from "./Pages/ProjectDetail"
import Contact from "./Pages/Contact"
import Footer from "./Components/Reuseable/Footer"

export default function App() {
  const { themeState, theme, toggleTheme } = useThemeContext()
  const { backgroundColor, titleColor, textColor } = themeState
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
        backgroundColor={ backgroundColor }
        textColor={ textColor }
        selectedTextColor={ titleColor }
        themeKey={ theme }
        toggleTheme={ toggleTheme }
        />
        <Switch>
          <Route exact path="/contact" render={ () => <Contact /> } />
          <Route exact path="/projects/:projectId" render={ (props) => <ProjectDetail projectId={ props.match.params.projectId } /> } />
          <Route exact path="/projects" render={ () => <Projects /> } />
          <Route path="/" render={ () => <Home /> } />
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}