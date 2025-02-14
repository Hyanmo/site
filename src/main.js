import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // 导入路由配置
import axios from 'axios';


const app = createApp(App);

// 使用路由
app.use(router);

// 在 Vue 应用实例中添加 axios
app.config.globalProperties.$axios = axios; // 全局注册 axios

// 挂载 Vue 应用
app.mount('#app');

