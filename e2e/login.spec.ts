import { test, expect } from '@playwright/test'

test.describe('登录流程测试', () => {
  test.beforeEach(async ({ page }) => {
    // 每个测试前访问登录页
    await page.goto('/login')
    // 等待页面加载完成
    await page.waitForLoadState('networkidle')
  })

  test('应该显示登录表单', async ({ page }) => {
    // 使用更通用的选择器
    const inputs = page.locator('input')
    const usernameInput = inputs.nth(0)
    const passwordInput = inputs.nth(1)
    const submitButton = page.locator('button[type="submit"]').or(page.locator('button:has-text("Login")'))

    await expect(usernameInput).toBeVisible({ timeout: 10000 })
    await expect(passwordInput).toBeVisible({ timeout: 10000 })
    await expect(submitButton).toBeVisible({ timeout: 10000 })
  })

  test('登录成功应该重定向到首页', async ({ page }) => {
    const inputs = page.locator('input')
    await inputs.nth(0).fill('admin')
    await inputs.nth(1).fill('password123')

    // 等待 API 响应
    const responsePromise = page.waitForResponse(
      response => {
        const url = response.url()
        const method = response.request().method()
        return url.includes('/api/auth/login') && method === 'POST'
      },
      { timeout: 15000 }
    )

    await page.locator('button[type="submit"]').click()

    // 等待 API 响应完成
    await responsePromise

    // 等待跳转
    await expect(page).toHaveURL('/', { timeout: 10000 })
  })
})
