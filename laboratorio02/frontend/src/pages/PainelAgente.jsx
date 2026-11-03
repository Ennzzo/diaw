import { useEffect, useState } from 'react'
import { BadgeCheck, FileSignature, Landmark, Pencil } from 'lucide-react'
import Modal from '../components/Modal'
import StatusBadge from '../components/StatusBadge'
import { useAuth } from '../context/AuthContext'
import api, { mensagemDeErro } from '../services/api'
import { diasEntre, formatarData, formatarDinheiro } from '../utils/formatar'
import '../css/Tabela.css'
import '../css/Formulario.css'
import '../css/Painel.css'

const filtros = ['TODOS', 'PENDENTE', 'APROVADO', 'CONTRATADO', 'REPROVADO', 'CANCELADO']

function PainelAgente() {
  const { usuario } = useAuth()
  const [pedidos, setPedidos] = useState([])
  const [automoveis, setAutomoveis] = useState([])
  const [filtro, setFiltro] = useState('PENDENTE')
  const [acao, setAcao] = useState(null)
  const [form, setForm] = useState({})
  const [erro, setErro] = useState('')

  const ehBanco = usuario.tipoAgente === 'BANCO'

  useEffect(() => {
    api.get('/pedidos').then(({ data }) => setPedidos(data))
    api.get('/automoveis').then(({ data }) => setAutomoveis(data))
  }, [])

  function abrir(tipo, pedido) {
    setErro('')
    setAcao({ tipo, pedido })
    if (tipo === 'avaliar') setForm({ aprovado: 'true', parecer: '' })
    if (tipo === 'modificar')
      setForm({ automovelId: pedido.automovel.id, dataInicio: pedido.dataInicio, dataFim: pedido.dataFim })
    if (tipo === 'contrato') setForm({ proprietario: 'CLIENTE' })
    if (tipo === 'credito') setForm({ valor: '', taxaJuros: '', parcelas: 12 })
  }

  async function confirmar(e) {
    e.preventDefault()
    const id = acao.pedido.id
    try {
      let resposta
      if (acao.tipo === 'avaliar') {
        resposta = await api.patch(`/pedidos/${id}/avaliar`, { ...form, aprovado: form.aprovado === 'true' })
      } else if (acao.tipo === 'modificar') {
        resposta = await api.put(`/pedidos/${id}`, form)
      } else {
        resposta = await api.post(`/pedidos/${id}/${acao.tipo}`, form)
      }
      setPedidos(pedidos.map((p) => (p.id === id ? resposta.data : p)))
      setAcao(null)
    } catch (error) {
      setErro(mensagemDeErro(error))
    }
  }

  function alterar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const visiveis = filtro === 'TODOS' ? pedidos : pedidos.filter((p) => p.status === filtro)
  const contar = (status) => pedidos.filter((p) => p.status === status).length

  return (
    <section>
      <div className="pagina-topo">
        <div>
          <h1>Pedidos de aluguel</h1>
          <p>
            {usuario.nome} · {ehBanco ? 'Banco' : 'Empresa'}
          </p>
        </div>
      </div>

      <div className="resumo">
        <div>
          <strong>{contar('PENDENTE')}</strong> aguardando análise
        </div>
        <div>
          <strong>{contar('APROVADO')}</strong> aprovados
        </div>
        <div>
          <strong>{contar('CONTRATADO')}</strong> contratos
        </div>
      </div>

      <div className="filtros">
        {filtros.map((f) => (
          <button key={f} className={filtro === f ? 'ativo' : ''} onClick={() => setFiltro(f)}>
            {f === 'TODOS' ? 'Todos' : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="tabela-container">
        <table className="tabela">
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Automóvel</th>
              <th>Período</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visiveis.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  {p.clienteNome}
                  <small>Renda {formatarDinheiro(p.clienteRenda)}</small>
                </td>
                <td>
                  {p.automovel.marca} {p.automovel.modelo}
                  <small>{p.automovel.placa}</small>
                </td>
                <td>
                  {formatarData(p.dataInicio)} - {formatarData(p.dataFim)}
                  <small>{diasEntre(p.dataInicio, p.dataFim)} dias</small>
                </td>
                <td>
                  <StatusBadge status={p.status} />
                  {p.contrato?.banco && (
                    <small>
                      Crédito {formatarDinheiro(p.contrato.valorCredito)} em {p.contrato.parcelas}x
                    </small>
                  )}
                </td>
                <td className="acoes">
                  {p.status === 'PENDENTE' && (
                    <>
                      <button onClick={() => abrir('modificar', p)} title="Modificar">
                        <Pencil size={17} />
                      </button>
                      <button onClick={() => abrir('avaliar', p)} className="botao-acao">
                        <BadgeCheck size={16} /> Avaliar
                      </button>
                    </>
                  )}
                  {p.status === 'APROVADO' && (
                    <button onClick={() => abrir('contrato', p)} className="botao-acao">
                      <FileSignature size={16} /> Executar contrato
                    </button>
                  )}
                  {p.status === 'CONTRATADO' && ehBanco && !p.contrato?.banco && (
                    <button onClick={() => abrir('credito', p)} className="botao-acao">
                      <Landmark size={16} /> Conceder crédito
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {visiveis.length === 0 && (
              <tr>
                <td colSpan="6" className="vazio">Nenhum pedido aqui</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {acao && (
        <Modal titulo={`Pedido #${acao.pedido.id} - ${acao.pedido.clienteNome}`} onFechar={() => setAcao(null)}>
          {erro && <p className="erro">{erro}</p>}
          <form className="formulario" onSubmit={confirmar}>
            {acao.tipo === 'avaliar' && (
              <div className="grade">
                <div className="dados-cliente largura-total">
                  <span>Profissão: {acao.pedido.clienteProfissao || 'não informada'}</span>
                  <span>Renda mensal: {formatarDinheiro(acao.pedido.clienteRenda)}</span>
                  <span>
                    Aluguel de {diasEntre(acao.pedido.dataInicio, acao.pedido.dataFim)} dias - {acao.pedido.automovel.marca}{' '}
                    {acao.pedido.automovel.modelo}
                  </span>
                </div>
                <label className="largura-total">
                  Parecer financeiro
                  <select name="aprovado" value={form.aprovado} onChange={alterar}>
                    <option value="true">Positivo (aprovar)</option>
                    <option value="false">Negativo (reprovar)</option>
                  </select>
                </label>
                <label className="largura-total">
                  Justificativa
                  <textarea name="parecer" rows="3" value={form.parecer} onChange={alterar} required />
                </label>
              </div>
            )}

            {acao.tipo === 'modificar' && (
              <div className="grade">
                <label className="largura-total">
                  Automóvel
                  <select name="automovelId" value={form.automovelId} onChange={alterar}>
                    {automoveis.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.marca} {a.modelo} - {a.placa}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Retirada
                  <input type="date" name="dataInicio" value={form.dataInicio} onChange={alterar} required />
                </label>
                <label>
                  Devolução
                  <input type="date" name="dataFim" value={form.dataFim} onChange={alterar} required />
                </label>
              </div>
            )}

            {acao.tipo === 'contrato' && (
              <div className="grade">
                <label className="largura-total">
                  Registrar o automóvel como propriedade de
                  <select name="proprietario" value={form.proprietario} onChange={alterar}>
                    <option value="CLIENTE">Cliente</option>
                    <option value="EMPRESA">Empresa</option>
                    <option value="BANCO">Banco</option>
                  </select>
                </label>
              </div>
            )}

            {acao.tipo === 'credito' && (
              <div className="grade">
                <label>
                  Valor do crédito (R$)
                  <input type="number" min="1" step="0.01" name="valor" value={form.valor} onChange={alterar} required />
                </label>
                <label>
                  Juros ao mês (%)
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="taxaJuros"
                    value={form.taxaJuros}
                    onChange={alterar}
                    required
                  />
                </label>
                <label>
                  Parcelas
                  <input type="number" min="1" max="72" name="parcelas" value={form.parcelas} onChange={alterar} required />
                </label>
              </div>
            )}

            <button className="botao">Confirmar</button>
          </form>
        </Modal>
      )}
    </section>
  )
}

export default PainelAgente
