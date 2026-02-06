export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复问题
        'docs', // 文档更新
        'style', // 代码格式（不影响代码运行的变动）
        'refactor', // 重构代码（既不是新增功能，也不是修复问题的代码变动）
        'perf', // 性能优化
        'test', // 添加测试
        'chore', // 构建过程或辅助工具的变动
        'build', // 打包
        'ci', // CI配置
        'revert', // 回退
        'release', // 发布
        'wip', // 开发中
      ],
    ],
    // 类型必须小写
    'type-case': [2, 'always', 'lower-case'],
    // 类型不能为空
    'type-empty': [2, 'never'],
    // 作用域必须小写
    'scope-case': [2, 'always', 'lower-case'],
    // 主题必须小写
    'subject-case': [2, 'always', 'lower-case'],
    // 头部最大长度为 100 个字符
    'header-max-length': [2, 'always', 100],
    // 主体前面必须有一个空行
    'body-leading-blank': [2, 'always'],
  },
}
