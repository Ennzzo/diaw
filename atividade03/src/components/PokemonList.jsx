import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

function PokemonList({
  pokemons,
  favorites,
  compareList = [],
  onSelect,
  onToggleFavorite,
  onToggleCompare
}) {
  if (!pokemons || pokemons.length === 0) {
    return (
      <div className="empty">
        <img src="/pokeball.svg" alt="Pokébola" />
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
          isCompared={compareList.some((p) => p.id === pokemon.id)}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
          onToggleCompare={onToggleCompare}
        />
      ))}
    </div>
  )
}

export default PokemonList