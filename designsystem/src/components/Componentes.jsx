import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react'
import '../css/Componentes.css'

const status = [
  { id: 'pendente', texto: 'Em análise' },
  { id: 'aprovado', texto: 'Aprovado' },
  { id: 'contratado', texto: 'Contratado' },
  { id: 'reprovado', texto: 'Reprovado' },
  { id: 'cancelado', texto: 'Cancelado' },
]

const alertas = [
  { tipo: 'sucesso', Icone: CheckCircle2, texto: 'Pedido enviado para análise.' },
  { tipo: 'info', Icone: Info, texto: 'O banco ainda precisa avaliar o crédito.' },
  { tipo: 'aviso', Icone: TriangleAlert, texto: 'O automóvel está reservado até amanhã.' },
  { tipo: 'erro', Icone: AlertCircle, texto: 'CPF já cadastrado.' },
]

function Componentes() {
  return (
    <>
      <h3>Badges de status do pedido</h3>
      <div className="badges">
        {status.map((s) => (
          <span key={s.id} className={`status status-${s.id}`}>
            {s.texto}
          </span>
        ))}
      </div>

      <h3>Campos de formulário</h3>
      <form className="campos cartao" onSubmit={(e) => e.preventDefault()}>
        <label className="campo">
          Nome completo
          <input type="text" placeholder="Ex.: Maria Silva" />
        </label>
        <label className="campo">
          Automóvel
          <select defaultValue="">
            <option value="" disabled>
              Selecione
            </option>
            <option>Fiat Argo · ABC-1D23</option>
            <option>VW Polo · XYZ-9K87</option>
          </select>
        </label>
        <label className="campo campo-erro">
          CPF
          <input type="text" defaultValue="123.456.789-00" aria-invalid="true" aria-describedby="cpf-erro" />
          <span id="cpf-erro" className="campo-mensagem">
            CPF já cadastrado.
          </span>
        </label>
        <label className="campo">
          Matrícula
          <input type="text" value="2026001" disabled />
        </label>
      </form>

      <h3>Alertas</h3>
      <div className="alertas">
        {alertas.map(({ tipo, Icone, texto }) => (
          <div key={tipo} className={`alerta alerta-${tipo}`} role={tipo === 'erro' ? 'alert' : 'status'}>
            <Icone size={18} aria-hidden="true" />
            {texto}
          </div>
        ))}
      </div>
    </>
  )
}

export default Componentes
