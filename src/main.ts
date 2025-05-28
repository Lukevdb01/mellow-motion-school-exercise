import '@/assets/index.css';

import { createApp } from 'vue'
import App from './Index.vue'
import router from './router/index'
import { MotionPlugin } from '@vueuse/motion';

const app = createApp(App)

app.use(router);
app.use(MotionPlugin);
app.mount('#app');

export default app;