import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import '../css/Formulario.css'

const vazio = {
  nome: '',
  login: '',
  senha: '',
  rg: '',
  cpf: '',
  endereco: '',
  profissao: '',
  rendimentos: [],
}

function ClienteForm({ inicial, editando, textoBotao, onSalvar }) {
  const [form, setForm] = useState({ ...vazio, ...inicial, senha: '' })
  const [salvando, setSalvando] = useState(false)

  function alterar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function alterarRendimento(index, campo, valor) {
    const rendimentos = form.rendimentos.map((r, i) => (i === index ? { ...r, [campo]: valor } : r))
    setForm({ ...form, rendimentos })
  }

  function adicionarRendimento() {
    if (form.rendimentos.length < 3) {
      setForm({ ...form, rendimentos: [...form.rendimentos, { entidadeEmpregadora: '', valor: '' }] })
    }
  }

  function removerRendimento(index) {
    setForm({ ...form, rendimentos: form.rendimentos.filter((_, i) => i !== index) })
  }

  async function enviar(e) {
    e.preventDefault()
    setSalvando(true)
    try {
      await onSalvar({ ...form, cpf: form.cpf.replace(/\D/g, '') })
    } finally {
      setSalvando(false)
    }
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <div className="grade">
        <label>
          Nome completo
          <input name="nome" value={form.nome} onChange={alterar} required />
        </label>
        <label>
          Profissão
          <input name="profissao" value={form.profissao ?? ''} onChange={alterar} />
        </label>
        <label>
          RG
          <input name="rg" value={form.rg} onChange={alterar} required />
        </label>
        <label>
          CPF
          <input name="cpf" value={form.cpf} onChange={alterar} placeholder="Somente números" required />
        </label>
        <label className="largura-total">
          Endereço
          <input name="endereco" value={form.endereco ?? ''} onChange={alterar} />
        </label>
        <label>
          Usuário
          <input name="login" value={form.login} onChange={alterar} disabled={editando} required />
        </label>
        <label>
          Senha
          <input
            name="senha"
            type="password"
            value={form.senha}
            onChange={alterar}
            placeholder={editando ? 'Deixe em branco para manter' : ''}
            required={!editando}
          />
        </label>
      </div>

      <fieldset className="rendimentos">
        <legend>Rendimentos ({form.rendimentos.length}/3)</legend>
        {form.rendimentos.map((r, i) => (
          <div className="rendimento" key={i}>
            <input
              placeholder="Entidade empregadora"
              value={r.entidadeEmpregadora}
              onChange={(e) => alterarRendimento(i, 'entidadeEmpregadora', e.target.value)}
              required
            />
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Valor (R$)"
              value={r.valor}
              onChange={(e) => alterarRendimento(i, 'valor', e.target.value)}
              required
            />
            <button type="button" className="botao-icone" onClick={() => removerRendimento(i)} title="Remover">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {form.rendimentos.length < 3 && (
          <button type="button" className="botao-secundario" onClick={adicionarRendimento}>
            <Plus size={16} /> Adicionar rendimento
          </button>
        )}
      </fieldset>

      <button className="botao" disabled={salvando}>
        {salvando ? 'Salvando...' : textoBotao}
      </button>
    </form>
  )
}

export default ClienteForm
