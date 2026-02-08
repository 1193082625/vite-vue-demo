import Mock from 'mockjs'

export default [
  {
    url: '/api/user/:id',
    method: 'get',
    response: ({ url }) => {
      const id = url.split('/').pop()

      return {
        code: 200,
        message: 'success',
        success: true,
        data: Mock.mock({
          id: Number(id),
          name: '@cname',
          email: '@email',
          phone: /^1[3-9]\d{9}$/,
          address: '@county(true)',
          city: '@city',
          state: '@province',
          zip: '@zip',
          country: '中国',
          createdAt: '@datetime',
          updatedAt: '@datetime',
        }),
      }
    },
  },
  {
    url: '/api/auth/login',
    method: 'post',
    response: ({ body }) => {
      // 检查用户名和密码
      const { username, password } = body || {}

      // 如果用户名或密码错误，返回失败
      if (username !== 'admin' || password !== 'password123') {
        return {
          code: 401,
          message: '用户名或密码错误',
          success: false,
          data: null,
        }
      }

      // 登录成功
      return {
        code: 200,
        message: '登录成功',
        success: true,
        data: {
          token: Mock.Random.guid(),
          userInfo: Mock.mock({
            id: 1,
            name: '管理员',
            email: 'admin@example.com',
            phone: '13800138000',
            address: '北京市朝阳区',
            city: '北京',
            state: '北京',
            zip: '100000',
            country: '中国',
            createdAt: '@datetime',
            updatedAt: '@datetime',
          }),
        },
      }
    },
  },
  {
    url: '/api/auth/logout',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '退出成功',
        success: true,
        data: null,
      }
    },
  },
]
