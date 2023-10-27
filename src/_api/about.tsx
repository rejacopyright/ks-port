import axios from './axios'

export const getAbout = () => {
  return axios({
    method: 'get',
    url: `about`,
  })
}

export const detailAbout = (scope: any) => {
  return axios({
    method: 'get',
    url: `about/${scope}`,
  })
}

export const updateAbout = (data: any, scope: any) => {
  return axios({
    method: 'put',
    url: `admin/about/${scope}`,
    data,
  })
}
