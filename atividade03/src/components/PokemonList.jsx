import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

function PokemonList({ pokemons, favorites, onSelect, onToggleFavorite }) {
  if (pokemons.length === 0) {
    return (
      <div className="empty">
        <img src="/pokeball.svg" alt="" />
        <p>Nenhum Pokémon encontrado :(</p>
      </div>
    )
  }

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          isFavorite={favorites.includes(pokemon.id)}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default PokemonList
