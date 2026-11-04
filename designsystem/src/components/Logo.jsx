import { CarFront } from 'lucide-react'
import '../css/Logo.css'

function Logo({ variante = 'horizontal', tema = 'claro', tamanho = 1 }) {
  return (
    <div
      className={`logo logo-${variante} logo-${tema}`}
      style={{ fontSize: `${tamanho}rem` }}
      role="img"
      aria-label="AlugaCar"
    >
      <span className="logo-icone">
        <CarFront strokeWidth={2.2} />
      </span>
      {variante !== 'icone' && (
        <span className="logo-texto">
          Aluga<strong>Car</strong>
        </span>
      )}
    </div>
  )
}

export default Logo
