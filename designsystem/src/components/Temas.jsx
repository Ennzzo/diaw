import { CalendarDays, CarFront } from 'lucide-react'
import '../css/Temas.css'

function Previa({ tema }) {
  return (
    <div className="previa" data-tema={tema}>
      <div className="previa-nav">
        <CarFront size={18} />
        <span>AlugaCar</span>
      </div>
      <div className="previa-corpo">
        <div className="previa-card">
          <div className="previa-topo">
            <strong>Pedido #12</strong>
            <span className="previa-badge">Em análise</span>
          </div>
          <p>Fiat Argo 1.0 · ABC-1D23</p>
          <p className="previa-data">
            <CalendarDays size={14} /> 10/11 a 15/11
          </p>
          <span className="previa-preco">R$ 750,00</span>
          <div className="previa-botoes">
            <button className="previa-botao">Editar</button>
            <button className="previa-botao previa-botao-sec">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Temas() {
  return (
    <>
      <div className="temas">
        <div>
          <h3>Light</h3>
          <Previa tema="claro" />
        </div>
        <div>
          <h3>Dark</h3>
          <Previa tema="escuro" />
        </div>
      </div>

      <h3>Como funciona</h3>
      <ul className="regras">
        <li>
          O tema é o atributo <code>data-tema</code> no <code>&lt;html&gt;</code>. Os tokens
          semânticos (<code>--cor-*</code>) trocam de valor e os componentes não precisam saber qual
          tema está ativo.
        </li>
        <li>
          Na primeira visita o tema segue o sistema (<code>prefers-color-scheme</code>). Depois a
          escolha do botão fica salva no <code>localStorage</code>.
        </li>
        <li>
          No escuro o fundo não é preto puro (<code>#0d1218</code>), o azul fica mais claro para
          manter o contraste e as sombras ficam mais fortes.
        </li>
      </ul>
    </>
  )
}

export default Temas
