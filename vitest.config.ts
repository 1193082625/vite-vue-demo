import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', 'pinia', 'vitest'],
      dts: './auto-imports.d.ts',
      vueTemplate: true,
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
      },
    }),
  ],
  test: {
    // 使用happy-dom作为DOM环境（比jsdom更快）
    environment: 'happy-dom',
    // 启用全局API（这样就不需要import { describe, it, expect }）
    globals: true,
    // 测试文件匹配规则
    include: ['tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    // 排除文件匹配规则
    exclude: ['node_modules', 'dist', 'build', 'public', 'static'],
    // 测试前执行的设置文件
    setupFiles: ['./tests/setup.ts'],
    // 启用代码覆盖率
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules', 'dist', 'build', 'public', 'static', '*/*.d.ts', '*.config.{js,ts,cjs,json}'],
    },
    // 启用测试报告
    report: {
      reporter: ['text', 'json', 'html'],
      coverage: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
