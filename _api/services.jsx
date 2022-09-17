import axios from './axios'

export const getServices = (params = {}) => {
  return axios({
    method: 'get',
    url: 'services',
    params,
  })
}

export const detailServices = (id) => {
  return axios({
    method: 'get',
    url: `services/${id}`,
  })
}

export const addEditServices = (data, id) => {
  return axios({
    method: id ? 'put' : 'post',
    url: id ? `admin/services/${id}` : 'admin/services',
    data,
  })
}

export const deleteServices = (id) => {
  return axios({
    method: 'delete',
    url: `admin/services/${id}`,
  })
}
