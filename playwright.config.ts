import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright 配置
 * 参考: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // 测试目录
  testDir: 'e2e',
  // 测试超时时间（30秒）
  timeout: 30000,
  // 期望超时时间（10秒）
  expect: {
    timeout: 10000,
  },
  // 并行运行测试
  fullyParallel: true,
  // CI模式下失败时不重试
  forbidOnly: !!process.env.CI,
  // CI模式下重试2次
  retries: process.env.CI ? 2 : 0,
  // 并行工作进程数
  workers: process.env.CI ? 1 : undefined,
  // 测试报告
  reporter: [
    ['list'],
    ['html', { outputFolder: 'test-playwright-results/html-report' }], // HTML 报告目录
    ['json', { outputFile: 'test-playwright-results/e2e-results.json' }], // JSON 报告
  ],
  // 输出目录（截图、视频等）
  outputDir: 'test-playwright-results/test-results',
  // 共享配置
  use: {
    baseURL: 'http://localhost:5173',
    // 截图配置
    screenshot: 'only-on-failure',
    // 视频配置
    video: 'only-on-failure',
    // 追踪配置
    trace: 'on-first-retry',
  },
  // 测试项目(不同浏览器)
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // 使用保存的认证状态
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    // {
    //     name: 'firefox', use: { ...devices['Desktop Firefox'] }
    // },
    // {
    //     name: 'webkit', use: { ...devices['Desktop Safari'] }
    // }
  ],
  // web服务器配置（启动开发服务器）
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
