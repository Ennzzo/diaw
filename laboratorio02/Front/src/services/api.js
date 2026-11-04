import axios from 'axios'
import API_CONFIG from '../config/apiConfig'

const api = axios.create({
  baseURL: `${API_CONFIG.BASE_URL}/api`,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// token expirado ou invalido: volta pro login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config.url.includes('/auth/')) {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export function mensagemDeErro(error) {
  if (!error.response) {
    return `Nao foi possivel falar com o back-end em ${API_CONFIG.BASE_URL}`
  }
  return error.response.data?.mensagem || 'Algo deu errado, tente novamente'
}

export default api
