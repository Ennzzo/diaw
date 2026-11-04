import Cabecalho from './components/Cabecalho'
import Logo from './components/Logo'
import Secao from './components/Secao'
import Paleta from './components/Paleta'
import CirculoCromatico from './components/CirculoCromatico'
import TokensSemanticos from './components/TokensSemanticos'
import Tipografia from './components/Tipografia'
import Espacamentos from './components/Espacamentos'
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

        <Secao
          id="cores"
          titulo="Cores"
          descricao="A paleta parte do azul e do laranja que já eram usados no front-end do laboratório. Cada cor virou uma escala de tons e, por cima dela, tokens semânticos que mudam entre os temas."
        >
          <CirculoCromatico />
          <Paleta />
          <h3>Tokens semânticos</h3>
          <p className="secao-descricao">
            Nos componentes use sempre os tokens semânticos, nunca o hex direto. Assim o tema escuro
            funciona sozinho.
          </p>
          <TokensSemanticos />
        </Secao>

        <Secao
          id="tipografia"
          titulo="Tipografia"
          descricao="Duas famílias: uma com cara de corrida para a marca e outra neutra para a interface. A escala usa rem para respeitar o tamanho de fonte do navegador."
        >
          <Tipografia />
        </Secao>

        <Secao id="espacamentos" titulo="Espaçamentos e arredondamentos">
          <Espacamentos />
        </Secao>
      </main>

      <footer className="rodape">
        AlugaCar DS · Laboratório 02 de DIAW · PUC Minas · Enzo Bambirra
      </footer>
    </>
  )
}

export default App
