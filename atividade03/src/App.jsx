import data from './data/pokedex-data.json'
import Header from './components/Header'
import PokemonList from './components/PokemonList'
import './css/App.css'

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <PokemonList pokemons={data.pokemon} />
      </main>
    </>
  )
}

export default App
