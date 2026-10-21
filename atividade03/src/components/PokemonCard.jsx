import TypeBadge from './TypeBadge'
import { typeColors, getImage, formatId } from '../utils/pokemon'
import '../css/PokemonCard.css'

function PokemonCard({
  pokemon,
  isFavorite = false,
  isCompared = false,
  onSelect = () => {},
  onToggleFavorite = () => {},
  onToggleCompare = () => {}
}) {
  if (!pokemon) return null

  const firstType = pokemon.types && pokemon.types[0] ? pokemon.types[0].name : 'Normal'
  const mainColor = typeColors[firstType] || '#A8A878'

  return (
    <div className="pokemon-card" style={{ borderTopColor: mainColor }} onClick={() => onSelect(pokemon)}>
      <span className="pokemon-id">{formatId(pokemon.id)}</span>
      
      <div className="card-actions">
        <button
          type="button"
          className={'compare-btn' + (isCompared ? ' active' : '')}
          title="Comparar Pokémon"
          onClick={(e) => {
            e.stopPropagation() // Impede de abrir os detalhes do card
            onToggleCompare(pokemon)
          }}
        >
          ⚔️
        </button>

        <button
          type="button"
          className={'fav-btn' + (isFavorite ? ' active' : '')}
          title="Favoritar"
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(pokemon.id)
          }}
        >
          {isFavorite ? '❤' : '♡'}
        </button>
      </div>

      <div className="pokemon-img" style={{ background: mainColor + '33' }}>
        <img src={getImage(pokemon.id)} alt={pokemon.name} loading="lazy" />
      </div>

      <h3>{pokemon.name}</h3>

      <div className="types">
        {pokemon.types && pokemon.types.map((t) => (
          <TypeBadge key={t.id || t.name} type={t.name} />
        ))}
      </div>

      <div className="mini-stats">
        <span>HP <b>{pokemon.stats?.hp || 0}</b></span>
        <span>ATK <b>{pokemon.stats?.attack || 0}</b></span>
        <span>DEF <b>{pokemon.stats?.defense || 0}</b></span>
        <span>SP.ATK <b>{pokemon.stats?.specialAttack || 0}</b></span>
        <span>SP.DEF <b>{pokemon.stats?.specialDefense || 0}</b></span>
        <span>SPD <b>{pokemon.stats?.speed || 0}</b></span>
      </div>
    </div>
  )
}

export default PokemonCard

