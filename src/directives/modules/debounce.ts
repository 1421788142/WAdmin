/**
 * v-debounce 防抖就是指触发事件后在 n 秒内函数只能执行一次
 * 按钮防抖指令，可自行扩展至input
 * 接收参数：function类型
 * 使用：给 Dom 加上 v-debounce 及回调函数即可
 * <button v-debounce="debounce">防抖按钮</button>
 */
import { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
    __handleClick__:()=>any;
}
const debounce:Directive = {
    mounted(el:ElType,binding:DirectiveBinding) {
        if(typeof binding.value !=='function'){ //判断标签上使用的自定义防抖的回调是否是函数
            throw "callback must be a function";
        };
        let timer: NodeJS.Timeout | null = null; //防抖定时器
        el.__handleClick__ = function(){
            if(timer){
                clearInterval(timer);
            };
            timer = setTimeout(()=>{
                binding.value(); //一秒钟后直行防抖事件
            },500);
        }
        el.addEventListener('click',el.__handleClick__);
    },
    beforeUnmount(el:ElType){
        el.removeEventListener('click',el.__handleClick__);
    }
};
export default debounce