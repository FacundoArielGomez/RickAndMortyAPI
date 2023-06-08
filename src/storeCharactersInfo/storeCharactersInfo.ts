import { configureStore } from '@reduxjs/toolkit'
import charactersReducers from '../features/CharactersInfo/characterInfo'
import favoritesReducers from '../features/favorites/favorites'
import { persistanceFavoritesLS } from '../features/favorites/middlewaresFavorites'
import { apiRickAndMorty } from '../features/apiRickAndMorty/apiRickAndMorty'

export const storeCharacters = configureStore({
  reducer:
    {
      charactersInfo: charactersReducers,
      favorites: favoritesReducers,
      [apiRickAndMorty.reducerPath]: apiRickAndMorty.reducer
    },
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(apiRickAndMorty.middleware).concat(persistanceFavoritesLS)
})

export type RootState = ReturnType<typeof storeCharacters.getState>
export type AppDispatch = typeof storeCharacters.dispatch
