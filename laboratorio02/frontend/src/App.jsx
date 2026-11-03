import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RotaPrivada from './components/RotaPrivada'
import Layout from './components/Layout'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Inicio from './pages/Inicio'
import Clientes from './pages/Clientes'
import MeusPedidos from './pages/MeusPedidos'
import PedidoForm from './pages/PedidoForm'
import PainelAgente from './pages/PainelAgente'
import Automoveis from './pages/Automoveis'
import './css/App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route
            element={
              <RotaPrivada>
                <Layout />
              </RotaPrivada>
            }
          >
            <Route path="/" element={<Inicio />} />
            <Route
              path="/pedidos"
              element={
                <RotaPrivada perfil="CLIENTE">
                  <MeusPedidos />
                </RotaPrivada>
              }
            />
            <Route
              path="/pedidos/novo"
              element={
                <RotaPrivada perfil="CLIENTE">
                  <PedidoForm />
                </RotaPrivada>
              }
            />
            <Route
              path="/pedidos/:id/editar"
              element={
                <RotaPrivada perfil="CLIENTE">
                  <PedidoForm />
                </RotaPrivada>
              }
            />
            <Route
              path="/painel"
              element={
                <RotaPrivada perfil="AGENTE">
                  <PainelAgente />
                </RotaPrivada>
              }
            />
            <Route
              path="/automoveis"
              element={
                <RotaPrivada perfil="AGENTE">
                  <Automoveis />
                </RotaPrivada>
              }
            />
            <Route
              path="/clientes"
              element={
                <RotaPrivada perfil="AGENTE">
                  <Clientes />
                </RotaPrivada>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
