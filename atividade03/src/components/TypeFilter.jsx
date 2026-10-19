import { typeColors } from '../utils/pokemon'
import '../css/TypeFilter.css'

function TypeFilter({ types, selected, onSelect }) {
  return (
    <div className="type-filter">
      <button
        className={selected === '' ? 'active' : ''}
        onClick={() => onSelect('')}
      >
        Todos
      </button>
      {types.map((type) => (
        <button
          key={type.id}
          className={selected === type.name ? 'active' : ''}
          style={{ '--type-color': typeColors[type.name] }}
          onClick={() => onSelect(type.name)}
        >
          {type.name}
        </button>
      ))}
    </div>
  )
}

export default TypeFilter
