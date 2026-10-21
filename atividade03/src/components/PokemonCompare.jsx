import React from 'react'

const statLabels = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  specialAttack: 'Ataque Sp.',
  specialDefense: 'Defesa Sp.',
  speed: 'Velocidade'
}

function PokemonCompare({ pokemon1, pokemon2, onClose }) {
  if (!pokemon1 || !pokemon2) return null

  const getImageUrl = (p) =>
    p.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="compare-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <h2 className="compare-title">⚔️ Comparativo de Pokémon</h2>

        {/* Cabeçalho com os 2 Pokémon */}
        <div className="compare-header">
          <div className="compare-card">
            <span className="compare-id-tag">#{String(pokemon1.id).padStart(3, '0')}</span>
            <img src={getImageUrl(pokemon1)} alt={pokemon1.name} />
            <h3>{pokemon1.name}</h3>
          </div>

          <span className="vs-badge">VS</span>

          <div className="compare-card">
            <span className="compare-id-tag">#{String(pokemon2.id).padStart(3, '0')}</span>
            <img src={getImageUrl(pokemon2)} alt={pokemon2.name} />
            <h3>{pokemon2.name}</h3>
          </div>
        </div>

        {/* Tabela de Estatísticas */}
        <div className="compare-stats-table">
          {Object.keys(statLabels).map((statKey) => {
            const val1 = pokemon1.stats ? (pokemon1.stats[statKey] ?? 0) : 0
            const val2 = pokemon2.stats ? (pokemon2.stats[statKey] ?? 0) : 0

            return (
              <div key={statKey} className="compare-stat-row">
                <div className={`stat-val ${val1 > val2 ? 'winner' : ''}`}>
                  {val1 > val2 && '🏆 '}
                  <b>{val1}</b>
                </div>

                <div className="stat-name">{statLabels[statKey]}</div>

                <div className={`stat-val ${val2 > val1 ? 'winner' : ''}`}>
                  <b>{val2}</b>
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