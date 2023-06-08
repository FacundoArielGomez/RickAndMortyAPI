import { useState, useRef, useEffect } from 'react'

interface useNearScreenInterface {
  isNearScreen: boolean
  fromRef: React.LegacyRef<HTMLDivElement> | undefined
}

const useNearScreen = ({ once = true }): useNearScreenInterface => {
  const [isNearScreen, setShows] = useState(false)

  const fromRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = fromRef.current

    const onChange = (entries: any, observer: any): void => {
      const el = entries[0]
      if (el.isIntersecting === true) {
        setShows(true)
        once && observer.disconnect()
      } else {
        !once && setShows(false)
      }
    }

    const observer = new IntersectionObserver(onChange, {
      rootMargin: '300px'
    })

    if (element != null) observer.observe(element)

    return () => { observer ? observer.disconnect() : null }
  })
  return { isNearScreen, fromRef }
}

export { useNearScreen }
