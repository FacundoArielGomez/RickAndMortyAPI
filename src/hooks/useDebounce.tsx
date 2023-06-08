import { useEffect, useState } from 'react'

const useDebounce = (search: string, delay: number): string => {
  const [debouncedSearch, setDebounceSearch] = useState(search ?? '')

  useEffect(() => {
    const HandlerTime = setTimeout(() => {
      setDebounceSearch(search)
    }, delay)

    return () => { clearTimeout(HandlerTime) }
  }, [search, delay])

  return debouncedSearch
}

export { useDebounce }
