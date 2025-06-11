import '@/assets/index.css';

import { createApp } from 'vue';
import App from './Index.vue';
import router from './router/index';
import { MotionPlugin } from '@vueuse/motion';
import { createHead } from '@vueuse/head'; // ✅ Nieuw

const app = createApp(App);

// ✅ Meta manager initialiseren
const head = createHead();

app.use(router);
app.use(MotionPlugin);
app.use(head); // ✅ Toepassen op app

app.mount('#app');

export default app;
