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

export const getHomeAssets = () => {
  return axios({
    method: 'get',
    url: 'home/assets',
  })
}

export const addEditHomeAssets = (data, id) => {
  return axios({
    method: id ? 'put' : 'post',
    url: id ? `admin/home/assets/${id}` : 'admin/home/assets',
    data,
  })
}

export const deleteHomeAssets = (id) => {
  return axios({
    method: 'delete',
    url: `admin/home/assets/${id}`,
  })
}
