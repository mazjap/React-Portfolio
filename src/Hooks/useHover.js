import React from "react"

export default function useHover() {
    const [ isHovering, setIsHovering ] = React.useState(false)
    const componentReference = React.useRef()

    const setHovering = () => setIsHovering(true)
    const setNotHovering = () => setIsHovering(false)

    React.useEffect(() => {
        const node = componentReference.current

        if (node) {
            node.addEventListener("mouseover", setHovering)
            node.addEventListener("mouseout", setNotHovering)

            return () => {
                node.removeEventListener("mouseover", setHovering)
                node.removeEventListener("mouseout", setNotHovering)
            }
        }
    }, [])

    return [componentReference, isHovering]
}