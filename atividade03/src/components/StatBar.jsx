function StatBar({ label, value, color }) {
  // 255 e o maior valor possivel de um atributo
  const percent = Math.min((value / 255) * 100, 100)

  return (
    <div className="stat-bar">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      <div className="stat-track">
        <div className="stat-fill" style={{ width: percent + '%', background: color }}></div>
      </div>
    </div>
  )
}

export default StatBar
