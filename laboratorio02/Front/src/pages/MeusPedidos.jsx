import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, CarFront, Pencil, Plus, XCircle } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import api, { mensagemDeErro } from '../services/api'
import { diasEntre, formatarData } from '../utils/formatar'
import '../css/Pedidos.css'

function MeusPedidos() {
  const [pedidos, setPedidos] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    api
      .get('/pedidos')
      .then(({ data }) => setPedidos(data))
      .finally(() => setCarregando(false))
  }, [])

  async function cancelar(pedido) {
    if (!confirm('Deseja cancelar esse pedido?')) return
    try {
      const { data } = await api.patch(`/pedidos/${pedido.id}/cancelar`)
      setPedidos(pedidos.map((p) => (p.id === data.id ? data : p)))
    } catch (error) {
      alert(mensagemDeErro(error))
    }
  }

  return (
    <section>
      <div className="pagina-topo">
        <div>
          <h1>Meus pedidos</h1>
          <p>Acompanhe o status dos seus pedidos de aluguel</p>
        </div>
        <Link to="/pedidos/novo" className="botao">
          <Plus size={18} /> Novo pedido
        </Link>
      </div>

      {carregando && <p>Carregando...</p>}

      {!carregando && pedidos.length === 0 && (
        <div className="sem-pedidos">
          <CarFront size={40} />
          <p>Você ainda não fez nenhum pedido.</p>
        </div>
      )}

      <div className="pedidos">
        {pedidos.map((p) => (
          <article className="pedido" key={p.id}>
            <div className="pedido-topo">
              <span className="pedido-numero">Pedido #{p.id}</span>
              <StatusBadge status={p.status} />
            </div>

            <h3>
              {p.automovel.marca} {p.automovel.modelo}
            </h3>
            <p className="pedido-info">
              {p.automovel.ano} · Placa {p.automovel.placa}
            </p>
            <p className="pedido-info">
              <CalendarDays size={15} /> {formatarData(p.dataInicio)} até {formatarData(p.dataFim)} (
              {diasEntre(p.dataInicio, p.dataFim)} dias)
            </p>

            {p.parecer && (
              <p className="pedido-parecer">
                <strong>Parecer de {p.avaliadoPor}:</strong> {p.parecer}
              </p>
            )}

            {p.contrato && (
              <p className="pedido-parecer">
                <strong>Contrato:</strong> carro registrado em nome do(a) {p.contrato.proprietario.toLowerCase()}
                {p.contrato.banco && `, com crédito do ${p.contrato.banco}`}
              </p>
            )}

            {(p.status === 'PENDENTE' || p.status === 'APROVADO') && (
              <div className="pedido-acoes">
                {p.status === 'PENDENTE' && (
                  <Link to={`/pedidos/${p.id}/editar`}>
                    <Pencil size={15} /> Modificar
                  </Link>
                )}
                <button onClick={() => cancelar(p)}>
                  <XCircle size={15} /> Cancelar
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default MeusPedidos
