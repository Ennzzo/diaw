import { semanticos } from '../data/cores'
import '../css/TokensSemanticos.css'

function TokensSemanticos() {
  return (
    <div className="tabela-area">
      <table className="tabela">
        <thead>
          <tr>
            <th>Token</th>
            <th>Uso</th>
            <th>Light</th>
            <th>Dark</th>
          </tr>
        </thead>
        <tbody>
          {semanticos.map((t) => (
            <tr key={t.token}>
              <td>
                <code>{t.token}</code>
              </td>
              <td>{t.uso}</td>
              <td>
                <span className="amostra" style={{ background: t.claro }} />
                <code>{t.claro}</code>
              </td>
              <td>
                <span className="amostra" style={{ background: t.escuro }} />
                <code>{t.escuro}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TokensSemanticos
