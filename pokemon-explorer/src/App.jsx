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

  // Fetch Pokémon data on component mount
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

  // Filter Pokémon based on search term and type
  useEffect(() => {
    let filtered = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (filterType !== 'all') {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(typeInfo => typeInfo.type.name === filterType)
      )
    }

    setFilteredPokemonList(filtered)
  }, [searchTerm, filterType, pokemonList])

  function handleRetry() {
    setError(null)
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
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />
  }

  return (
    <div className="app">
      <div className="app-header">
        <img src="/pokemon-logo.png" alt="Pokémon Explorer" className="header-logo" />
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterType={filterType} setFilterType={setFilterType} />
      
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage />}

      <div className="card-grid">
        {filteredPokemonList.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      
    </div>
  )
}

export default App
