import { App } from "vue";
import copy from './modules/copy'
import debounce from './modules/debounce'
import throttle from './modules/throttle'
import longpress from './modules/longpress'
import permission from './modules/permission'
// 所以指令集合
const directivesList: any = {
	copy,
	debounce,
    throttle,
    longpress,
    permission
};
const setDirectives = (app:App)=>{
    const directives = {
        install:function(app:App<Element>) {
            Object.keys(directivesList).forEach(key => {
                // 注册所有自定义指令
                app.directive(key, directivesList[key]);
            });
        }
    }
    app.use(directives)
}

export default setDirectives