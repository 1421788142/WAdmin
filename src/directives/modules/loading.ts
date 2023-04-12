// /**
//  * v-loading 防抖就是指触发事件后在 n 秒内函数只能执行一次
//  * 按钮防抖指令，可自行扩展至input
//  * 接收参数：function类型
//  * 使用：给 Dom 加上 v-loading 及回调函数即可
//  * <div v-loading="loading">防抖按钮</div>
//  */
import { Directive, DirectiveBinding } from "vue";
import loadingVue from '@/components/loading.vue'
import { createApp } from 'vue'
let hasPosition = false
const loading: Directive = {
    mounted(el, binding: DirectiveBinding) {
        const mask = createApp(loadingVue);
        el.instance = mask.mount(document.createElement('div'));
        if (binding.value) appendEl(el);
    },
    updated(el, binding: DirectiveBinding) {
        if (binding.value !== binding.oldValue) {
            binding.value ? appendEl(el) : removeEl(el)
        }
    }
}

// 插入元素
const appendEl = (el) => {
    console.log(!!el.style.position)
    hasPosition = !el.style.position
    console.log(hasPosition)
    // 给父元素加个定位，让loading元素定位,
    el.style.position = 'relative';
    el?.appendChild(el.instance.$el);
};
// 移除元素
const removeEl = (el) => {
    el.style.position = '';
    let $el = el.instance.$el;
    if (el?.contains($el)) {
        el?.removeChild(el.instance.$el);
    }
};

export default loading