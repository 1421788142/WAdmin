import { createApp } from 'vue'
import App from './App.vue'

// 引入路由
import router,{ setupRouter } from './router'
import configStore from '@/store/config'
// 引入插件管理
import { setupPlugins } from './plugins'

// 引入css样式表
import 'ant-design-vue/dist/antd.variable.min.css'
import '@/styles/common.scss'

// 导入自定义指令
import setDirectives from '@/directives'

// 定义app实例
async function bootstrap() {
    const app = createApp(App)
    setupRouter(app)
    setDirectives(app)
    await setupPlugins(app)
    // 先进行主题切换，否则会有卡屏现象
    import('@/hooks/useTheme').then(({useTheme})=>{
        let { 
            switchDark,
            setupGrey,
            setupColorblind,
            getConfigState
        } = useTheme()
        switchDark(getConfigState('isHasDark'))
        setupGrey(getConfigState('isHasGrey'))
        setupColorblind(getConfigState('isHasColorblind'))
    })
    // 当路由注册完成 && 主题已切换 再挂载app
    await router.isReady()
    app.mount('#app')
}
bootstrap()
