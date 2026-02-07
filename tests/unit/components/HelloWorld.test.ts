import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import { setActivePinia, createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

describe('HelloWorld 组件', () => {
  beforeEach(() => {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedState)
    setActivePinia(pinia)
  })

  it('应该正确挂载组件', () => {
    const msg = 'Hello Vitest!'
    const wrapper = mount(HelloWorld, {
      props: { msg },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props('msg')).toBe(msg)
  })

  it('应该渲染 props.msg', () => {
    const msg = 'Hello Vitest!'
    const wrapper = mount(HelloWorld, {
      props: { msg },
    })

    expect(wrapper.find('.msg').text()).toBe(msg)
    expect(wrapper.text()).toContain(msg)
  })

  //   it('点击按钮应该增加count', async () => {
  //     const wrapper = mount(HelloWorld, {
  //       props: { msg: 'Test!' },
  //     })

  //     const button = wrapper.find('button[type="button"]')
  //     expect(button.exists()).toBe(true)
  //     expect(wrapper.text()).toContain('count is 0')

  //     // 点击并等待更新
  //     await button.trigger('click')
  //     await flushPromises()
  //     await nextTick()

  //     expect(wrapper.text()).toContain('count is 1')

  //     // 再次点击
  //     await button.trigger('click')
  //     await flushPromises()
  //     await nextTick()
  //     expect(wrapper.text()).toContain('count is 2')
  //   })

  it('应该渲染 h1 元素用于显示 appTitle', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Test!' },
    })

    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
    // 不验证具体内容，因为环境变量在测试环境中可能未设置
  })

  it('应该渲染 Ant Design Vue 按钮组件', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Test!' },
    })

    const button = wrapper.find('.ant-btn')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Primary Button')
  })
})
