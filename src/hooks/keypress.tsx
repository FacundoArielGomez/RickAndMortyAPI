import { useState } from 'react'
import debounce from 'just-debounce-it'
const useKeypress = (): boolean => {
  const [keyPress, setKeypress] = useState(false)
  document.addEventListener('keypress', debounce((event: any) => {
    if (event.ctrlKey) {
      if (event.code === 'KeyI') {
        setKeypress(true)
        setTimeout(() => { setKeypress(false) }, 1000)
      }
    } else {
      setKeypress(false)
    }
  }, 100))

  return keyPress
}

export { useKeypress }
