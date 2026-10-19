import TypeBadge from './TypeBadge'
import { typeColors, getImage, formatId } from '../utils/pokemon'
import '../css/PokemonCard.css'

function PokemonCard({ pokemon, isFavorite, onSelect, onToggleFavorite }) {
  const mainColor = typeColors[pokemon.types[0].name]

  return (
    <div className="pokemon-card" style={{ borderTopColor: mainColor }} onClick={() => onSelect(pokemon)}>
      <span className="pokemon-id">{formatId(pokemon.id)}</span>
      <button
        className={'fav-btn' + (isFavorite ? ' active' : '')}
        onClick={(e) => {
          e.stopPropagation()
          onToggleFavorite(pokemon.id)
        }}
      >
        {isFavorite ? '❤' : '♡'}
      </button>
      <div className="pokemon-img" style={{ background: mainColor + '33' }}>
        <img src={getImage(pokemon.id)} alt={pokemon.name} loading="lazy" />
      </div>
      <h3>{pokemon.name}</h3>
      <div className="types">
        {pokemon.types.map((t) => (
          <TypeBadge key={t.id} type={t.name} />
        ))}
      </div>
      <div className="mini-stats">
        <span>HP <b>{pokemon.stats.hp}</b></span>
        <span>ATK <b>{pokemon.stats.attack}</b></span>
        <span>DEF <b>{pokemon.stats.defense}</b></span>
        <span>SP.ATK <b>{pokemon.stats.specialAttack}</b></span>
        <span>SP.DEF <b>{pokemon.stats.specialDefense}</b></span>
        <span>SPD <b>{pokemon.stats.speed}</b></span>
      </div>
    </div>
  )
}

export default PokemonCard
