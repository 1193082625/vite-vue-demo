import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import type { PluginOption } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  // 根据环境变量控制是否启用 mock
  const env = loadEnv(mode, process.cwd(), '')
  const enableMock = env.VITE_ENABLE_MOCK === 'true' || command === 'serve' // 开发环境默认启用 mock

  return {
    envDir: './env',
    plugins: [
      vue() as PluginOption,
      tailwindcss() as PluginOption,
      svgLoader() as PluginOption,
      viteMockServe({
        mockPath: 'mock',
        enable: enableMock, // 根据环境变量控制是否启用
        watchFiles: true, // 监听文件变化
      }) as PluginOption,
      AutoImport({
        imports: ['vue'],
        dts: './auto-imports.d.ts',
        vueTemplate: true,
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
        },
      }) as PluginOption,
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        deep: true,
        dts: './components.d.ts',
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
          }),
        ],
      }) as PluginOption,
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/variables.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173, // 开发服务器端口
      // cors: true, // 启用CORS
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          // secure: false, // 不验证SSL证书
          // rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
        },
      },
    },
  }
})
