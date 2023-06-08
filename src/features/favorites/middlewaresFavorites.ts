import { type Middleware } from 'redux'
import { parseLocalStorageFavorites } from '../../services/parseLocalStrorageByName'

const persistanceFavoritesLS: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action

  if (action.type === 'favorites/addToFavorites') {
    const favoritesLS = parseLocalStorageFavorites()
    const isAlreadyListed = favoritesLS?.find(character => character.id === action.payload.id)
    if (isAlreadyListed !== undefined) return
  }

  next(action)

  if (type === 'favorites/addToFavorites') {
    const existPrevfavoritesInLS = parseLocalStorageFavorites()
    if (existPrevfavoritesInLS !== null) {
      const newFavoritesLS = existPrevfavoritesInLS.concat(payload)
      localStorage.setItem('favoritesList', JSON.stringify(newFavoritesLS))
    } else {
      localStorage.setItem('favoritesList', JSON.stringify(store.getState().favorites))
    }
  }

  if (type === 'favorites/removeFromFavorites') {
    const favoritesLS = parseLocalStorageFavorites()
    if (favoritesLS !== null) {
      localStorage.setItem('favoritesList', JSON.stringify(favoritesLS.filter(character => character.id !== payload)))
    }
  }
}

export { persistanceFavoritesLS }
