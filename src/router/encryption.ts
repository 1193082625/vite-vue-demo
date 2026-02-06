import type { LocationQuery, LocationQueryRaw, LocationQueryValue } from 'vue-router'
import { AesEncryption } from '../utils/cipher'

const aes = new AesEncryption()

/**
 *
 * @description 加密:反序列化字符串参数
 */
export const stringifyQuery = (obj: LocationQueryRaw): string => {
  if (!obj) return ''
  const result = Object.keys(obj)
    .map(key => {
      const value = obj[key]
      if (value === undefined) return ''
      if (value === null) return key
      if (Array.isArray(value)) {
        const resArray: string[] = []
        value.forEach(item => {
          if (item === undefined) return
          if (item === null) {
            resArray.push(key)
          } else {
            resArray.push(`${key}=${item}`)
          }
        })
        return resArray.join('&')
      }
      return `${key}=${value}`
    })
    .filter(x => x.length > 0)
    .join('&')
  return result ? `?${aes.encryptByAES(result)}` : ''
}

/**
 *
 * @description 解密:反序列化字符串参数
 */
export const parseQuery = (query: string): LocationQuery => {
  let res: LocationQuery = {}
  let q = query.trim().replace(/^(\?|#|&)/, '')
  if (q.indexOf('&') > 0) {
    q.split('&').forEach(param => {
      const parts = param.replace(/\+/g, ' ').split('=')
      const key = parts.shift()
      const val = parts.length > 0 ? parts.join('=') : null
      if (key !== undefined) {
        if (res[key] === undefined) {
          res[key] = val
        } else if (Array.isArray(res[key])) {
          ;(res[key] as LocationQueryValue[]).push(val)
        } else {
          res[key] = [res[key] as LocationQueryValue, val]
        }
      }
    })
    return res
  }
  if (!q) return res

  const getResParams = (str: string) => {
    str.split('&').forEach(param => {
      const parts = param.replace(/\+/g, ' ').split('=')
      const key = parts.shift()
      const val = parts.length > 0 ? parts.join('=') : null
      if (key !== undefined) {
        if (res[key] === undefined) {
          res[key] = val
        } else if (Array.isArray(res[key])) {
          ;(res[key] as LocationQueryValue[]).push(val)
        } else {
          res[key] = [res[key] as LocationQueryValue, val]
        }
      }
    })
  }
  // 解密拆解参数
  const deQ = aes.decryptByAES(q)
  getResParams(deQ)
  // 如果解密后参数不存在，则按正常参数拆解
  const resultKeys = Object.keys(res)
  if (resultKeys.length === 1 && !resultKeys[0]) {
    res = {}
    getResParams(q)
  }
  return res
}
