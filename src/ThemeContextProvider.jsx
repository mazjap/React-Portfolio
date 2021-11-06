import { useContext, createContext, useState, useEffect } from "react"

export const getInitialThemes = () => {
    const existingThemes = localStorage.getItem("currentThemes")
    // If themes are already set, use those values, otherwise use default value
    return existingThemes ? JSON.parse(existingThemes) : {
        light: {
            backgroundColor: "#3565ad",
            buttonColor: "#f4b95c",
            buttonSecondaryColor: "#f7ce88",
            titleColor: "#0b2042",
            titleSecondaryColor: "#3b4b62",
            textColor: "#0b2042"
        },
        dark: {
            backgroundColor: "#1f2c3d",
            buttonColor: "#5d4a2a",
            buttonSecondaryColor: "#715b36",
            titleColor: "#65aacc",
            titleSecondaryColor: "#4488aa",
            textColor: "#99aacc"
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

    setBodyBackground(themes[themeKey].backgroundColor)

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