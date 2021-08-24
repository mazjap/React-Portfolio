import React from "react"

export default function useOnScreen() {
  const [ isIntersecting, setIntersecting ] = React.useState(false)
  const componentReference = React.useRef()

  const observer = new IntersectionObserver(
    ([ entry ]) => setIntersecting(entry.isIntersecting)
  )

  React.useEffect(() => {
    observer.observe(componentReference.current)

    return () => observer.disconnect()
  }, [])

  return [componentReference, isIntersecting]
}