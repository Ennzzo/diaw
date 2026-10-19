import { useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import PokemonList from './components/PokemonList'
import './css/App.css'

function App() {
  const [search, setSearch] = useState('')

  const filtered = data.pokemon.filter((p) => {
    const term = search.trim().toLowerCase()
    if (term === '') return true
    return p.name.toLowerCase().includes(term) || String(p.id) === term.replace('#', '').replace(/^0+/, '')
  })

  return (
    <>
      <Header />
      <main className="container">
        <SearchBar value={search} onChange={setSearch} />
        <p className="result-count">{filtered.length} Pokémon encontrados</p>
        <PokemonList pokemons={filtered} />
      </main>
    </>
  )
}

export default App
