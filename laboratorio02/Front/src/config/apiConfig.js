// Endereco do back-end Spring Boot.
// Localmente usa http://localhost:8080. Na Vercel, cadastre VITE_API_URL
// com a URL do Render (o Vite coloca o valor no build, entao precisa de novo deploy se mudar).
const URL_PADRAO = 'http://localhost:8080'

const API_CONFIG = {
  BASE_URL: (import.meta.env.VITE_API_URL || URL_PADRAO).replace(/\/+$/, ''),
}

export default API_CONFIG
