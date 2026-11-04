import { useEffect, useState } from 'react'
import {
  Accessibility,
  Component,
  Menu,
  Moon,
  Palette,
  RectangleHorizontal,
  Ruler,
  Shapes,
  SunMoon,
  Sun,
  Type,
  X,
  CarFront,
} from 'lucide-react'
import Logo from './Logo'
import '../css/MenuLateral.css'

const icones = {
  cores: Palette,
  tipografia: Type,
  espacamentos: Ruler,
  logos: CarFront,
  temas: SunMoon,
  icones: Shapes,
  botoes: RectangleHorizontal,
  componentes: Component,
  acessibilidade: Accessibility,
}

function MenuLateral({ tema, trocarTema, secoes }) {
  const [aberto, setAberto] = useState(false)
  const [ativa, setAtiva] = useState('')

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setAtiva(e.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    secoes.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observador.observe(el)
    })
    return () => observador.disconnect()
  }, [secoes])

  useEffect(() => {
    function fecharComEsc(e) {
      if (e.key === 'Escape') setAberto(false)
    }
    window.addEventListener('keydown', fecharComEsc)
    return () => window.removeEventListener('keydown', fecharComEsc)
  }, [])

  return (
    <>
      <div className="barra-mobile">
        <a href="#topo" className="menu-logo">
          <Logo tema="escuro" tamanho={0.75} />
        </a>
        <button
          className="menu-botao"
          onClick={() => setAberto(true)}
          aria-label="Abrir menu"
          aria-expanded={aberto}
          aria-controls="menu-lateral"
        >
          <Menu size={22} />
        </button>
      </div>

      {aberto && <div className="menu-fundo" onClick={() => setAberto(false)} />}

      <aside id="menu-lateral" className={`menu ${aberto ? 'menu-aberto' : ''}`}>
        <div className="menu-topo">
          <a href="#topo" className="menu-logo" onClick={() => setAberto(false)}>
            <Logo tema="escuro" tamanho={0.8} />
            <span className="menu-ds">DS</span>
          </a>
          <button
            className="menu-botao menu-fechar"
            onClick={() => setAberto(false)}
            aria-label="Fechar menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="menu-nav" aria-label="Seções do design system">
          <span className="menu-rotulo">Fundamentos</span>
          {secoes.map((s) => {
            const Icone = icones[s.id]
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={ativa === s.id ? 'ativo' : ''}
                aria-current={ativa === s.id ? 'location' : undefined}
                onClick={() => setAberto(false)}
              >
                <Icone size={18} aria-hidden="true" />
                {s.titulo}
              </a>
            )
          })}
        </nav>

        <button className="menu-tema" onClick={trocarTema}>
          {tema === 'claro' ? (
            <Moon size={18} aria-hidden="true" />
          ) : (
            <Sun size={18} aria-hidden="true" />
          )}
          {tema === 'claro' ? 'Tema escuro' : 'Tema claro'}
        </button>
      </aside>
    </>
  )
}

export default MenuLateral
