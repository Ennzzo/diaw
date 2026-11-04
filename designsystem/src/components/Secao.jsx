import '../css/Secao.css'

function Secao({ id, titulo, descricao, children }) {
  return (
    <section id={id} className="secao" aria-labelledby={`${id}-titulo`}>
      <h2 id={`${id}-titulo`}>{titulo}</h2>
      {descricao && <p className="secao-descricao">{descricao}</p>}
      {children}
    </section>
  )
}

export default Secao
