import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <>
      <Navbar />
      <main className="conteudo">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
