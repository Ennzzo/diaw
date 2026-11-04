import Logo from './Logo'
import '../css/Logos.css'

const variantes = [
  { id: 'horizontal', nome: 'Horizontal (principal)', uso: 'Navbar, cabeçalhos e páginas públicas.' },
  { id: 'empilhada', nome: 'Empilhada', uso: 'Tela de login, cadastro e mobile com pouco espaço na largura.' },
  { id: 'icone', nome: 'Ícone', uso: 'Favicon, avatar e lugares bem pequenos.' },
]

function Logos() {
  return (
    <>
      <div className="logos">
        {variantes.map((v) => (
          <div key={v.id} className="logo-card">
            <div className="logo-fundos">
              <div className="logo-fundo logo-fundo-claro">
                <Logo variante={v.id} tema="claro" />
              </div>
              <div className="logo-fundo logo-fundo-escuro">
                <Logo variante={v.id} tema="escuro" />
              </div>
            </div>
            <strong>{v.nome}</strong>
            <p>{v.uso}</p>
          </div>
        ))}
      </div>

      <h3>Regras de uso</h3>
      <ul className="regras">
        <li>
          <strong>Fundo claro:</strong> ícone azul com carro laranja e texto azul.{' '}
          <strong>Fundo escuro:</strong> ícone laranja com carro azul e texto branco.
        </li>
        <li>
          <strong>Área de respiro:</strong> deixe em volta da logo pelo menos a altura do ícone
          dividida por dois.
        </li>
        <li>
          <strong>Tamanho mínimo:</strong> 24px de altura no ícone. Abaixo disso, use só o ícone.
        </li>
        <li>
          <strong>Não faça:</strong> trocar as cores, esticar, girar, colocar sombra ou usar outra
          fonte no nome.
        </li>
        <li>
          <strong>Arquivos:</strong> a logo é o componente <code>&lt;Logo /&gt;</code> (ícone do
          lucide + texto em Racing Sans One), então ela muda de tema sem precisar exportar imagens.
          O favicon fica em <code>public/favicon.svg</code>.
        </li>
      </ul>
    </>
  )
}

export default Logos
