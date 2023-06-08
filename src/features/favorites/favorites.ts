import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Character } from '../../types/Characters'
import { parseLocalStorageFavorites } from '../../services/parseLocalStrorageByName'

const favoritesInitialState: Character[] = []

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: favoritesInitialState,
  reducers: {
    addToFavorites (state, action: PayloadAction<Character>) {
      const favoritesObj = parseLocalStorageFavorites()

      if (favoritesObj !== (undefined ?? null)) {
        const newState = favoritesObj
        return newState
      } else {
        const newState = state.concat([{ ...action.payload }])
        return newState
      }
    },
    removeFromFavorites (state, action: PayloadAction<number>) {
      const newState = state.filter(character => character.id !== action.payload)
      return newState
    }
  }
})

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer
