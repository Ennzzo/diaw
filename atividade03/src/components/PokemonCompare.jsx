import { getImage, formatId } from '../utils/pokemon'
import '../css/PokemonCompare.css'

const statLabels = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  specialAttack: 'Ataque Sp.',
  specialDefense: 'Defesa Sp.',
  speed: 'Velocidade',
}

function PokemonCompare({ pokemon1, pokemon2, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="compare-modal" onClick={(e) => e.stopPropagation()}>
        <button className="compare-close" onClick={onClose}>&times;</button>

        <h2 className="compare-title">⚔️ Comparativo de Pokémon</h2>

        <div className="compare-header">
          <div className="compare-card">
            <span className="compare-id">{formatId(pokemon1.id)}</span>
            <img src={getImage(pokemon1.id)} alt={pokemon1.name} />
            <h3>{pokemon1.name}</h3>
          </div>

          <span className="vs-badge">VS</span>

          <div className="compare-card">
            <span className="compare-id">{formatId(pokemon2.id)}</span>
            <img src={getImage(pokemon2.id)} alt={pokemon2.name} />
            <h3>{pokemon2.name}</h3>
          </div>
        </div>

        <div className="compare-stats">
          {Object.keys(statLabels).map((stat) => {
            const val1 = pokemon1.stats[stat]
            const val2 = pokemon2.stats[stat]

            return (
              <div key={stat} className="compare-row">
                <div className={'compare-val' + (val1 > val2 ? ' winner' : '')}>
                  {val1 > val2 && '🏆 '}
                  {val1}
                </div>
                <div className="compare-name">{statLabels[stat]}</div>
                <div className={'compare-val' + (val2 > val1 ? ' winner' : '')}>
                  {val2}
                  {val2 > val1 && ' 🏆'}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PokemonCompare
