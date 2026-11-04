import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ClienteForm from '../components/ClienteForm'
import api, { mensagemDeErro } from '../services/api'
import '../css/Auth.css'

function Cadastro() {
  const navigate = useNavigate()
  const [erro, setErro] = useState('')

  async function cadastrar(dados) {
    setErro('')
    try {
      await api.post('/auth/cadastro', dados)
      alert('Cadastro feito! Agora é só entrar.')
      navigate('/login')
    } catch (error) {
      setErro(mensagemDeErro(error))
    }
  }

  return (
    <div className="auth">
      <div className="auth-card auth-card-largo">
        <h1>Criar conta</h1>
        <p className="auth-sub">Preencha seus dados para poder alugar um carro</p>
        {erro && <p className="erro">{erro}</p>}
        <ClienteForm textoBotao="Cadastrar" onSalvar={cadastrar} />
        <p className="auth-link">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  )
}

export default Cadastro
