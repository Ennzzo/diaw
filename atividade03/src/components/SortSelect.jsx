function SortSelect({ value, onChange }) {
  return (
    <select className="sort-select" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="id">Número</option>
      <option value="name">Nome</option>
      <option value="hp">HP</option>
      <option value="attack">Ataque</option>
      <option value="defense">Defesa</option>
      <option value="specialAttack">Ataque Especial</option>
      <option value="specialDefense">Defesa Especial</option>
      <option value="speed">Velocidade</option>
    </select>
  )
}

export default SortSelect
