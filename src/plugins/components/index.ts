import { App } from "vue"
import _ from 'loadsh'

/**
 * 自动注册全局组件
 * 规则:组件目录下的index.vue已父文件夹名进行注册
 * components下的文件不进行注册组件污染
 * @param app
 */

export const autoRegister = async (app:App)=>{
    const components = import.meta.globEager('@/components/global/*/index.vue')
    Object.keys(components).forEach((key) => {
        let componentName = key.split('../components/global/')?.pop()?.split('/index.vue').shift()
        app.component(_.camelCase(`w-${componentName}`),components[key].default)
    })
}