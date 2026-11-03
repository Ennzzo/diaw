import '../css/StatusBadge.css'

const textos = {
  PENDENTE: 'Em análise',
  APROVADO: 'Aprovado',
  REPROVADO: 'Reprovado',
  CANCELADO: 'Cancelado',
  CONTRATADO: 'Contratado',
}

function StatusBadge({ status }) {
  return <span className={`status status-${status.toLowerCase()}`}>{textos[status]}</span>
}

export default StatusBadge
