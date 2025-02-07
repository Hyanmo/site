import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // 导入路由配置

const app = createApp(App);

// 使用路由
app.use(router);

// 挂载 Vue 应用
app.mount('#app');
