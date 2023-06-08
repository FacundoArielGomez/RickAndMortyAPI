import { type Character } from '../types/Characters'

export function parseLocalStorageFavorites (): Character[] {
  const itemString = localStorage.getItem('favoritesList')
  const itemObject: Character[] = itemString ? JSON.parse(itemString) : null

  return itemObject || null
}
