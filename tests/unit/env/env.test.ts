import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest'
import { getEnv } from '@/utils/env'

/**
 * vi.stubEnv 是 Vitest 提供的用于模拟环境变量的方法
 * 它接受两个参数：
 * 1. 环境变量名称
 * 2. 环境变量值
 * 它会在测试运行时将环境变量设置为指定的值
 * 在测试结束后，环境变量会恢复为原来的值
 * 这样我们就可以在测试中模拟环境变量，而不影响其他测试
 *
 * vi.resetModules 是 Vitest 提供的用于重置模块的方法
 */

describe('env 工具函数', () => {
  beforeEach(() => {
    // 每个测试前清理所有环境变量 stub
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  afterEach(() => {
    // 每个测试后也清理一次，确保不影响其他测试
    vi.unstubAllEnvs()
  })

  describe('getEnv.string', () => {
    it('应该返回环境变量的字符串值', () => {
      // Arrange: 准备（模拟环境变量）
      vi.stubEnv('VITE_APP_TITLE', '测试应用')

      // Act: 执行
      const result = getEnv.string('VITE_APP_TITLE')

      // Assert: 断言
      expect(result).toBe('测试应用')
    })

    it('应该返回默认值，当环境变量不存在时', () => {
      // Arrange: 确保环境变量不存在（先清理）
      vi.unstubAllEnvs()

      // Act: 执行
      const result = getEnv.string('NON_EXISTENT_KEY', '默认值')

      // Assert: 断言
      expect(result).toBe('默认值')
    })
  })

  describe('getEnv.number', () => {
    it('应该将字符串转换成数字', () => {
      vi.stubEnv('VITE_API_TIMEOUT', '1000')
      const result = getEnv.number('VITE_API_TIMEOUT')
      expect(result).toBe(1000)
    })

    it('应该返回默认值当转换失败时', () => {
      const result = getEnv.number('INVALID_NUMBER', 1000)
      expect(result).toBe(1000)
    })
  })

  describe('getEnv.boolean', () => {
    it('应该将"true"字符串转换成true', () => {
      vi.stubEnv('VITE_ENABLE_MOCK', 'true')
      const result = getEnv.boolean('VITE_ENABLE_MOCK')
      expect(result).toBe(true)
    })

    it('应该将其他值转换成false', () => {
      vi.stubEnv('VITE_ENABLE_MOCK', 'false')
      const result = getEnv.boolean('VITE_ENABLE_MOCK')
      expect(result).toBe(false)
    })
  })
})
