import { useEffect, useState } from 'react'

function temaInicial() {
  try {
    const salvo = localStorage.getItem('alugacar-tema')
    if (salvo) return salvo
  } catch {
    // sem localStorage
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro'
}

export function useTema() {
  const [tema, setTema] = useState(temaInicial)

  useEffect(() => {
    document.documentElement.dataset.tema = tema
    try {
      localStorage.setItem('alugacar-tema', tema)
    } catch {
      // sem localStorage
    }
  }, [tema])

  function trocarTema() {
    setTema(tema === 'claro' ? 'escuro' : 'claro')
  }

  return { tema, trocarTema }
}
