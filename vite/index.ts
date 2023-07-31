import vue from "@vitejs/plugin-vue"
import { resolve } from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { visualizer } from "rollup-plugin-visualizer";

export default function setupPlugins(env: ViteEnv, isBuild: boolean) {
    const plugins = [vue(), vueJsx()]
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
        env.VITE_REPORT && visualizer({
            open: true,  //注意这里要设置为true，否则无效
            filename: "stats.html", //分析图生成的文件名
            gzipSize: true, // 收集 gzip 大小并将其显示
            brotliSize: true, // 收集 brotli 大小并将其显示
        }),
    )
    return plugins
}
