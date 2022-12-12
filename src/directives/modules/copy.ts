/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */
 import type { Directive, DirectiveBinding } from "vue";
 import { message } from 'ant-design-vue'
 interface ElType extends HTMLElement {
     copyData: string | number;
     __handleClick__: any;
 }
const copy: Directive = {
    // 模板渲染完后添加一个点击事件
     mounted(el: ElType, binding: DirectiveBinding) {
        el.copyData = binding.value;
        el.addEventListener("click", handleClick);
     },
    //  需要复制的值发生改变则重新将el.copyData赋值
     updated(el: ElType, binding: DirectiveBinding) {
         el.copyData = binding.value;
     },
    // 卸载模板移除事件
     beforeUnmount(el: ElType) {
         el.removeEventListener("click", el.__handleClick__);
     }
 };
 
 function handleClick(this: any) {
     const input = document.createElement("input");
     input.value = this.copyData.toLocaleString();
     document.body.appendChild(input);
     input.select();
     document.execCommand("Copy");//复制选中的文字到剪贴板
     document.body.removeChild(input);//复制完移除该标签
     message.success('复制成功');
 }
 export default copy;
 