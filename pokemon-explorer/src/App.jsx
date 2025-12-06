import { useState, useEffect } from 'react'
import { SearchBar } from './components/SearchBar.jsx'
import { LoadingSpinner } from './components/LoadingSpinner.jsx'
import { Card } from './components/Card.jsx'
import { ErrorMessage } from './components/ErrorMessage.jsx'
import { fetchPokemonList, fetchPokemonDetails, fetchBatchDetails } from './services/pokemonApi.js'

function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [filteredPokemonList, setFilteredPokemonList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    fetchPokemonList()
      .then(async (list) => {
        const detailedList = await fetchBatchDetails(list)
        setPokemonList(detailedList)
        setFilteredPokemonList(detailedList)
        setIsLoading(false)
      })
      .catch((err) => {
        setError('Failed to fetch Pokémon data.')
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <h1>Pokémon Explorer</h1>
    </>
  )
}

export default App
