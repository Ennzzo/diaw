import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api, { mensagemDeErro } from '../services/api'
import '../css/Formulario.css'
import '../css/Pedidos.css'

const hoje = new Date().toISOString().slice(0, 10)

function PedidoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [automoveis, setAutomoveis] = useState([])
  const [form, setForm] = useState({ automovelId: '', dataInicio: '', dataFim: '' })
  const [erro, setErro] = useState('')

  useEffect(() => {
    api.get('/automoveis').then(({ data }) => setAutomoveis(data))
    if (id) {
      api.get(`/pedidos/${id}`).then(({ data }) =>
        setForm({ automovelId: data.automovel.id, dataInicio: data.dataInicio, dataFim: data.dataFim })
      )
    }
  }, [id])

  function alterar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function salvar(e) {
    e.preventDefault()
    setErro('')
    try {
      if (id) {
        await api.put(`/pedidos/${id}`, form)
      } else {
        await api.post('/pedidos', form)
      }
      navigate('/pedidos')
    } catch (error) {
      setErro(mensagemDeErro(error))
    }
  }

  return (
    <section className="pedido-form">
      <div className="pagina-topo">
        <div>
          <h1>{id ? 'Modificar pedido' : 'Novo pedido de aluguel'}</h1>
          <p>Escolha o carro e o período do aluguel</p>
        </div>
      </div>

      {erro && <p className="erro">{erro}</p>}

      <form className="formulario cartao" onSubmit={salvar}>
        <div className="grade">
          <label className="largura-total">
            Automóvel
            <select name="automovelId" value={form.automovelId} onChange={alterar} required>
              <option value="">Selecione um carro</option>
              {automoveis.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.marca} {a.modelo} {a.ano} - {a.placa}
                </option>
              ))}
            </select>
          </label>
          <label>
            Data de retirada
            <input type="date" name="dataInicio" min={hoje} value={form.dataInicio} onChange={alterar} required />
          </label>
          <label>
            Data de devolução
            <input
              type="date"
              name="dataFim"
              min={form.dataInicio || hoje}
              value={form.dataFim}
              onChange={alterar}
              required
            />
          </label>
        </div>

        <div className="botoes">
          <button type="button" className="botao-voltar" onClick={() => navigate('/pedidos')}>
            Voltar
          </button>
          <button className="botao">{id ? 'Salvar alterações' : 'Enviar pedido'}</button>
        </div>
      </form>
    </section>
  )
}

export default PedidoForm
