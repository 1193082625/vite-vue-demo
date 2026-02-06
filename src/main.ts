import { createApp } from 'vue'
import '@/assets/styles/style.css'
import App from './App.vue'
import './assets/styles/tailwind.css'
import 'ant-design-vue/dist/reset.css'
import '@/assets/styles/index.scss'
import pinia from '@/store'
import router from '@/router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
