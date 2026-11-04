import '../css/Tipografia.css'

const escala = [
  { nome: 'display', token: '--texto-display', tamanho: '48px', peso: '400', fonte: 'display', uso: 'Logo, chamadas e hero' },
  { nome: 'h1', token: '--texto-h1', tamanho: '36px', peso: '700', fonte: 'texto', uso: 'Título da página' },
  { nome: 'h2', token: '--texto-h2', tamanho: '28px', peso: '700', fonte: 'texto', uso: 'Seções' },
  { nome: 'h3', token: '--texto-h3', tamanho: '22px', peso: '600', fonte: 'texto', uso: 'Cards e modais' },
  { nome: 'h4', token: '--texto-h4', tamanho: '18px', peso: '600', fonte: 'texto', uso: 'Grupos de formulário' },
  { nome: 'corpo-g', token: '--texto-corpo-g', tamanho: '18px', peso: '400', fonte: 'texto', uso: 'Textos de abertura' },
  { nome: 'corpo', token: '--texto-corpo', tamanho: '16px', peso: '400', fonte: 'texto', uso: 'Texto padrão e inputs' },
  { nome: 'pequeno', token: '--texto-pequeno', tamanho: '14px', peso: '400', fonte: 'texto', uso: 'Tabelas, labels, navbar' },
  { nome: 'legenda', token: '--texto-legenda', tamanho: '12px', peso: '600', fonte: 'texto', uso: 'Badges e metadados' },
]

function Tipografia() {
  return (
    <>
      <div className="fontes">
        <div className="fonte cartao">
          <span className="fonte-rotulo">Display</span>
          <p className="fonte-exemplo fonte-display">Racing Sans One</p>
          <p className="fonte-letras fonte-display">Aa Bb Cc 0123456789</p>
          <p>
            Fonte de corrida, itálica e pesada. Só para a logo, o título principal e números de
            destaque. Nunca em parágrafos.
          </p>
        </div>
        <div className="fonte cartao">
          <span className="fonte-rotulo">Texto</span>
          <p className="fonte-exemplo">Inter</p>
          <p className="fonte-letras">Aa Bb Cc 0123456789</p>
          <p>
            Fonte de interface, muito legível em tamanhos pequenos. Usada em todo o resto: títulos,
            formulários, tabelas e botões. Pesos 400, 500, 600 e 700.
          </p>
        </div>
      </div>

      <p className="tipo-import">
        Importação pelo Google Fonts no <code>index.html</code>:{' '}
        <code>family=Inter:wght@400;500;600;700&amp;family=Racing+Sans+One</code>
      </p>

      <h3>Escala tipográfica</h3>
      <div className="tipo-escala cartao">
        {escala.map((t) => (
          <div key={t.nome} className="tipo-linha">
            <div className="tipo-meta">
              <strong>{t.nome}</strong>
              <code>{t.token}</code>
              <span>
                {t.tamanho} · {t.peso}
              </span>
            </div>
            <p
              className={t.fonte === 'display' ? 'fonte-display' : ''}
              style={{ fontSize: `var(${t.token})`, fontWeight: t.peso }}
            >
              {t.uso}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Tipografia
