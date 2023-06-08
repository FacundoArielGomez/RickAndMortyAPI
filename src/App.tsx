import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { searchCharacterByName, concatNextPage, cleanCharactersArray, updateExtraInfo } from './features/CharactersInfo/characterInfo'
import './App.css'
import { addToFavorites } from './features/favorites/favorites'
import Favorites from './pages/favorites/Favorites'
import { useNearScreen } from './hooks/useNearScreen'
import { useScrollTopDistance } from './hooks/useScrollTopDistance'
import { useKeypress } from './hooks/keypress'
import { useGetCharactersByNameQuery } from './features/apiRickAndMorty/apiRickAndMorty'
import { useDebounce } from './hooks/useDebounce'
import { Input, Box, FormControl, FormLabel, Button, Text, Image, Tag, TagLabel, TagRightIcon, Fade, Spinner, Flex, InputGroup, Kbd, InputRightAddon, useMediaQuery } from '@chakra-ui/react'
import { ArrowUpIcon, StarIcon } from '@chakra-ui/icons'

function App (): React.ReactElement {
  const dispatch = useAppDispatch()

  const { characters, extraInfo } = useAppSelector(state => state.charactersInfo)

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const [page, setPage] = useState(1)
  const [charactersListPage, setCharactersListPage] = useState(true)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => { setSearch(e.target.value) }
  const { data, isLoading, isFetching, error } = useGetCharactersByNameQuery({ search: debouncedSearch, page })

  useEffect(() => {
    if (search === '') return
    setPage(1)
    dispatch(cleanCharactersArray())
  }, [search])

  useEffect(() => {
    if (data === undefined) return
    if (error !== undefined) return
    if (page > 1) {
      dispatch(concatNextPage(data?.characters))
      dispatch(updateExtraInfo(data.extraInfo))
    } else {
      dispatch(searchCharacterByName(data))
      dispatch(updateExtraInfo(data.extraInfo))
    }
  }, [data, error])

  const { fromRef, isNearScreen } = useNearScreen({ once: false })

  useEffect(() => {
    if (!charactersListPage) return
    if (!isNearScreen) return
    if (extraInfo?.next === null) return
    if (error !== undefined) return
    setPage(prevPage => prevPage + 1)
  }, [isNearScreen])

  const [isLargerThan640] = useMediaQuery('(min-width: 640px)')

  const { distanceTop } = useScrollTopDistance()

  const mainInput = document.getElementById('mainInput')
  const controlK = useKeypress()
  if (controlK) {
    mainInput?.focus()
  }

  return (
    <Box bg='gray.900'>
      <Box as='header' pt={['.3rem']} mb={['1.5rem']}>
        <FormControl className='mainSearchInput' flexDir={['column', 'column', 'row']} justifyContent={['center']} paddingTop={['2.5rem']} mb={['3rem']}>
          <FormLabel as='label' aria-label='introduce here a character that you want to see' textAlign={'center'} w={['100%', '100%', '15rem']} h={['auto', 'auto', '100%']} display={'flex'} justifyContent='center' alignItems='center'><Text fontSize={['1.2rem']} as='samp' color='white'>Search a Character</Text></FormLabel>
          <InputGroup display='flex' justifyContent={'center'} alignItems={'center'} w={['100%', '100%', '50rem']}>
          <Input
            name='searchCharacter'
            id='mainInput'
            type='text'
            placeholder='Rick, Beth, Morty, Jerry'
            autoFocus
            onChange={(e) => { handleInput(e) }}
            w={['70%', '70%', '90%']}
            size='lg'
            fontFamily={'samp'}
            fontSize={['1.3rem']}
            variant='filled'
            _focus={{ color: 'white' }}
            ></Input>
            {isLargerThan640 ? <InputRightAddon bg='white' fontSize={['1.3rem']} h='3rem' paddingX={'0'}><Kbd>control</Kbd>+<Kbd>i</Kbd></InputRightAddon> : null}
            </InputGroup>
        </FormControl>
        <Box mt={['.5rem']}className='favoriteAndCharacter' aria-label='2 buttons, searched characters and favorites'>
          <Button size={['md']} colorScheme='teal' variant='outline' w={['7rem']} onClick={() => { setCharactersListPage(prevState => !prevState) }}>Characters</Button>
          <Button size={['md']} colorScheme='teal' variant='outline' w={['7rem']} onClick={() => { setCharactersListPage(prevState => !prevState) }}>favorites</Button>
        </Box>
      </Box>
      <Box as='main'>
        { charactersListPage
          ? <Box aria-label='Group of characters' className='characters' mt={['0px', '0px', '4em']}>
              {(error !== undefined) ? <Flex w='100%' h='400px' alignItems='center' justifyContent='center'><Text as='samp' color={'white'}>There is nothing here</Text></Flex> : null}
              {isLoading ? <Spinner color='red.500' size='xl' /> : null}
              {characters?.map(character => {
                return (
                  <Box as='article' key={character.id} mb={['2.4rem', '5rem']} mt={['.5rem']} className='character'>
                    <Text fontSize={['2xl']} as='kbd' my={['0.5rem']} w={['140%', '15rem']} color='white'>{character.name}</Text>
                    <Image borderRadius='full' src={character.image} height='200px' width='200px' alt={character.name}></Image>
                    <Text as='kbd' mt={['.5rem']} color='white'>{character.species}</Text>
                    <Tag as='button' size='lg' mt={['.2rem']} onClick={() => dispatch(addToFavorites(character))}>
                      <TagLabel fontSize={['md']}>Add to favorite</TagLabel>
                      <TagRightIcon as={StarIcon}></TagRightIcon>
                    </Tag>
                  </Box>
                )
              })}
            </Box>
          : <Favorites/>
        }
        <Flex justifyContent={'center'} alignItems={'center'}>{isFetching ? <Spinner color='red.500' size='xl' /> : null}</Flex>
        <div ref={fromRef}></div>
        {(extraInfo?.next === null) ? <Flex justifyContent={'center'} alignItems={'center'} pb={['2rem']}><Text as='samp' color={'white'}>There are no more characters to show</Text></Flex> : null }

      </Box>
      <Fade in={distanceTop}>
        <Tag position='fixed' bottom='5'right='5' size='lg' variant='solid' colorScheme='teal' cursor='pointer' onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <ArrowUpIcon />
        </Tag>
      </Fade>
    </Box>
  )
}

export default App
