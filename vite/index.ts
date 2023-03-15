import vue from "@vitejs/plugin-vue"
import { resolve } from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export default function setupPlugins(env:any,isBuild:boolean){
    const plugins = [vue(),vueJsx()]
    plugins.push(
        VueSetupExtend(),
        createHtmlPlugin({
            inject: {
                data: {
                    title: env.VITE_PROJECT_NAME,
                }
            }
        }),
        // * 使用 svg 图标
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [resolve(process.cwd(), "src/assets/icons")],
            // 指定symbolId格式
            symbolId: "icon-[dir]-[name]"
        }),
    )
    return plugins
}
