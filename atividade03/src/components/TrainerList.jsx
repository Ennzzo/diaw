import TrainerCard from './TrainerCard'
import '../css/Trainers.css'

function TrainerList({ trainers, allPokemons, onSelectPokemon }) {
  function findPokemons(ids) {
    return ids.map((id) => allPokemons.find((p) => p.id === id)).filter(Boolean)
  }

  return (
    <div className="trainer-list">
      {trainers.map((trainer) => (
        <TrainerCard
          key={trainer.id}
          trainer={trainer}
          pokemons={findPokemons(trainer.pokemonIds)}
          onSelectPokemon={onSelectPokemon}
        />
      ))}
    </div>
  )
}

export default TrainerList
