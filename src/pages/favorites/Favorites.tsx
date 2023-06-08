import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { removeFromFavorites } from '../../features/favorites/favorites'
import { type Character } from '../../types/Characters'
import { parseLocalStorageFavorites } from '../../services/parseLocalStrorageByName'
import { Box, Image, Text, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react'

const Favorites: React.FC = () => {
  const favoritesFromState = useAppSelector((state) => state.favorites)
  const dispatch = useAppDispatch()

  const favoritesLS = parseLocalStorageFavorites()
  const favoritesToRender: Character[] = favoritesLS || favoritesFromState

  return (
    <div aria-label='Group of characters' className='characters'>
            {favoritesToRender?.map(character => {
              return (
                    <Box mb={['2.4rem', '5rem']} mt={['.5rem']} as='article' key={character.id} className='character' >
                        <Text fontSize={['2xl']} as='kbd' my={['0.5rem']} w={['100vh', '20rem']}>{character.name}</Text>
                        <Image borderRadius='full' src={character.image} height='200px' width='200px'></Image>
                        <Text as='kbd' mt={['.5rem']}>{character.species}</Text>
                        <Tag size='lg' cursor='pointer' mt={['.5rem']} onClick={() => dispatch(removeFromFavorites(character.id))}>
                          <TagLabel fontSize={['md']}>Delete</TagLabel>
                          <TagCloseButton />
                        </Tag>
                    </Box>
              )
            })}
    </div>
  )
}

export default Favorites
