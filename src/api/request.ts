import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosRequestHeaders,
} from 'axios'
import type { ApiResponse, RequestConfig } from '@/types/api'
import { env } from '@/utils/env'
import { useUserStore } from '@/store/user'
import { message } from 'ant-design-vue'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: env.enableMock ? '/' : env.apiBaseUrl,
  timeout: env.apiTimeout,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore()

    // 添加 token
    if (userStore.token && config.headers) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }

    // 添加时间戳（防止缓存）
    if (config.method === 'get' && config.params) {
      config.params._t = Date.now()
    }

    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data

    // 如果返回的状态码不是 200，说明有错误
    if (res.code !== 200 && res.code !== 0) {
      message.error(res.message || '请求失败')

      // 401: Token 过期
      if (res.code === 401) {
        const userStore = useUserStore()
        userStore.logOut()
        // 可以在这里跳转到登录页
        window.location.href = '/login'
      }

      // 返回完整的 ApiResponse，让调用方可以处理错误信息
      return Promise.reject(res)
    }

    // 成功时返回完整的 response，在 request 函数中提取 data
    return response
  },
  error => {
    console.error('Response error:', error)

    let errorMessage = '请求失败'

    if (error.response) {
      // 服务器返回了错误状态码
      switch (error.response.status) {
        case 400:
          errorMessage = '请求参数错误'
          break
        case 401: {
          errorMessage = '未授权，请重新登录'
          const userStore = useUserStore()
          userStore.logOut()
          window.location.href = '/login'
          break
        }
        case 403:
          errorMessage = '拒绝访问'
          break
        case 404:
          errorMessage = '请求地址不存在'
          break
        case 500:
          errorMessage = '服务器内部错误'
          break
        default:
          errorMessage = error.response.data?.message || `请求失败: ${error.response.status}`
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      errorMessage = '网络连接失败，请检查网络'
    } else {
      // 其他错误
      errorMessage = error.message || '请求失败'
    }

    message.error(errorMessage)
    return Promise.reject(error)
  }
)

/**
 * 请求方法封装
 */
export function request<T = any>(config: RequestConfig): Promise<T | ApiResponse<T>> {
  const { url, method = 'GET', params, data, headers, timeout, showLoading = false } = config

  const axiosConfig: InternalAxiosRequestConfig = {
    url,
    method,
    timeout: timeout || env.apiTimeout,
    headers: headers as AxiosRequestHeaders,
  }

  if (method === 'GET') {
    axiosConfig.params = params
  } else {
    axiosConfig.data = data
  }

  // 显示加载提示
  if (showLoading) {
    // 可以使用全局 loading，这里简化处理
    console.log('Loading...')
  }

  // 调用 service.request 返回 AxiosResponse，然后处理返回值
  return service.request<ApiResponse<T>>(axiosConfig).then(
    response => {
      const res = response.data
      // 如果响应正常，返回最终的 data
      if (res.code === 200 || res.code === 0) {
        return res.data
      }
      // 否则返回完整的 ApiResponse
      return res
    },
    error => {
      // 如果是 ApiResponse 类型的错误（从拦截器 reject 的），直接返回
      if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
        return Promise.reject(error)
      }
      // 其他错误继续 reject
      return Promise.reject(error)
    }
  )
}

/**
 * GET 请求
 */
export function get<T = any>(
  url: string,
  params?: Record<string, any>,
  config?: Partial<RequestConfig>
): Promise<T | ApiResponse<T>> {
  return request<T>({
    url,
    method: 'GET',
    params,
    ...config,
  })
}

/**
 * POST 请求
 */
export function post<T = any>(
  url: string,
  data?: Record<string, any>,
  config?: Partial<RequestConfig>
): Promise<T | ApiResponse<T>> {
  return request<T>({
    url,
    method: 'POST',
    data,
    ...config,
  })
}

/**
 * PUT 请求
 */
export function put<T = any>(
  url: string,
  data?: Record<string, any>,
  config?: Partial<RequestConfig>
): Promise<T | ApiResponse<T>> {
  return request<T>({
    url,
    method: 'PUT',
    data,
    ...config,
  })
}

/**
 * DELETE 请求
 */
export function del<T = any>(
  url: string,
  params?: Record<string, any>,
  config?: Partial<RequestConfig>
): Promise<T | ApiResponse<T>> {
  return request<T>({
    url,
    method: 'DELETE',
    params,
    ...config,
  })
}

export default service
