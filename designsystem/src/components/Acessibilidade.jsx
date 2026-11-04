import { Check, X } from 'lucide-react'
import { contraste } from '../utils/cores'
import '../css/Acessibilidade.css'

const pares = [
  { nome: 'Texto sobre fundo', texto: '#1f2933', fundo: '#f4f6f9', tema: 'Light' },
  { nome: 'Texto secundário sobre superfície', texto: '#4b5563', fundo: '#ffffff', tema: 'Light' },
  { nome: 'Branco sobre azul (botão primário)', texto: '#ffffff', fundo: '#1d3557', tema: 'Light' },
  { nome: 'Azul sobre laranja (botão destaque)', texto: '#1d3557', fundo: '#f4a261', tema: 'Ambos' },
  { nome: 'Laranja escuro sobre branco (preço)', texto: '#b4561a', fundo: '#ffffff', tema: 'Light' },
  { nome: 'Badge “Em análise”', texto: '#8f610c', fundo: '#fff4e0', tema: 'Light' },
  { nome: 'Texto sobre fundo', texto: '#f4f6f9', fundo: '#0d1218', tema: 'Dark' },
  { nome: 'Texto secundário sobre superfície', texto: '#9aa3af', fundo: '#151c24', tema: 'Dark' },
  { nome: 'Fundo escuro sobre azul claro (botão primário)', texto: '#0d1218', fundo: '#84a9cf', tema: 'Dark' },
  { nome: 'Branco sobre laranja', texto: '#ffffff', fundo: '#f4a261', tema: 'Evitar' },
  { nome: 'Cinza 500 sobre fundo', texto: '#6b7280', fundo: '#f4f6f9', tema: 'Evitar' },
]

function Selo({ ok, rotulo }) {
  return (
    <span className={`selo ${ok ? 'selo-ok' : 'selo-falha'}`}>
      {ok ? <Check size={14} aria-hidden="true" /> : <X size={14} aria-hidden="true" />}
      {rotulo}
    </span>
  )
}

function Acessibilidade() {
  return (
    <>
      <h3>Contraste (WCAG 2.1)</h3>
      <p className="secao-descricao">
        Calculado em tempo real a partir das cores. AA pede 4,5:1 para texto normal e 3:1 para texto
        grande (24px ou 18,5px negrito) e ícones.
      </p>
      <div className="contrastes">
        {pares.map((p) => {
          const razao = contraste(p.texto, p.fundo)
          return (
            <div key={p.nome + p.tema} className="contraste">
              <div className="contraste-amostra" style={{ background: p.fundo, color: p.texto }}>
                Aa
              </div>
              <div className="contraste-info">
                <span className="contraste-tema">{p.tema}</span>
                <strong>{p.nome}</strong>
                <code>
                  {p.texto} / {p.fundo}
                </code>
              </div>
              <div className="contraste-nota">
                <span className="contraste-razao">{razao.toFixed(2).replace('.', ',')}:1</span>
                <Selo ok={razao >= 4.5} rotulo="AA" />
                <Selo ok={razao >= 7} rotulo="AAA" />
              </div>
            </div>
          )
        })}
      </div>

      <h3>Diretrizes</h3>
      <ul className="regras">
        <li>
          <strong>Nunca só a cor:</strong> os badges de status sempre têm texto (“Em análise”,
          “Reprovado”), e o campo com erro tem borda vermelha e mensagem escrita.
        </li>
        <li>
          <strong>Teclado:</strong> tudo que é clicável precisa ser alcançado com Tab e mostrar o
          anel de foco. Modais fecham com Esc e devolvem o foco para quem abriu.
        </li>
        <li>
          <strong>Área de toque:</strong> botões e inputs com no mínimo 44×44px (o tamanho P, 36px,
          só em tabelas no desktop).
        </li>
        <li>
          <strong>Leitores de tela:</strong> todo input tem <code>&lt;label&gt;</code>; botão só com
          ícone tem <code>aria-label</code>; erro usa <code>aria-invalid</code> e{' '}
          <code>aria-describedby</code>; alertas usam <code>role=&quot;alert&quot;</code>.
        </li>
        <li>
          <strong>Texto:</strong> tamanhos em <code>rem</code>, corpo mínimo de 16px, linha de 1,5 e
          página em <code>lang=&quot;pt-BR&quot;</code>.
        </li>
        <li>
          <strong>Movimento:</strong> animações curtas e desligadas quando o usuário ativa{' '}
          <code>prefers-reduced-motion</code>.
        </li>
        <li>
          <strong>Laranja:</strong> nunca usar texto branco sobre laranja. Como texto, usar o
          laranja 700 no tema light e o 300 no dark.
        </li>
      </ul>
    </>
  )
}

export default Acessibilidade
