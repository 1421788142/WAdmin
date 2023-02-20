import { App } from "vue";
import _ from 'loadsh'
import { setupI18n } from "./language/setupI18n";
import { setupTailwindcss } from "./tailwindcss";
import { setupAntDesign } from "./antDesign";
import { setupPinia } from "./pinia";

import "driver.js/dist/driver.min.css";//引导

export async function setupPlugins(app:App){
    setupPinia(app)
    setupI18n(app)
    setupTailwindcss()
    setupAntDesign(app)
    autoPegisterComponent(app)
    RegisterManuallyComponent(app)
}

// 自动注册组件
function autoPegisterComponent(app:App){
    // 获取组件 global这个文件加里面的默认全局注册
    const components = import.meta.globEager('../components/global/*.vue')
    Object.keys(components).forEach(key=>{
        const componentsName = key.split('/').pop()?.split('.').shift() as string
        app.component(_.camelCase(componentsName),components[key].default)
    })
}

// 手动注册组件
function RegisterManuallyComponent(app:App){
    const useModal = import.meta.globEager('../components/useModal/index.vue')
    const IconPicker = import.meta.globEager('../components/IconPicker/index.vue')
    const useTable = import.meta.globEager('../components/useTable/index.vue')
    const useTreeFilter = import.meta.globEager('../components/useTreeFilter/index.vue')
    const useForm = import.meta.globEager('../components/useForm/index.vue')
    const searchForm = import.meta.globEager('../components/searchForm/index.vue')
    const usePagination = import.meta.globEager('../components/usePagination/index.vue')
    const wangEditor = import.meta.globEager('../components/wangEditor/index.vue')
    const upload = import.meta.globEager('../components/upload/index.vue')
    const importData = import.meta.globEager('../components/importData/index.vue')
    const components = [
        { name:'useModal', component:useModal },
        { name:'iconPicker', component:IconPicker },
        { name:'useTable', component:useTable },
        { name:'useTreeFilter', component:useTreeFilter },
        { name:'useForm', component:useForm },
        { name:'searchForm', component:searchForm },
        { name:'usePagination', component:usePagination },
        { name:'wangEditor', component:wangEditor },
        { name:'upload', component:upload },
        { name:'importData', component:importData },
    ]

    components.forEach(item=>{
        Object.keys(item.component).forEach(key=>{
            app.component(_.camelCase(item.name),item.component[key].default)
        })
    })
}
