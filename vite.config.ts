import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver';
import path from 'path'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        // 自动导入 Element Plus 相关函数，如: ElMessage，ElMessageBox
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    Components({
      resolvers: [
        // 自动导入 Element plus 组件
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'] // 重点
        })
      ],
    }),
    Icons({
      autoInstall: true
    })
  ],
  //静态资源服务的文件夹
  publicDir: "public",
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "@_c": path.resolve('src/components'),

    },
    // 导入时想要省略的扩展名列表
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  //预览设置  npm run build　打包之后，会生成dist文件 然后运行npm run preview；vite会创建一个服务器来运行打包之后的文件
  preview: {
    port: 4000,//端口号
    host: 'localhost',
    open: true,//是否自动打开浏览器
  },
  //开发配置  npm run dev
  server: {
    port: 3001,//端口号
    strictPort: true,//是否是严格的端口号，如果true，端口号被占用的情况下，vite会退出
    host: 'localhost',
    cors: true,//为开发服务器配置 CORS , 默认启用并允许任何源
    https: false,//是否支持http2 如果配置成true 会打开https://localhost:3001/xxx;
    open: true,//是否自动打开浏览器
    // 反向代理 跨域配置
    proxy: {
      '/api': {
        target: "https://xxxx.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // 打包配置 npm run build
  build: {
    //指定输出路径
    outDir: "dist",
    //生成静态资源的存放路径
    assetsDir: "assets",
    //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    assetsInlineLimit: 4096,
    //启用/禁用 CSS 代码拆分
    cssCodeSplit: true,
    //构建后是否生成 source map 文件
    sourcemap: false,
    //自定义底层的 Rollup 打包配置
    rollupOptions: {
      input: {//可以配置多个，表示多入口
        index: path.resolve(__dirname, "index.html"),
        // project:resolve(__dirname,"project.html")
      },
      output: {
        // chunkFileNames:'static/js/[name]-[hash].js',
        // entryFileNames:"static/js/[name]-[hash].js",
        // assetFileNames:"static/[ext]/name-[hash].[ext]"
      }
    },
    //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    emptyOutDir: true,
    //chunk 大小警告的限制
    chunkSizeWarningLimit: 500
  }
})