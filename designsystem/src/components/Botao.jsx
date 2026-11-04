import { LoaderCircle } from 'lucide-react'
import '../css/Botao.css'

function Botao({ variante = 'primario', tamanho = 'm', icone: Icone, carregando, children, ...props }) {
  const somenteIcone = Icone && !children

  return (
    <button
      className={`btn btn-${variante} btn-${tamanho} ${somenteIcone ? 'btn-icone' : ''}`}
      disabled={carregando || props.disabled}
      aria-busy={carregando || undefined}
      {...props}
    >
      {carregando ? (
        <LoaderCircle className="btn-girando" size={18} aria-hidden="true" />
      ) : (
        Icone && <Icone size={18} aria-hidden="true" />
      )}
      {children}
    </button>
  )
}

export default Botao
