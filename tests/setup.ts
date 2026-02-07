import { config } from '@vue/test-utils'
import AntDesignVue from 'ant-design-vue'
import { createI18n } from 'vue-i18n'
import zhCN from '@/i18n/lang/zh-CN'
import enUS from '@/i18n/lang/en-US'

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

// 全局配置 Vue Test Utils
// 注意：Pinia 不在全局配置，而是在每个测试中单独创建，避免状态污染
config.global.plugins = [i18n, AntDesignVue]

// 全局 mocks
config.global.mocks = {
  $t: (key: string) => key,
}
