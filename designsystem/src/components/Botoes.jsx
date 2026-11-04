import { BadgeCheck, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import Botao from './Botao'
import '../css/Botoes.css'

const variantes = [
  { id: 'primario', nome: 'Primário', uso: 'Ação principal da tela. Só um por área.', texto: 'Novo pedido', icone: Plus },
  { id: 'destaque', nome: 'Destaque', uso: 'Chamada de marketing ou ação positiva forte.', texto: 'Aprovar', icone: BadgeCheck },
  { id: 'secundario', nome: 'Secundário', uso: 'Ações de apoio: voltar, cancelar, filtrar.', texto: 'Editar', icone: Pencil },
  { id: 'fantasma', nome: 'Fantasma', uso: 'Ações discretas dentro de tabelas e cards.', texto: 'Ver detalhes' },
  { id: 'perigo', nome: 'Perigo', uso: 'Ações destrutivas. Sempre com confirmação.', texto: 'Excluir', icone: Trash2 },
]

function Botoes() {
  return (
    <>
      <div className="botoes-lista">
        {variantes.map((v) => (
          <div key={v.id} className="botao-linha">
            <div className="botao-info">
              <strong>{v.nome}</strong>
              <code>.btn-{v.id}</code>
              <span>{v.uso}</span>
            </div>
            <div className="botao-exemplos">
              <Botao variante={v.id} icone={v.icone}>
                {v.texto}
              </Botao>
              <Botao variante={v.id} disabled>
                Desabilitado
              </Botao>
              <Botao variante={v.id} carregando>
                Salvando
              </Botao>
            </div>
          </div>
        ))}
      </div>

      <h3>Tamanhos</h3>
      <div className="botao-exemplos cartao">
        <Botao tamanho="p">Pequeno · 36px</Botao>
        <Botao tamanho="m">Médio · 44px</Botao>
        <Botao tamanho="g">Grande · 52px</Botao>
      </div>

      <h3>Só ícone</h3>
      <div className="botao-exemplos cartao">
        <Botao variante="secundario" icone={Search} aria-label="Buscar" />
        <Botao variante="fantasma" icone={Pencil} aria-label="Editar" />
        <Botao variante="perigo" icone={Trash2} aria-label="Excluir" />
        <Botao variante="secundario" tamanho="p" icone={Pencil} aria-label="Editar" />
      </div>

      <h3>Estados</h3>
      <ul className="regras">
        <li>
          <strong>Hover:</strong> a cor de fundo fica um tom mais forte (token{' '}
          <code>-hover</code>).
        </li>
        <li>
          <strong>Foco:</strong> anel de 3px com <code>--cor-foco</code>, só ao navegar pelo
          teclado (<code>:focus-visible</code>). Teste apertando Tab nesta página.
        </li>
        <li>
          <strong>Pressionado:</strong> desce 1px. <strong>Desabilitado:</strong> 50% de opacidade e
          cursor bloqueado. <strong>Carregando:</strong> ícone girando e botão desabilitado para
          evitar duplo envio.
        </li>
      </ul>
    </>
  )
}

export default Botoes
