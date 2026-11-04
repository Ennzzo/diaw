import { escalas, feedback } from '../data/cores'
import { textoLegivel } from '../utils/cores'
import '../css/Paleta.css'

function Paleta() {
  return (
    <>
      {escalas.map((escala) => (
        <div key={escala.nome} className="escala">
          <div className="escala-info">
            <h3>{escala.nome}</h3>
            <p>{escala.descricao}</p>
          </div>
          <div className="escala-tons">
            {Object.entries(escala.tons).map(([tom, hex]) => (
              <div
                key={tom}
                className="tom"
                style={{ background: hex, color: textoLegivel(hex) }}
                title={`--${escala.nome}-${tom}`}
              >
                <span>
                  {tom}
                  {Number(tom) === escala.base && ' ★'}
                </span>
                <code>{hex}</code>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h3>Feedback</h3>
      <div className="feedback">
        {feedback.map((cor) => (
          <div key={cor.nome} className="feedback-item cartao">
            <span className="feedback-amostra" style={{ background: cor.hex }} />
            <div>
              <strong>{cor.nome}</strong>
              <code>{cor.hex}</code>
              <p>{cor.uso}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Paleta
