import { matiz } from '../utils/cores'
import '../css/CirculoCromatico.css'

const marcas = [
  { nome: 'Azul', hex: '#1d3557' },
  { nome: 'Laranja', hex: '#f4a261' },
]

function CirculoCromatico() {
  const angulos = marcas.map((m) => matiz(m.hex))
  const diferenca = Math.abs(angulos[0] - angulos[1])

  return (
    <div className="circulo-area cartao">
      <div className="circulo" role="img" aria-label="Círculo cromático com azul e laranja em lados opostos">
        {marcas.map((m, i) => (
          <span
            key={m.nome}
            className="circulo-ponto"
            style={{ background: m.hex, transform: `rotate(${angulos[i]}deg) translateY(-96px)` }}
          />
        ))}
        <span
          className="circulo-linha"
          style={{ transform: `rotate(${angulos[0]}deg)` }}
        />
        <div className="circulo-miolo" />
      </div>

      <div className="circulo-texto">
        <h3>Harmonia complementar</h3>
        <p>
          No círculo cromático, o azul da marca ({angulos[0]}°) e o laranja de destaque (
          {angulos[1]}°) ficam quase em lados opostos ({diferenca}° de distância). Cores
          complementares geram o maior contraste de matiz possível, por isso o laranja chama
          atenção sobre o azul sem precisar de cores extras.
        </p>
        <ul className="regras">
          <li>
            <strong>60%</strong> neutros (fundos e superfícies)
          </li>
          <li>
            <strong>30%</strong> azul (navbar, botões, títulos)
          </li>
          <li>
            <strong>10%</strong> laranja (ícone da marca, destaques, preços)
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CirculoCromatico
