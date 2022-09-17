import axios from './axios'

export const getMedia = (params = {}) => {
  return axios({
    method: 'get',
    url: 'news/media',
    params,
  })
}

export const detailMedia = (id) => {
  return axios({
    method: 'get',
    url: `news/media/${id}`,
  })
}

export const addEditMedia = (data, id) => {
  return axios({
    method: id ? 'put' : 'post',
    url: id ? `admin/news/media/${id}` : 'admin/news/media',
    data,
  })
}

export const deleteMedia = (id) => {
  return axios({
    method: 'delete',
    url: `admin/news/media/${id}`,
  })
}
