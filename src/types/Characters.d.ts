export interface Character { id: number, name: string, species: string, image: string }

export interface CharactersApiResponse {
  info: {
    count: number
    pages: number
    next: string
    prev: string | null
  }
  results: CharactersApiResp[]
}

export interface CharactersApiResp {
  id: number
  name: string
  species: string
  status: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface extraInfo {
  count: number
  next: string
  pages: number
  prev: string | null
}

export interface PaginationCountCharacters {
  extraInfo: extraInfo | null
  characters: Character[] | null
}

export interface initialCharactersStateInterface {
  extraInfo: extraInfo | null
  characters: Character[] | null
}
