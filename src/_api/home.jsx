import axios from './axios'

export const getHomePopup = () => {
  return axios({
    method: 'get',
    url: 'home/popup',
  })
}

export const addEditHomePopup = (data, id) => {
  return axios({
    method: id ? 'put' : 'post',
    url: id ? `admin/home/popup/${id}` : 'admin/home/popup',
    data,
  })
}

export const statusHomePopup = (data, id) => {
  return axios({
    method: 'put',
    url: `admin/home/popup/${id}/status`,
    data,
  })
}

export const deleteHomePopup = (id) => {
  return axios({
    method: 'delete',
    url: `admin/home/popup/${id}`,
  })
}

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

export const getHomeCustomer = (params = {}) => {
  return axios({
    method: 'get',
    url: 'home/customer',
    params,
  })
}

export const addEditHomeCustomer = (data, id) => {
  return axios({
    method: id ? 'put' : 'post',
    url: id ? `admin/home/customer/${id}` : 'admin/home/customer',
    data,
  })
}

export const deleteHomeCustomer = (id) => {
  return axios({
    method: 'delete',
    url: `admin/home/customer/${id}`,
  })
}
