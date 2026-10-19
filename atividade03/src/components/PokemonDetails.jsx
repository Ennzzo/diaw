import { useEffect } from 'react'
import TypeBadge from './TypeBadge'
import StatBar from './StatBar'
import { typeColors, getImage, formatId } from '../utils/pokemon'
import '../css/PokemonDetails.css'

function PokemonDetails({ pokemon, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const color = typeColors[pokemon.types[0].name]
  const { stats } = pokemon
  const total = Object.values(stats).reduce((acc, v) => acc + v, 0)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="modal-top" style={{ background: `linear-gradient(135deg, ${color}, ${color}aa)` }}>
          <span className="modal-id">{formatId(pokemon.id)}</span>
          <img src={getImage(pokemon.id)} alt={pokemon.name} />
        </div>

        <div className="modal-body">
          <h2>{pokemon.name}</h2>
          <div className="types">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.id} type={t.name} />
            ))}
          </div>

          <h4>Atributos</h4>
          <StatBar label="HP" value={stats.hp} color={color} />
          <StatBar label="Ataque" value={stats.attack} color={color} />
          <StatBar label="Defesa" value={stats.defense} color={color} />
          <StatBar label="Atq. Especial" value={stats.specialAttack} color={color} />
          <StatBar label="Def. Especial" value={stats.specialDefense} color={color} />
          <StatBar label="Velocidade" value={stats.speed} color={color} />
          <p className="total">Total: <b>{total}</b></p>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails
