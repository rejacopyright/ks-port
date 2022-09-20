import axios from './axios'

export const login = (data) => {
  return axios({
    method: 'post',
    url: 'admin/login',
    data,
  })
}
