import type { Character, CharactersApiResp } from '../types/Characters.d.ts'

function renameCharacterApiResponse (characterArray: CharactersApiResp[]): Character[] {
  const characters: Character[] = characterArray?.map(character => {
    const id = character.id
    const name = character.name
    const species = character.species
    const image = character.image

    return { id, name, species, image }
  })

  return characters
}

export default renameCharacterApiResponse
