import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { storeCharacters } from './storeCharactersInfo/storeCharactersInfo'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ChakraProvider>
    <Provider store={storeCharacters}>
        <App />
    </Provider>
    </ChakraProvider>
)
