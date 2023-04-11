// @ts-ignore
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
// @ts-ignore
import setupPlugins from './vite'
// @ts-ignore
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const isBuild = command === 'build' ? true : false
  return {
    plugins: setupPlugins(env, isBuild),//挂载插件
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~': resolve(__dirname, './'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 55
    },
    build: {
      outDir: "dist",
      assetsDir: "assets", //指定静态资源存放路径
      sourcemap: false, //是否构建source map 文件
      // terserOptions: {
      //   // 生产环境移除console
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },
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
