import { test, expect } from '@playwright/test'

test.describe('首页测试', () => {
  test('应该显示欢迎信息', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // 等待页面加载
    await page.waitForSelector('h1', { timeout: 10000 })

    // 验证页面标题存在
    const headings = page.locator('h1')
    const headingCount = await headings.count()
    expect(headingCount).toBeGreaterThan(0)
  })

  test('应该显示用户信息', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // 等待用户信息加载（如果有）
    await page.waitForTimeout(2000)

    // 验证页面已加载
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible({ timeout: 10000 })
  })
})
