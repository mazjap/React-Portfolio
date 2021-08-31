import React from "react"
import { useEffect } from "react"

export default function useInterval(initial, duration) {
    const [ currentText, setCurrentText ] = React.useState("")
    const [ desiredText, setDesiredText ] = React.useState(initial ?? "")
    const [ isCurrentTextCancelled, setCurrentTextCancelled ] = React.useState(false)

    const setText = (value) => {
        if (currentText !== desiredText) {
            setCurrentTextCancelled(true)
        }
        setDesiredText(value)
    }

    useEffect(() => {
        if (currentText !== desiredText) {
            let newText
            if (desiredText.includes(currentText)) {
                if (!isCurrentTextCancelled) {
                    setTimeout(() => {
                        setCurrentText(currentText + desiredText[currentText.length])
                    }, duration ?? Math.random() * 75 + 50) // Between 50 and 125 ms for 'typing' speed
                }
                setCurrentTextCancelled(false)
            } else {
                if (!isCurrentTextCancelled) {
                    setTimeout(() => {
                        setCurrentText(currentText.slice(0, -1))
                    }, duration ?? Math.random() * 25 + 25) // Between 25 and 50 ms for erasing speed
                }
                setCurrentTextCancelled(false)
            }
        }

        return () => console.log("UseInterval hook unmounted")
    }, [desiredText, currentText, setCurrentText])

    return [currentText, setText]
}