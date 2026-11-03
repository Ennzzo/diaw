import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Inicio() {
  const { usuario } = useAuth()
  return <Navigate to={usuario.perfil === 'AGENTE' ? '/clientes' : '/pedidos'} replace />
}

export default Inicio
