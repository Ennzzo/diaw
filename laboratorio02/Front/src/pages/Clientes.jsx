import { useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import ClienteForm from '../components/ClienteForm'
import Modal from '../components/Modal'
import api, { mensagemDeErro } from '../services/api'
import '../css/Tabela.css'

function Clientes() {
  const [clientes, setClientes] = useState([])
  const [busca, setBusca] = useState('')
  const [editando, setEditando] = useState(null)
  const [erro, setErro] = useState('')

  async function carregar() {
    const { data } = await api.get('/clientes')
    setClientes(data)
  }

  useEffect(() => {
    api.get('/clientes').then(({ data }) => setClientes(data))
  }, [])

  async function salvar(dados) {
    setErro('')
    try {
      if (editando.id) {
        await api.put(`/clientes/${editando.id}`, dados)
      } else {
        await api.post('/clientes', dados)
      }
      setEditando(null)
      carregar()
    } catch (error) {
      setErro(mensagemDeErro(error))
    }
  }

  async function excluir(cliente) {
    if (!confirm(`Excluir o cliente ${cliente.nome}?`)) return
    try {
      await api.delete(`/clientes/${cliente.id}`)
      carregar()
    } catch (error) {
      alert(mensagemDeErro(error))
    }
  }

  function abrir(cliente) {
    setErro('')
    setEditando(cliente)
  }

  const filtrados = clientes.filter(
    (c) => c.nome.toLowerCase().includes(busca.toLowerCase()) || c.cpf.includes(busca)
  )

  return (
    <section>
      <div className="pagina-topo">
        <div>
          <h1>Clientes</h1>
          <p>{clientes.length} cadastrados</p>
        </div>
        <button className="botao" onClick={() => abrir({})}>
          <Plus size={18} /> Novo cliente
        </button>
      </div>

      <input
        className="busca"
        placeholder="Buscar por nome ou CPF"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <div className="tabela-container">
        <table className="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Profissão</th>
              <th>Renda total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((c) => (
              <tr key={c.id}>
                <td>
                  <strong>{c.nome}</strong>
                  <small>{c.login}</small>
                </td>
                <td>{c.cpf}</td>
                <td>{c.profissao || '-'}</td>
                <td>
                  {c.rendimentos
                    .reduce((soma, r) => soma + Number(r.valor), 0)
                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td className="acoes">
                  <button onClick={() => abrir(c)} title="Editar">
                    <Pencil size={17} />
                  </button>
                  <button onClick={() => excluir(c)} title="Excluir" className="perigo">
                    <Trash2 size={17} />
                  </button>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan="5" className="vazio">Nenhum cliente encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editando && (
        <Modal titulo={editando.id ? 'Editar cliente' : 'Novo cliente'} onFechar={() => setEditando(null)}>
          {erro && <p className="erro">{erro}</p>}
          <ClienteForm
            inicial={editando}
            editando={!!editando.id}
            textoBotao="Salvar"
            onSalvar={salvar}
          />
        </Modal>
      )}
    </section>
  )
}

export default Clientes
