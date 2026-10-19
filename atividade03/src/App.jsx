import { useEffect, useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import SortSelect from './components/SortSelect'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import TrainerList from './components/TrainerList'
import './css/App.css'

// o Mew vem sem tipo no json, entao recebe o Typeless
const typeless = data.types.find((t) => t.id === 0)
const allPokemons = data.pokemon.map((p) =>
  p.types.length > 0 ? p : { ...p, types: [typeless] }
)

// so mostra no filtro os tipos que algum pokemon realmente tem
const usedTypes = data.types.filter((type) =>
  allPokemons.some((p) => p.types.some((t) => t.id === type.id))
)

function App() {
  const [page, setPage] = useState('pokedex')
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('id')
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((f) => f !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const filtered = allPokemons.filter((p) => {
    const term = search.trim().toLowerCase()
    const matchSearch =
      term === '' ||
      p.name.toLowerCase().includes(term) ||
      String(p.id) === term.replace('#', '').replace(/^0+/, '')
    const matchType = selectedType === '' || p.types.some((t) => t.name === selectedType)
    const matchFavorite = !onlyFavorites || favorites.includes(p.id)
    return matchSearch && matchType && matchFavorite
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'id') return a.id - b.id
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return b.stats[sortBy] - a.stats[sortBy]
  })

  function randomPokemon() {
    const index = Math.floor(Math.random() * allPokemons.length)
    setSelectedPokemon(allPokemons[index])
  }

  return (
    <>
      <Header
        page={page}
        onChangePage={setPage}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />
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
                <button
                  className={'fav-filter-btn' + (onlyFavorites ? ' active' : '')}
                  onClick={() => setOnlyFavorites(!onlyFavorites)}
                >
                  ❤ Favoritos ({favorites.length})
                </button>
                <button className="random-btn" onClick={randomPokemon}>🎲 Aleatório</button>
              </div>
            </div>
            <PokemonList
              pokemons={sorted}
              favorites={favorites}
              onSelect={setSelectedPokemon}
              onToggleFavorite={toggleFavorite}
            />
          </>
        ) : (
          <>
            <h2 className="page-title">Treinadores</h2>
            <TrainerList
              trainers={data.trainers}
              allPokemons={allPokemons}
              onSelectPokemon={setSelectedPokemon}
            />
          </>
        )}
      </main>

      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          isFavorite={favorites.includes(selectedPokemon.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </>
  )
}

export default App
