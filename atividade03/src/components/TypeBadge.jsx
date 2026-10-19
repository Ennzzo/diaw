import { typeColors } from '../utils/pokemon'

function TypeBadge({ type }) {
  return (
    <span className="type-badge" style={{ background: typeColors[type] }}>
      {type}
    </span>
  )
}

export default TypeBadge
