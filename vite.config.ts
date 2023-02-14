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
    plugins: setupPlugins(env,isBuild),//挂载插件
    resolve: {
      alias:{
       '@': resolve(__dirname, 'src'),
       '~': resolve(__dirname, './'),
      },
    },
    server:{
      host:'0.0.0.0',
      port:5555
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
