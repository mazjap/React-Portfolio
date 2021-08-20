// CSS
import "./App.css"
import "./Navigation.css"

// Components
import Home from "./Components/Home"
import Projects from "./Components/Projects"
import Contact from "./Components/Contact"

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

export default function App() {
  const { themeState : { StartingPanelColor, LandingTextTopColor, TitleColor, TextColor } } = useThemeContext()
  const [navIsOpen, setNavIsOpen] = React.useState(false)

  const tabs = [
    {
      name: "Home",
      link: "/",
      component: Home
    },
    {
      name: "Projects",
      link: "/projects",
      component: Projects
    },
    {
      name: "Contact",
      link: "/contact",
      component: Contact
    }
  ]

  // Body
  return (
    <Router>
      <NavigationBar
      tabs={ tabs }
      isOpen={ navIsOpen }
      toggleIsOpen={ 
        () => {
          setNavIsOpen(!navIsOpen)
        } 
      }
      />
      <div id="app-container">
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
  const { tabs, isOpen, toggleIsOpen } = props
  
  return (
    <header id="app-navigation-bar">
        <div id="menu-toggle">
          <input type="checkbox" defaultChecked={ isOpen } onClick={ () => toggleIsOpen() } />
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav id="top-nav" className={ isOpen ? "open" : "close" } role="navigation">
          <ul id="nav-list">
            { 
              tabs.map(({ name, link }) => <li key={ link }> <Link to={ link } className="nav-link">{ name }</Link></li>)
            }
            <li>
                <p className="nav-link-border unselectable">|</p>
            </li>
            <li>
                <a href="./assets/Jordan Christensen Resume.pdf" className="nav-link">Resume</a>
            </li>
            <li>
                <a href="https://github.com/mazjap/mazjap.github.io" className="nav-link">Source</a>
            </li>
          </ul>
        </nav>
      </header>
  )
}

function Footer(props) {
  return (
    <div>
      
    </div>
  )
}