import axios from './axios'

export const getHomeBanner = () => {
  return axios({
    method: 'get',
    url: 'home/banner',
  })
}

export const addEditHomeBanner = (data, id) => {
  return axios({
    method: id ? 'put' : 'post',
    url: id ? `admin/home/banner/${id}` : 'admin/home/banner',
    data,
  })
}

export const deleteHomeBanner = (id) => {
  return axios({
    method: 'delete',
    url: `admin/home/banner/${id}`,
  })
}
