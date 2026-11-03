export function formatarData(data) {
  if (!data) return '-'
  const [ano, mes, dia] = data.slice(0, 10).split('-')
  return `${dia}/${mes}/${ano}`
}

export function formatarDinheiro(valor) {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function diasEntre(inicio, fim) {
  const ms = new Date(fim) - new Date(inicio)
  return Math.round(ms / 86400000) + 1
}
