import axios from './axios'

export const getAbout = () => {
  return axios({
    method: 'get',
    url: `about`,
  })
}

export const detailAbout = (scope) => {
  return axios({
    method: 'get',
    url: `about/${scope}`,
  })
}

export const updateAbout = (data, scope) => {
  return axios({
    method: 'put',
    url: `admin/about/${scope}`,
    data,
  })
}
