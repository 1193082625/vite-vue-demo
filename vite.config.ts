import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
// Vue API 自动导入插件
import AutoImport from 'unplugin-auto-import/vite'
// 组件自动导入插件
import Components from 'unplugin-vue-components/vite'
// 组件自动导入解析器
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),  // Tailwind CSS v4 Vite 插件
    vue(),
    // Vue API 自动导入
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', 'pinia'],
      dts: true, // 生成类型声明文件
      eslintrc: {
        enabled: true, // 生成ESLint配置
      }
    }),
    // 组件自动导入
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // 禁用自动导入样式
        })
      ],
      dts: true, // 生成类型声明文件
    })
  ],
})
