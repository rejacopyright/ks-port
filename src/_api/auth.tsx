import axios from './axios'

export const login = (data: any) => {
  return axios({
    method: 'post',
    url: 'admin/login',
    data,
  })
}

export const sendResetPasswordLink = (data: any) => {
  return axios({
    method: 'post',
    url: 'admin/forgot-password',
    data,
  })
}

export const resetPassword = (data: any) => {
  return axios({
    method: 'post',
    url: 'admin/reset-password',
    data,
  })
}

export const inValidateToken = (token: any) => {
  return axios({
    method: 'post',
    url: 'admin/invalidate-token',
    data: { token },
  })
}
