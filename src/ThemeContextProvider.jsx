import { useContext, createContext, useState, useEffect } from "react"

export const getInitialThemes = () => {
    const existingThemes = localStorage.getItem("currentThemes")
    // If themes are already set, use those values, otherwise use default value
    return existingThemes ? JSON.parse(existingThemes) : {
        light: {
            StartingPanelColor: "#ececec",
            LandingTextTopColor: "#a1a1a1",
            TitleColor: "#666666",
            TextColor: "#000000"
        },
        dark: {
            StartingPanelColor: "#3f3f3f",
            LandingTextTopColor: "#ececec",
            TitleColor: "#999999",
            TextColor: "#ffffff"
        },
        custom: {}
    }
}
  
export const ThemeContext = createContext({})

export const useThemeContext = () => {
    return useContext(ThemeContext)
}
  
const ThemeContextProvider = ({ children }) => {
    const [ themeKey, setTheme ] = useState(localStorage.getItem("theme") ?? "dark")
    const [ themes, setThemes ] = useState(getInitialThemes())
    useEffect(() => {
        setThemes(getInitialThemes())
    }, [themeKey])

    const setBodyBackground = (color) => {
        // Using anti-pattern to set body's background color
        document.body.style.backgroundColor = color;
    }

    setBodyBackground(themes[themeKey].StartingPanelColor)

    return (
        <ThemeContext.Provider value={{
            themeState: themes[themeKey],
            theme: themeKey,
            setTheme: value => {},
            setThemeFromEvent: event => {
                const { target: { value } } = event

                if (themes[value]) {
                    localStorage.setItem("theme", value)
                    setTheme(value)
                    setBodyBackground(themes[value].BottomGradientColor)
                }
            },
            updateTheme: (event) => {
                const { name, value } = event.target
                const newThemes = { ...themes }
                newThemes[themeKey][name] = value
                
                localStorage.setItem("currentThemes", JSON.stringify(newThemes))
                setThemes(getInitialThemes())
                setBodyBackground(newThemes.BottomGradientColor)
            },
            toggleTheme: () => {
                switch (themeKey) {
                case "light":
                    setTheme("dark")
                    break
                default:
                    setTheme("light")
                    break
                }
            }
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider