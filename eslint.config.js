import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import vuePlugin from 'eslint-plugin-vue'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  // 基础配置
  js.configs.recommended,

  // 全局忽略
  {
    ignores: ['node_modules/**', 'dist/**', '*.config.*', 'pnpm-lock.yaml'],
  },

  // vue文件配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        // 添加浏览器全局对象
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        navigator: 'readonly',
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    /**
     * "off" 或 0    ==>  关闭规则
     * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
     * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
     */
    rules: {
      ...prettierConfig.rules,

      // eslint 规则
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      'no-multiple-empty-lines': ['error', { max: 1 }], // 不允许多个空行
      'prefer-const': 'off', // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
      'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们
      'no-param-reassign': ['error', { props: false }], // 禁止修改函数参数
      'max-classes-per-file': 'off', // 禁止类超过一个文件

      // typescript 规则
      '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
      '@typescript-eslint/no-empty-function': 'error', // 禁止空函数
      '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
      '@typescript-eslint/ban-ts-comment': 'error', // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
      '@typescript-eslint/no-inferrable-types': 'off', // 禁止对初始化为数字、字符串或布尔值的变量或参数进行显式类型声明
      '@typescript-eslint/no-namespace': 'off', // 禁止使用 namespace 声明
      '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
      '@typescript-eslint/ban-types': 'off', // 禁止使用 any 类型
      '@typescript-eslint/no-var-requires': 'off', // 禁止使用 require 语句
      '@typescript-eslint/no-non-null-assertion': 'off', // 禁止使用 ! 断言
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
        },
      ],

      // vue 规则
      // 'vue/script-setup-uses-vars': 'error', // 要求在 script setup 中使用已定义的变量
      'vue/v-slot-style': 'error', // 要求 v-slot 指令的写法正确
      'vue/no-mutating-props': 'error', // 禁止修改组件的 props
      'vue/custom-event-name-casing': 'error', // 要求自定义事件名称符合 kebab-case 规范
      'vue/html-closing-bracket-newline': 'off', // 要求 HTML 闭合标签换行
      'vue/attribute-hyphenation': 'error', // 对模板中的自定义组件强制执行属性命名样式：my-prop="prop"
      'vue/attributes-order': 'off', // vue api使用顺序，强制执行属性顺序
      'vue/no-v-html': 'off', // 禁止使用 v-html
      'vue/require-default-prop': 'off', // 此规则要求为每个 prop 为必填时，必须提供默认值
      'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
      'vue/no-setup-props-destructure': 'off', // 禁止解构 props 传递给 setup
      'vue/max-len': 0, // 强制所有行都小于 80 个字符
      'vue/singleline-html-element-content-newline': 0, // 强制单行元素的内容折行

      // Prettier 规则
      'prettier/prettier': 'error', // 强制使用 prettier 格式化代码
    },
  },
  // js文件配置
  {
    files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        // 添加浏览器全局对象
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        navigator: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,

      // eslint 规则
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      'no-multiple-empty-lines': ['error', { max: 1 }], // 不允许多个空行
      'prefer-const': 'off', // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
      'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们
      'prettier/prettier': 'error', // 强制使用 prettier 格式化代码

      // TypeScript 规则
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
        },
      ],

      'prettier/prettier': 'error',
    },
  },
]
