import { createApp } from 'vue'
import '@/assets/styles/style.css'
import App from './App.vue'
import './assets/styles/tailwind.css'
import 'ant-design-vue/dist/reset.css'
import '@/assets/styles/index.scss'
import pinia from '@/store'
import router from '@/router'
import { setupI18n } from '@/i18n'

const app = createApp(App)

app.use(pinia)
app.use(router)
setupI18n(app)

app.mount('#app')
