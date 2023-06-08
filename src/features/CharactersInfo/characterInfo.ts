import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Character, PaginationCountCharacters, extraInfo } from '../../types/Characters'

const initialCharactersState: PaginationCountCharacters =
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
      state = {
        extraInfo: state.extraInfo,
        characters: state.characters.concat(action.payload)
      }
      return state
    },
    updateExtraInfo (state, action: PayloadAction<extraInfo | null>) {
      state = {
        extraInfo: action.payload,
        characters: state.characters
      }
      return state
    },
    cleanCharactersArray () {
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
