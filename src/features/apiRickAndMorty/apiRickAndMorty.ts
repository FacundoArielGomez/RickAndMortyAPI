import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import renameCharacterApiResponse from '../../services/renameCharacterApiResponse'
import { type PaginationCountCharacters, type extraInfo, type CharactersApiResponse, type errorResponse } from '../../types/Characters'

export const apiRickAndMorty = createApi({
  reducerPath: 'apiRickAndMorty',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  endpoints: builder => ({
    getCharactersByName: builder.query({
      query: (searchAndPage: { search: string, page: number }) => {
        const { search, page } = searchAndPage
        return {
          url: '/character/',
          params: { name: `${search}`, page }
        }
      },
      transformResponse: (response: CharactersApiResponse) => {
        const { results, info } = response
        const extraInfo: extraInfo = info
        const characters = renameCharacterApiResponse(results)
        const paginationCountCharacters: PaginationCountCharacters = { extraInfo, characters }
        return paginationCountCharacters
      },
      transformErrorResponse: (response: { data: { error: string }, status: number }): errorResponse => {
        const error: errorResponse = {
          data: { message: `${response?.data.error}` },
          status: response.status,
          extraInfo: null,
          characters: []
        }
        return error
      }
    })
  })
})

export const { useGetCharactersByNameQuery } = apiRickAndMorty
