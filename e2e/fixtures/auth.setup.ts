import { test as setup } from '@playwright/test'
import { login } from '../utils/helpers'
setup('authenticate', async ({ page }) => {
  // 登录
  await login(page, 'admin', 'password123')

  // 保存认证状态
  await page.context().storageState({ path: 'playwright/.auth/user.json' })
})
