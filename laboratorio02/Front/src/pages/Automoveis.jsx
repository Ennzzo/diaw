import { useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import Modal from '../components/Modal'
import api, { mensagemDeErro } from '../services/api'
import '../css/Tabela.css'
import '../css/Formulario.css'

const vazio = { matricula: '', ano: '', marca: '', modelo: '', placa: '' }

function Automoveis() {
  const [automoveis, setAutomoveis] = useState([])
  const [form, setForm] = useState(null)
  const [erro, setErro] = useState('')

  async function carregar() {
    const { data } = await api.get('/automoveis')
    setAutomoveis(data)
  }

  useEffect(() => {
    api.get('/automoveis').then(({ data }) => setAutomoveis(data))
  }, [])

  function alterar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function salvar(e) {
    e.preventDefault()
    setErro('')
    try {
      if (form.id) {
        await api.put(`/automoveis/${form.id}`, form)
      } else {
        await api.post('/automoveis', form)
      }
      setForm(null)
      carregar()
    } catch (error) {
      setErro(mensagemDeErro(error))
    }
  }

  async function excluir(automovel) {
    if (!confirm(`Excluir o ${automovel.modelo} ${automovel.placa}?`)) return
    try {
      await api.delete(`/automoveis/${automovel.id}`)
      carregar()
    } catch (error) {
      alert(mensagemDeErro(error))
    }
  }

  return (
    <section>
      <div className="pagina-topo">
        <div>
          <h1>Automóveis</h1>
          <p>{automoveis.length} na frota</p>
        </div>
        <button
          className="botao"
          onClick={() => {
            setErro('')
            setForm(vazio)
          }}
        >
          <Plus size={18} /> Novo automóvel
        </button>
      </div>

      <div className="tabela-container">
        <table className="tabela">
          <thead>
            <tr>
              <th>Marca / Modelo</th>
              <th>Ano</th>
              <th>Placa</th>
              <th>Matrícula</th>
              <th>Proprietário</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {automoveis.map((a) => (
              <tr key={a.id}>
                <td>
                  <strong>{a.marca}</strong> {a.modelo}
                </td>
                <td>{a.ano}</td>
                <td>{a.placa}</td>
                <td>{a.matricula}</td>
                <td>{a.proprietario ? a.proprietario.toLowerCase() : 'locadora'}</td>
                <td className="acoes">
                  <button
                    onClick={() => {
                      setErro('')
                      setForm(a)
                    }}
                    title="Editar"
                  >
                    <Pencil size={17} />
                  </button>
                  <button onClick={() => excluir(a)} title="Excluir" className="perigo">
                    <Trash2 size={17} />
                  </button>
                </td>
              </tr>
            ))}
            {automoveis.length === 0 && (
              <tr>
                <td colSpan="6" className="vazio">Nenhum automóvel cadastrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {form && (
        <Modal titulo={form.id ? 'Editar automóvel' : 'Novo automóvel'} onFechar={() => setForm(null)}>
          {erro && <p className="erro">{erro}</p>}
          <form className="formulario" onSubmit={salvar}>
            <div className="grade">
              <label>
                Marca
                <input name="marca" value={form.marca} onChange={alterar} required />
              </label>
              <label>
                Modelo
                <input name="modelo" value={form.modelo} onChange={alterar} required />
              </label>
              <label>
                Ano
                <input type="number" name="ano" value={form.ano} onChange={alterar} required />
              </label>
              <label>
                Placa
                <input name="placa" value={form.placa} onChange={alterar} maxLength="7" required />
              </label>
              <label className="largura-total">
                Matrícula
                <input name="matricula" value={form.matricula} onChange={alterar} required />
              </label>
            </div>
            <button className="botao">Salvar</button>
          </form>
        </Modal>
      )}
    </section>
  )
}

export default Automoveis
