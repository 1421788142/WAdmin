import { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
export function setupPinia(app:App){
    const pinia = createPinia()
    pinia.use(piniaPluginPersist)
    app.use(pinia)
}