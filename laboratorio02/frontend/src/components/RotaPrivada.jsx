import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RotaPrivada({ perfil, children }) {
  const { usuario } = useAuth()

  if (!usuario) {
    return <Navigate to="/login" replace />
  }
  if (perfil && usuario.perfil !== perfil) {
    return <Navigate to="/" replace />
  }
  return children
}

export default RotaPrivada
