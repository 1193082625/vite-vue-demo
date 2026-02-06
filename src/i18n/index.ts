import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'

// 支持的语言列表
export const supportedLocales = [
  { code: 'zh-CN', name: '中文' },
  { code: 'en-US', name: 'English' },
] as const

export type SupportedLocale = (typeof supportedLocales)[number]['code']

// 默认语言
const defaultLocale: SupportedLocale = 'zh-CN'

// 从 localStorage 获取保存的语言设置
const getSavedLocale = (): SupportedLocale => {
  const saved = localStorage.getItem('locale')
  return saved && supportedLocales.some(loc => loc.code === saved) ? (saved as SupportedLocale) : defaultLocale
}

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getSavedLocale(),
  fallbackLocale: defaultLocale,
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
  globalInjection: true, // 全局注入 $t
})

// 设置语言
export const setLocale = (locale: SupportedLocale) => {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  // 设置 HTML lang 属性
  document.documentElement.lang = locale
}

// 获取当前语言
export const getLocale = (): SupportedLocale => {
  return i18n.global.locale.value as SupportedLocale
}

// 安装 i18n 插件
export const setupI18n = (app: App) => {
  app.use(i18n)
  // 初始化时设置 HTML lang 属性
  document.documentElement.lang = getLocale()
}

export default i18n
