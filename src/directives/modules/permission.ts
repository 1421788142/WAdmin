import { Directive, DirectiveBinding } from 'vue'
interface ElType extends HTMLElement {
  __handleClick__: () => any
}
const permission: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    if (typeof binding.value !== 'object') {
      throw 'callback must be a objcet'
    }
    !binding.value[1]?.some((x:string) => x === binding.value[0]) ? el.parentNode.removeChild(el) : ''
  }
}
export default permission
