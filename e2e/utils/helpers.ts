import type { Page } from '@playwright/test'

export async function login(page: Page, username: string, password: string) {
  await page.goto('/login')

  // 等待页面加载完成，包括 Vue 组件渲染
  await page.waitForLoadState('domcontentloaded')

  // 等待页面加载完成
  await page.waitForLoadState('networkidle', { timeout: 30000 })

  // 等待页面内容出现（等待 h1 标签，而不是 form）
  // 这样可以确保 Vue 组件已经渲染
  await page.waitForSelector('h1:has-text("Login")', { timeout: 15000 })

  // 方案：直接查找所有 input 元素，通过索引定位
  // Ant Design Vue 的输入框会渲染成 input 元素
  const inputs = page.locator('input', { timeout: 15000 })

  // 等待至少 2 个输入框出现（用户名和密码）
  await inputs.nth(0).waitFor({ state: 'visible', timeout: 15000 })
  await inputs.nth(1).waitFor({ state: 'visible', timeout: 15000 })

  // 填写用户名（第一个 input）
  await inputs.nth(0).fill(username)

  // 填写密码（第二个 input，可能是 password 类型或普通 input）
  // 先尝试找到 password 类型的 input
  const passwordInput = page.locator('input[type="password"]').or(inputs.nth(1))
  await passwordInput.fill(password)

  // 点击提交按钮
  const submitButton = page.locator('button[type="submit"]').or(page.locator('button:has-text("Login")'))
  await submitButton.waitFor({ state: 'visible', timeout: 10000 })
  await submitButton.click()

  await page.waitForURL('/', { timeout: 10000 })
}

// 等待api请求完成
export async function waitForApi(page: Page, urlPattern: string) {
  await page.waitForResponse(response => response.url().includes(urlPattern) && response.status() === 200)
}

// 截图辅助函数
export async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true })
}
