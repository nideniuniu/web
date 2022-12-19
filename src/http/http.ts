import axios from "axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
// 这里是pinia的仓库，这里有个问题
import { userStore } from "../store";
// 这里这么写完就会pinia会报错，应该在拦截器中写
//const stotre = userStore();
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";
//当前store的状态只包含用户信息，不和其他业务挂钩
const router = useRouter();
// 这里baseURL可以通过开发或者生产环境来区分
// 如果需要代理，就去vite.config.ts中配置
const http = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 5000,
});
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const user = userStore();
    // 如果token存在，则每个请求头都加上token
    const token = user.Token || window.localStorage.getItem('token');
    if (config.headers && token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config
  },
  (error: AxiosRequestConfig) => {
    return Promise.reject(error);
  }
)
http.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, (error) => {
  const user = userStore();
  if (error) {
    switch (error.response.code) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        user.Token = '';
        router.push('/login');
        break;
      case 500:
        // 返回 500
        ElMessage.error('服务器错误');
        break;
    }
  }
  return Promise.reject(error.response.data)
})
export default http;