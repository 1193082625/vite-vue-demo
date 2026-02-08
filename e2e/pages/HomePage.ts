import type { Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly heading: Locator
  readonly countButton: Locator
  readonly loginLink: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.locator('h1')
    // 修复：添加缺失的闭合引号
    this.countButton = page.locator('button[type="button"]')
    this.loginLink = page.locator('a[href="/login"]')
  }

  async goto() {
    await this.page.goto('/')
  }

  async clickCountButton() {
    await this.countButton.click()
  }

  async getCount(): Promise<number> {
    const text = await this.countButton.textContent()
    const match = text?.match(/count is (\d+)/)
    return match ? Number(match[1]) : 0
  }
}
