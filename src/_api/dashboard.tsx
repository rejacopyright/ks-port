import axios from './axios'

export const me = () => {
  return axios({
    method: 'get',
    url: 'admin/me',
  })
}

export const getAnalytics = () => {
  return axios({
    method: 'get',
    url: 'admin/dashboard/analytics',
  })
}
