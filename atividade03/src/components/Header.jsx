import '../css/Header.css'


function Header({ page, onChangePage, darkMode, onToggleTheme, compareCount = 0, onOpenCompare }) {
  return (
    <header className="header">
      <div className="logo" onClick={() => onChangePage('pokedex')} style={{ cursor: 'pointer' }}>
        <img src="/pokeball.svg" alt="Pokébola" />
        <h1>Pokédex</h1>
      </div>
      <nav>
        <button className={page === 'pokedex' ? 'active' : ''} onClick={() => onChangePage('pokedex')}>
          Pokémon
        </button>
        <button className={page === 'trainers' ? 'active' : ''} onClick={() => onChangePage('trainers')}>
          Treinadores
        </button>

        {/* ⚔️ Botão de Comparação no Menu */}
        <button 
          className={`compare-nav-btn ${compareCount > 0 ? 'active' : ''}`} 
          onClick={onOpenCompare}
          title="Ver comparativo"
        >
          ⚔️ Comparar {compareCount > 0 && `(${compareCount}/2)`}
        </button>

        <button className="theme-btn" onClick={onToggleTheme} title="Trocar tema">
          {darkMode ? '☀' : '🌙'}
        </button>
      </nav>
    </header>
  )
}
export default Header