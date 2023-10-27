import axios from './axios'

export const getBanner = () => {
  return axios({
    method: 'get',
    url: `banner`,
  })
}

export const detailBanner = (module: any) => {
  return axios({
    method: 'get',
    url: `banner/${module}`,
  })
}

export const editBanner = (data: any, module: any) => {
  return axios({
    method: 'put',
    url: `admin/banner/${module}`,
    data,
  })
}
