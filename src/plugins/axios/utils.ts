import { AxiosRequestConfig } from "axios";

import userStore from '@/store/user';

const baseURL = import.meta.env.VITE_API_URL as string
export function HandlingInterface(config: AxiosRequestConfig, options: RequestOptions): AxiosRequestConfig {
  let RequestConfig: AxiosRequestConfig = Object.assign({}, config)
  if (!options) return RequestConfig
  const { joinParamsToUrl, joinTime, apiUrl } = options

  // 是否替换url api为空则不替换
  if (apiUrl && apiUrl.length) {
    RequestConfig.baseURL = apiUrl
  } else {
    RequestConfig.baseURL = baseURL
  }

  // get方法默认映射参数
  RequestConfig.method === 'GET' ? joinParamsToUrlFn(config) : joinParamsToUrl && joinParamsToUrlFn(config)
  function joinParamsToUrlFn(config: AxiosRequestConfig) { // 拼接url
    let { url, data } = config
    if (!data) return
    let result = ''
    for (const propName of Object.keys(data)) {
      const value = data[propName];
      let part = encodeURIComponent(propName) + "=";
      if (value !== null && value !== "" && typeof (value) !== "undefined") {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
              let params = propName + '[' + key + ']';
              let subPart = encodeURIComponent(params) + "=";
              result += subPart + encodeURIComponent(value[key]) + "&";
            }
          }
        } else {
          result += part + encodeURIComponent(value) + "&";
        }
      }
    }
    result = result.slice(0, result.length - 1)
    RequestConfig.url = url + '?' + result
  }

  // 加入时间戳
  joinTime && setJoinTime(config)
  function setJoinTime(config: AxiosRequestConfig) {
    let { url } = config
    let [str, urlJoin] = ['', RequestConfig.url.split(url) || []]
    if (urlJoin.length) str = urlJoin[1].substring(0, 1) || null
    if (str === '?') RequestConfig.url += `&_t=${new Date().getTime()}`
    if (!str) RequestConfig.url += `?_t=${new Date().getTime()}`
  }
  return RequestConfig
}

export function setUpConfig(config: AxiosRequestConfig, options: RequestOptions) {
  let RequestConfig: AxiosRequestConfig = Object.assign({}, config)
  if (!options) return RequestConfig
  const { getToken } = userStore()
  const { ignoreCancelToken, withToken } = options

  // 是否headers携带令牌
  !ignoreCancelToken && cancelUrlToken()
  function cancelUrlToken() {
    RequestConfig.headers['Authorization'] = 'Bearer ' + getToken || ''
  }

  // 是否headers包含token
  withToken && headersToken()
  function headersToken() {
    RequestConfig.headers['token'] = getToken || ''
  }
  return RequestConfig
}