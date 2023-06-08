import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Character, PaginationCountCharacters, extraInfo, initialCharactersStateInterface } from '../../types/Characters'

const initialCharactersState: initialCharactersStateInterface =
    {
      extraInfo: null,
      characters: []
    }

export const charactersInfoStoreSlice = createSlice({
  name: 'charactersInfo',
  initialState: initialCharactersState,
  reducers: {
    searchCharacterByName (state, action: PayloadAction<PaginationCountCharacters>) {
      state = { extraInfo: action.payload.extraInfo, characters: action.payload.characters }
      return state
    },
    concatNextPage (state, action: PayloadAction<Character[]>) {
      const newState = {
        extraInfo: state.extraInfo,
        characters: state.characters?.concat(action.payload)
      }
      return newState
    },
    updateExtraInfo (state, action: PayloadAction<extraInfo>) {
      const newState = {
        extraInfo: action.payload,
        characters: state.characters
      }
      return newState
    },
    cleanCharactersArray (state) {
      const newState = {
        extraInfo: null,
        characters: []
      }
      return newState
    }
  }
})

export const { searchCharacterByName, concatNextPage, updateExtraInfo, cleanCharactersArray } = charactersInfoStoreSlice.actions

export default charactersInfoStoreSlice.reducer
