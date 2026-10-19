import '../css/SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Pesquisar Pokémon por nome ou número..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default SearchBar
