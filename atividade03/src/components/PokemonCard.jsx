function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <span>#{pokemon.id}</span>
      <h3>{pokemon.name}</h3>
      <p>{pokemon.types.map((t) => t.name).join(' / ')}</p>
      <ul>
        <li>HP: {pokemon.stats.hp}</li>
        <li>Ataque: {pokemon.stats.attack}</li>
        <li>Defesa: {pokemon.stats.defense}</li>
        <li>Atq. Especial: {pokemon.stats.specialAttack}</li>
        <li>Def. Especial: {pokemon.stats.specialDefense}</li>
        <li>Velocidade: {pokemon.stats.speed}</li>
      </ul>
    </div>
  )
}

export default PokemonCard
