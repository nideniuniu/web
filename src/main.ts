import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 示例
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import http from "./http/http";
import router from './router'

import { createPinia } from 'pinia'

const app = createApp(App);
app.use(router)
app.config.globalProperties.$http = http;
app.config.globalProperties.$message = ElMessage;

app.use(createPinia())
app.mount('#app')
