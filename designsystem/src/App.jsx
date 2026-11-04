import Cabecalho from './components/Cabecalho'
import Logo from './components/Logo'
import { useTema } from './utils/useTema'
import './css/App.css'

const secoes = [
  { id: 'cores', titulo: 'Cores' },
  { id: 'tipografia', titulo: 'Tipografia' },
  { id: 'espacamentos', titulo: 'Espaçamentos' },
  { id: 'logos', titulo: 'Logos' },
  { id: 'temas', titulo: 'Temas' },
  { id: 'icones', titulo: 'Ícones' },
  { id: 'botoes', titulo: 'Botões' },
  { id: 'componentes', titulo: 'Componentes' },
  { id: 'acessibilidade', titulo: 'Acessibilidade' },
]

function App() {
  const { tema, trocarTema } = useTema()

  return (
    <>
      <Cabecalho tema={tema} trocarTema={trocarTema} secoes={secoes} />

      <main className="conteudo" id="topo">
        <div className="intro">
          <span className="intro-tag">Design System · v1.0</span>
          <h1>AlugaCar DS</h1>
          <p>
            Decisões visuais do front-end do sistema de aluguel de carros (Laboratório 02). Use esta
            página como referência ao criar telas, componentes e estados, para manter a interface
            consistente, fácil de manter e de escalar.
          </p>
          <Logo tema={tema} tamanho={1.2} />
        </div>
      </main>

      <footer className="rodape">
        AlugaCar DS · Laboratório 02 de DIAW · PUC Minas · Enzo Bambirra
      </footer>
    </>
  )
}

export default App
