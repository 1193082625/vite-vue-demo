import { createApp } from 'vue'
import '@/assets/styles/style.css'
import App from './App.vue'
import './assets/styles/tailwind.css'
import 'ant-design-vue/dist/reset.css'
import '@/assets/styles/index.scss'
import pinia from '@/store'

createApp(App).use(pinia).mount('#app')
