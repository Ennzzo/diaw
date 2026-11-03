import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { CarFront } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { mensagemDeErro } from '../services/api'
import '../css/Auth.css'

function Login() {
  const { usuario, login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ login: '', senha: '' })
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  if (usuario) {
    return <Navigate to="/" replace />
  }

  async function entrar(e) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      await login(form.login, form.senha)
      navigate('/')
    } catch (error) {
      setErro(mensagemDeErro(error))
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="auth">
      <div className="auth-card">
        <div className="auth-logo">
          <CarFront size={36} />
          <h1>AlugaCar</h1>
        </div>
        <p className="auth-sub">Entre para gerenciar seus aluguéis</p>

        <form onSubmit={entrar}>
          <label>
            Usuário
            <input
              value={form.login}
              onChange={(e) => setForm({ ...form, login: e.target.value })}
              autoComplete="username"
              required
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
              autoComplete="current-password"
              required
            />
          </label>
          {erro && <p className="erro">{erro}</p>}
          <button className="botao" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-link">
          Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
