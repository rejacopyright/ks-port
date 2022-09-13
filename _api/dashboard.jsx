import axios from './axios'

export const me = () => {
  return axios({
    method: 'get',
    url: 'admin/me',
  })
}
