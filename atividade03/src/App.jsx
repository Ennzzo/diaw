import { useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import SortSelect from './components/SortSelect'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import TrainerList from './components/TrainerList'
import './css/App.css'

// so mostra no filtro os tipos que algum pokemon realmente tem
const usedTypes = data.types.filter((type) =>
  data.pokemon.some((p) => p.types.some((t) => t.id === type.id))
)

function App() {
  const [page, setPage] = useState('pokedex')
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('id')
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

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'id') return a.id - b.id
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return b.stats[sortBy] - a.stats[sortBy]
  })

  function randomPokemon() {
    const index = Math.floor(Math.random() * data.pokemon.length)
    setSelectedPokemon(data.pokemon[index])
  }

  return (
    <>
      <Header page={page} onChangePage={setPage} />
      <main className="container">
        {page === 'pokedex' ? (
          <>
            <SearchBar value={search} onChange={setSearch} />
            <TypeFilter types={usedTypes} selected={selectedType} onSelect={setSelectedType} />
            <div className="toolbar">
              <p className="result-count">{sorted.length} Pokémon encontrados</p>
              <div className="toolbar-actions">
                <label>
                  Ordenar por <SortSelect value={sortBy} onChange={setSortBy} />
                </label>
                <button className="random-btn" onClick={randomPokemon}>🎲 Aleatório</button>
              </div>
            </div>
            <PokemonList pokemons={sorted} onSelect={setSelectedPokemon} />
          </>
        ) : (
          <>
            <h2 className="page-title">Treinadores</h2>
            <TrainerList
              trainers={data.trainers}
              allPokemons={data.pokemon}
              onSelectPokemon={setSelectedPokemon}
            />
          </>
        )}
      </main>

      {selectedPokemon && (
        <PokemonDetails pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </>
  )
}

export default App
