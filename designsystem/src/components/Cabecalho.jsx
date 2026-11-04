import { Moon, Sun } from 'lucide-react'
import Logo from './Logo'
import '../css/Cabecalho.css'

function Cabecalho({ tema, trocarTema, secoes }) {
  return (
    <header className="cabecalho">
      <div className="cabecalho-conteudo">
        <a href="#topo" className="cabecalho-logo">
          <Logo tema="escuro" tamanho={0.8} />
          <span className="cabecalho-ds">DS</span>
        </a>

        <nav className="cabecalho-nav" aria-label="Seções do design system">
          {secoes.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.titulo}
            </a>
          ))}
        </nav>

        <button
          className="cabecalho-tema"
          onClick={trocarTema}
          aria-label={tema === 'claro' ? 'Ativar tema escuro' : 'Ativar tema claro'}
          title={tema === 'claro' ? 'Tema escuro' : 'Tema claro'}
        >
          {tema === 'claro' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  )
}

export default Cabecalho
