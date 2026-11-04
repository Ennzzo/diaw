import { NavLink, useNavigate } from 'react-router-dom'
import { CarFront, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import '../css/Navbar.css'

function Navbar() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  function sair() {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="navbar-conteudo">
        <div className="navbar-logo">
          <CarFront size={26} />
          <span>AlugaCar</span>
        </div>

        <nav className="navbar-links">
          {usuario.perfil === 'CLIENTE' && <NavLink to="/pedidos">Meus pedidos</NavLink>}
          {usuario.perfil === 'AGENTE' && (
            <>
              <NavLink to="/painel">Pedidos</NavLink>
              <NavLink to="/clientes">Clientes</NavLink>
              <NavLink to="/automoveis">Automóveis</NavLink>
            </>
          )}
        </nav>

        <div className="navbar-usuario">
          <span>{usuario.nome}</span>
          <button onClick={sair} title="Sair">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
