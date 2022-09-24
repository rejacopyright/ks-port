import axios from './axios'

export const getUsers = () => {
  return axios({
    method: 'get',
    url: 'admin/user',
  })
}

export const detailUser = (id) => {
  return axios({
    method: 'get',
    url: `admin/user/${id}`,
  })
}

export const addEditUser = (data, id) => {
  return axios({
    method: id ? 'put' : 'post',
    url: id ? `admin/user/${id}` : 'admin/user',
    data,
  })
}

export const deleteUser = (id) => {
  return axios({
    method: 'delete',
    url: `admin/user/${id}`,
  })
}
