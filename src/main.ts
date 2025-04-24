import '@/assets/index.css';

import { createApp } from 'vue'
import App from './Index.vue'
import router from './router/index'

const app = createApp(App)

app.use(router)

app.mount('#app')
