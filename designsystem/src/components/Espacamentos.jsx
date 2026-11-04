import '../css/Espacamentos.css'

const espacos = [
  { token: '--esp-1', valor: 4, uso: 'Ícone e texto colados' },
  { token: '--esp-2', valor: 8, uso: 'Gap entre ícone e texto do botão' },
  { token: '--esp-3', valor: 12, uso: 'Padding de input, gap de formulário' },
  { token: '--esp-4', valor: 16, uso: 'Padding lateral da página' },
  { token: '--esp-5', valor: 20, uso: 'Padding de cards' },
  { token: '--esp-6', valor: 24, uso: 'Espaço entre grupos' },
  { token: '--esp-8', valor: 32, uso: 'Espaço entre blocos' },
  { token: '--esp-12', valor: 48, uso: 'Espaço entre seções' },
  { token: '--esp-16', valor: 64, uso: 'Hero e áreas grandes' },
]

const raios = [
  { token: '--raio-p', valor: '4px', uso: 'Amostras, checkbox' },
  { token: '--raio-m', valor: '8px', uso: 'Botões e inputs' },
  { token: '--raio-g', valor: '12px', uso: 'Cards e tabelas' },
  { token: '--raio-xg', valor: '16px', uso: 'Modais' },
  { token: '--raio-pilula', valor: '999px', uso: 'Badges de status' },
]

function Espacamentos() {
  return (
    <>
      <p className="secao-descricao">
        Base de 4px: todo espaçamento é múltiplo de 4. Isso evita valores soltos como 13px ou 18px e
        deixa o alinhamento previsível.
      </p>
      <div className="espacos cartao">
        {espacos.map((e) => (
          <div key={e.token} className="espaco">
            <code>{e.token}</code>
            <span className="espaco-valor">{e.valor}px</span>
            <span className="espaco-barra" style={{ width: e.valor * 3 }} />
            <span className="espaco-uso">{e.uso}</span>
          </div>
        ))}
      </div>

      <h3>Arredondamentos</h3>
      <div className="raios">
        {raios.map((r) => (
          <div key={r.token} className="raio">
            <div className="raio-amostra" style={{ borderRadius: `var(${r.token})` }} />
            <code>{r.token}</code>
            <strong>{r.valor}</strong>
            <span>{r.uso}</span>
          </div>
        ))}
      </div>

      <h3>Sombras</h3>
      <div className="sombras">
        <div className="sombra cartao" style={{ boxShadow: 'var(--sombra-1)' }}>
          <code>--sombra-1</code>
          <span>Cards e tabelas</span>
        </div>
        <div className="sombra cartao" style={{ boxShadow: 'var(--sombra-2)' }}>
          <code>--sombra-2</code>
          <span>Modais e menus</span>
        </div>
      </div>
    </>
  )
}

export default Espacamentos
