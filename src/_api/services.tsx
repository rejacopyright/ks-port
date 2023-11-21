import axios from './axios'

export const getServices = (params = {}) => {
  return axios({
    method: 'get',
    url: 'services',
    params,
  })
}

export const detailServices = (id: any) => {
  return axios({
    method: 'get',
    url: `services/${id}`,
  })
}

export const addEditServices = (data: any, id: any) => {
  return axios({
    method: id ? 'put' : 'post',
    url: id ? `admin/services/${id}` : 'admin/services',
    data,
  })
}

export const deleteServices = (id: any) => {
  return axios({
    method: 'delete',
    url: `admin/services/${id}`,
  })
}

export const howToOrderServices = () => {
  return axios({
    method: 'get',
    url: `services`,
    params: { type: 'how-to-order' },
  })
}

export const editHowToOrder = (data: any) => {
  return axios({
    method: 'put',
    url: 'admin/services/category/how-to-order',
    data,
  })
}
