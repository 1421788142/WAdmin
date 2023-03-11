import { App } from "vue";
import { setupI18n } from "./language/setupI18n";
import { setupTailwindcss } from "./tailwindcss";
import { setupAntDesign } from "./antDesign";
import { setupPinia } from "./pinia";
import { autoRegister } from "./components";

import "driver.js/dist/driver.min.css";//引导
import 'virtual:svg-icons-register' //本地icon

export async function setupPlugins(app:App){
    setupPinia(app)
    setupI18n(app)
    setupTailwindcss()
    setupAntDesign(app)
    autoRegister(app)
}
