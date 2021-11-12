import { useContext, createContext, useState, useEffect } from "react"

const Themes = {
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
        buttonColor: "#8d6a4a",
        buttonSecondaryColor: "#a17b56",
        titleColor: "#65aacc",
        titleSecondaryColor: "#4488aa",
        textColor: "#99aacc"
    }
}
  
export const ThemeContext = createContext({})

export const useThemeContext = () => {
    return useContext(ThemeContext)
}
  
const ThemeContextProvider = ({ children }) => {
    const [ themeKey, setThemeKey ] = useState(localStorage.getItem("theme") ?? "light")

    const setBodyBackground = (color) => {
        // Using anti-pattern to set body's background color
        document.body.style.backgroundColor = color;
    }

    const setTheme = value => {
        const theme = Themes[value]

        if (theme) {
            localStorage.setItem("theme", value)
            setThemeKey(value)
            setBodyBackground(theme.backgroundColor)
        }
    }

    setBodyBackground(Themes[themeKey].backgroundColor)

    return (
        <ThemeContext.Provider value={{
            themeState: Themes[themeKey],
            theme: themeKey,
            setTheme,
            setThemeFromEvent: event => {
                const { target: { value } } = event

                setTheme(value)
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