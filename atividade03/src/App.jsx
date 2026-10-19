import { useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import './css/App.css'

// so mostra no filtro os tipos que algum pokemon realmente tem
const usedTypes = data.types.filter((type) =>
  data.pokemon.some((p) => p.types.some((t) => t.id === type.id))
)

function App() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  const filtered = data.pokemon.filter((p) => {
    const term = search.trim().toLowerCase()
    const matchSearch =
      term === '' ||
      p.name.toLowerCase().includes(term) ||
      String(p.id) === term.replace('#', '').replace(/^0+/, '')
    const matchType = selectedType === '' || p.types.some((t) => t.name === selectedType)
    return matchSearch && matchType
  })

  return (
    <>
      <Header />
      <main className="container">
        <SearchBar value={search} onChange={setSearch} />
        <TypeFilter types={usedTypes} selected={selectedType} onSelect={setSelectedType} />
        <p className="result-count">{filtered.length} Pokémon encontrados</p>
        <PokemonList pokemons={filtered} onSelect={setSelectedPokemon} />
      </main>

      {selectedPokemon && (
        <PokemonDetails pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </>
  )
}

export default App
