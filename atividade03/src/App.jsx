import data from './data/pokedex-data.json'
import PokemonList from './components/PokemonList'

function App() {
  return (
    <div>
      <h1>Pokédex</h1>
      <PokemonList pokemons={data.pokemon} />
    </div>
  )
}

export default App
