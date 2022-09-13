import axios from './axios'

export const getHomeBanner = () => {
  return axios({
    method: 'get',
    url: 'admin/home/banner',
  })
}

export const addEditHomeBanner = (data) => {
  return axios({
    method: 'post',
    url: 'admin/home/banner',
    data,
  })
}
