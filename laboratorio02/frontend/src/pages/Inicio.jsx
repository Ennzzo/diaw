import { useAuth } from '../context/AuthContext'

function Inicio() {
  const { usuario, logout } = useAuth()

  return (
    <div style={{ padding: 32 }}>
      <h1>Olá, {usuario.nome}</h1>
      <p>Perfil: {usuario.perfil}</p>
      <button onClick={logout}>Sair</button>
    </div>
  )
}

export default Inicio
