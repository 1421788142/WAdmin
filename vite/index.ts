import vue from "@vitejs/plugin-vue"
import { createHtmlPlugin } from "vite-plugin-html";
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import vueJsx from "@vitejs/plugin-vue-jsx";
export default function setupPlugins(env:any,isBuild:boolean){
    const plugins = [vue(),vueJsx()]
    plugins.push(
        VueSetupExtend(),
        createHtmlPlugin({
            inject: {
                data: {
                    title: env.VITE_PROJECT_NAME
                }
            }
        }),
    )
    return plugins
}
