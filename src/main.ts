import { createApp } from 'vue'
import "./assets/css/tailwindcss.css";
import App from './App.vue'

// 示例
import { ElMessage } from 'element-plus'
import http from "./http/http";
import router from './router'

import * as ELIcons from "@element-plus/icons-vue";

import { createPinia } from 'pinia'

import './mock/mock.js'

const app = createApp(App);
app.use(router)

for (const [key, component] of Object.entries(ELIcons)) {
  app.component(key, component)
}
app.config.globalProperties.$http = http;
app.config.globalProperties.$message = ElMessage;
app.use(createPinia())
app.mount('#app')
