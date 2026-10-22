import { Search } from 'lucide-react'
import '../css/SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <Search size={18} />
      <input
        type="text"
        placeholder="Pesquisar por nome ou número"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
