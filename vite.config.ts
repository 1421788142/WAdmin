// @ts-ignore
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
// @ts-ignore
import setupPlugins from './vite'
// @ts-ignore
import { resolve } from 'path'
// https://vitejs.dev/config/
import { wrapperEnv } from './src/utils/getEnvConfig'

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

/** 设置别名 */
const alias: Record<string, string> | Array<{ find: string | RegExp, replacement: string }> = {
  "@": pathResolve("src"),
  "~": pathResolve("./"),
  "img": pathResolve("./src/assets/image/"),
  "com": pathResolve("./src/components/"),
  "api": pathResolve("./src/apis/"),
  "s": pathResolve("./src/styles/"),
  "u": pathResolve("./src/utils/"),
  "v": pathResolve("./src/views/"),
  "types": pathResolve("./src/types/"),
  "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
};

export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build' ? true : false
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    plugins: setupPlugins(viteEnv, isBuild),//挂载插件
    resolve: {
      alias,
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_DEV_OPEN,
      cors: true,
      // 跨域代理配置
      proxy: {
        "/api": {
          target: "https://www.fastmock.site/mock/c5fc1ef03a33b327e9ed7f5130bc17ca/WAdmin", // fastmock
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, "")
        }
      }
    },
    build: {
      outDir: "dist",
      assetsDir: "assets", //指定静态资源存放路径
      sourcemap: false, //是否构建source map 文件
      terserOptions: viteEnv.VITE_DROP_CONSOLE ? {
        // 生产环境移除console
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      } : {},
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  }
})
