import axios from 'axios'
import router from '../router'
import AuthService from './auth'
import UsersService from './users'
import feedbackService from './feedback'

import { setGlobalLoading } from '../store/global'

const API_ENVIROMENT = {
  production: '',
  development: '',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVIROMENT.local
})

httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)

  const token = window.localStorage.getItem('Token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
}, (error) => {
  const canThrowError = error.request.status === 0 || error.request.status === 500

  if (canThrowError) {
    setGlobalLoading(false)
    throw new Error(error.message)
  }

  if (error.response.status === 401) {
    router.push({ name: 'Home' })
  }

  setGlobalLoading(false)
  return error
})

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedback: feedbackService(httpClient)
}
