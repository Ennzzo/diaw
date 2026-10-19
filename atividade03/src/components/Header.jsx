import '../css/Header.css'

function Header({ page, onChangePage, darkMode, onToggleTheme }) {
  return (
    <header className="header">
      <div className="logo">
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
        <button className="theme-btn" onClick={onToggleTheme} title="Trocar tema">
          {darkMode ? '☀' : '🌙'}
        </button>
      </nav>
    </header>
  )
}

export default Header
