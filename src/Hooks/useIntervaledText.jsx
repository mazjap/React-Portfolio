import React from "react"
import { useEffect, useRef } from 'react'

// Ripped from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// (My method caused memory leaks)
function useInterval(callback, delay) {
    const savedCallback = useRef()
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }

export default function useIntervaledText(initial, duration) {
    const [ currentText, setCurrentText ] = React.useState("")
    const [ desiredText, setDesiredText ] = React.useState(initial ?? "")

    useInterval(() => {
      console.log("hit interval")

        if (currentText !== desiredText) {
            if (desiredText.includes(currentText)) {
                setCurrentText(currentText + desiredText[currentText.length])
            } else {
                setCurrentText(currentText.slice(0, -1))
            }
        }
    }, duration ?? 70)

    return [currentText, setDesiredText]
}