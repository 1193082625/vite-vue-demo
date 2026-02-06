/**
 * API 响应基础结构
 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

/**
 * 分页响应结构
 */
export interface PageResponse<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

/**
 * 请求配置
 */
export interface RequestConfig {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  params?: Record<string, any>
  data?: Record<string, any>
  headers?: Record<string, string>
  timeout?: number
  showLoading?: boolean
  showError?: boolean
}
