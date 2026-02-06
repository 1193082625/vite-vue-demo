/**
 * 环境变量工具函数
 */
export const getEnv = {
  string: (key: string, defaultValue = ''): string => import.meta.env[key] || defaultValue,
  number: (key: string, defaultValue = 0): number =>
    import.meta.env[key] ? Number(import.meta.env[key]) : defaultValue,
  boolean: (key: string, defaultValue = false): boolean =>
    import.meta.env[key] ? import.meta.env[key] === 'true' : defaultValue,
  all: () => import.meta.env,
} as const

export const env = {
  // 应用信息
  appTitle: getEnv.string('VITE_APP_TITLE'),
  appVersion: getEnv.string('VITE_APP_VERSION'),
  // 应用信息
  apiBaseUrl: getEnv.string('VITE_API_BASE_URL'),
  apiTimeout: getEnv.number('VITE_API_TIMEOUT'),
  // 功能开关
  enableMock: getEnv.boolean('VITE_ENABLE_MOCK'),
  enableDevtools: getEnv.boolean('VITE_ENABLE_DEVTOOLS'),
  // 其他配置
  uploadMaxSize: getEnv.number('VITE_UPLOAD_MAX_SIZE'),

  // 开发环境判断
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
}
