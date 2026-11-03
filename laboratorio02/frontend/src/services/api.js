import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function mensagemDeErro(error) {
  return error.response?.data?.erro || 'Algo deu errado, tente novamente'
}

export default api
