import { useEffect, useState } from 'react'
import TypeBadge from './TypeBadge'
import StatBar from './StatBar'
import { typeColors, getImage, formatId } from '../utils/pokemon'
import '../css/PokemonDetails.css'

function PokemonDetails({ pokemon, onClose }) {
  const [extra, setExtra] = useState(null)
  const [loading, setLoading] = useState(true)

  // busca altura, peso e habilidades na PokéAPI
  useEffect(() => {
    setLoading(true)
    setExtra(null)
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
      .then((res) => res.json())
      .then((json) => setExtra(json))
      .catch(() => setExtra(null))
      .finally(() => setLoading(false))
  }, [pokemon.id])

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

          {loading && <p className="info-loading">Carregando informações...</p>}
          {!loading && extra && (
            <div className="extra-info">
              <div>
                <span>Altura</span>
                <b>{extra.height / 10} m</b>
              </div>
              <div>
                <span>Peso</span>
                <b>{extra.weight / 10} kg</b>
              </div>
              <div>
                <span>Habilidades</span>
                <b>{extra.abilities.map((a) => a.ability.name).join(', ')}</b>
              </div>
            </div>
          )}

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
