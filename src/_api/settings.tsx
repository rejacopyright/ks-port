import axios from './axios'

export const getSocial = () => {
  return axios({
    method: 'get',
    url: `settings/social`,
  })
}

export const updateSocial = (data: any) => {
  return axios({
    method: 'put',
    url: `admin/settings/social`,
    data,
  })
}

export const getContact = () => {
  return axios({
    method: 'get',
    url: `settings/contact`,
  })
}

export const updateContact = (data: any) => {
  return axios({
    method: 'put',
    url: `admin/settings/contact`,
    data,
  })
}
