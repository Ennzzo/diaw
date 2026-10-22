import { Medal } from 'lucide-react'
import { getImage } from '../utils/pokemon'

function TrainerCard({ trainer, pokemons, onSelectPokemon }) {
  return (
    <div className="trainer-card">
      <div className="trainer-header">
        <div className="trainer-avatar">{trainer.name[0]}</div>
        <div>
          <h3>{trainer.name}</h3>
          <p className="badges">
            <Medal size={15} /> {trainer.badges} {trainer.badges === 1 ? 'insígnia' : 'insígnias'}
          </p>
        </div>
      </div>

      <p className="trainer-subtitle">Pokémon ({pokemons.length})</p>
      <div className="trainer-pokemons">
        {/* index na key porque o mesmo pokemon pode aparecer mais de uma vez */}
        {pokemons.map((p, index) => (
          <button key={index} title={p.name} onClick={() => onSelectPokemon(p)}>
            <img src={getImage(p.id)} alt={p.name} loading="lazy" />
            <span>{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TrainerCard
