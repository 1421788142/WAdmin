import { App } from 'vue'
import Antd from 'ant-design-vue';
import * as Icons from '@ant-design/icons-vue'
import 'ant-design-vue/dist/antd.less'

export function setupAntDesign(app: App) {
   const icons: any = Icons
   for (const i in icons) {
      app.component(i, icons[i])
   }
   app.use(Antd)
}