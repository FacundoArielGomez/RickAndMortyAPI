import { useState } from 'react'

const useScrollTopDistance = (): { distanceTop: boolean } => {
  const [distanceTop, setDistanceTop] = useState<boolean>(false)

  window.addEventListener('scroll', () => {
    if (!distanceTop && window.scrollY > 400) {
      setDistanceTop(true)
    } else if (distanceTop && window.scrollY <= 400) {
      setDistanceTop(false)
    }
  })

  return { distanceTop }
}

export { useScrollTopDistance }
