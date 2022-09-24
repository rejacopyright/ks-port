import ax from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import { api } from './config'

const axios = ax.create({
  baseURL: api,
  withCredentials: false,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json, application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    // 'Access-Control-Max-Age': 0,
    // 'Cache-Control': 'no-cache',
  },
})

const storage = JSON.parse(Cookies.get('persist:root') || '{}')?.user
const { token } = JSON.parse(storage || '{}')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
axios.interceptors.request.use(
  (req) => {
    if (req.method === 'get' && req?.params) {
      req.paramsSerializer = () =>
        qs.stringify(req.params, {
          encode: false,
          arrayFormat: 'brackets',
          indices: false,
          strictNullHandling: true,
          skipNulls: true,
        })
    }
    return req
  },
  (error) => Promise.reject(error)
)
axios.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
)

export default axios
