module.exports = {
  // 继承规则
  extends: [
    'stylelint-config-standard', // 配置 stylelint 拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-recess-order', // 配置 stylelint css 属性书写顺序插件,
    'stylelint-config-standard-scss', // 配置 stylelint scss 插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-tailwindcss',
  ],
  overrides: [
    // 扫描 .vue/html 文件中的 <style> 标签内的样式
    {
      files: ['**/*.{vue,html}'],
      // 使用 postcss-html 解析器
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'keyframes-name-pattern': null, // 强制关键帧名称的格式
    'custom-property-pattern': null, // 强制自定义属性的格式
    'selector-id-pattern': null, // 强制选择器 ID 的格式
    'declaration-block-no-redundant-longhand-properties': null, // 禁止冗余的长属性
    'function-url-quotes': 'always', // URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'color-hex-length': 'long', // 指定 16 进制颜色的简写或扩写 "short(16进制简写)"|"long(16进制扩写)"
    'rule-empty-line-before': 'never', // 要求或禁止在规则之前的空行 "always(规则之前必须始终有一个空行)"|"never(规则前绝不能有空行)"|"always-multi-line(多行规则之前必须始终有一个空行)"|"never-multi-line(多行规则之前绝不能有空行)"
    'font-family-no-missing-generic-family-keyword': null, // 禁止在字体族名称列表中缺少通用字体族关键字
    'property-no-unknown': null, // 禁止未知的属性
    'no-empty-source': null, // 禁止空源码
    'selector-class-pattern': null, // 强制选择器类名的格式
    'value-no-vendor-prefix': null, // 关闭 vendor-prefix (为了解决多行省略 -webkit-box)
    'no-descending-specificity': null, // 不允许较低特异性的选择器出现在覆盖较高特异性的选择器
    // 禁止未知的伪类
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'],
      },
    ],
    // 禁止未知的 at-rule
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply'],
      },
    ],
    // 禁止未知的函数
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['constant'],
      },
    ],
  },
  ignoreFiles: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx', 'node_modules/**', 'dist/**'],
}
