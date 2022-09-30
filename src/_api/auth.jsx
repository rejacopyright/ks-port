import axios from './axios'

export const login = (data) => {
  return axios({
    method: 'post',
    url: 'admin/login',
    data,
  })
}

export const sendResetPasswordLink = (data) => {
  return axios({
    method: 'post',
    url: 'admin/forgot-password',
    data,
  })
}

export const resetPassword = (data) => {
  return axios({
    method: 'post',
    url: 'admin/reset-password',
    data,
  })
}

export const inValidateToken = (token) => {
  return axios({
    method: 'post',
    url: 'admin/invalidate-token',
    data: { token },
  })
}
