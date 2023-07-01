import { Directive, DirectiveBinding } from 'vue'
interface ElType extends HTMLElement {
  __handleClick__: () => any
}

const permission: Directive = {
  mounted(el: ElType, binding: DirectiveBinding<[string, string[]]>) {
    if (typeof binding.value !== 'object' || binding.value.length !== 2) {
      throw 'callback must be a objcet'
    }
    let [key, keyAll] = binding.value
    let $key = key.split(',')
    let intersection = [...new Set(keyAll)].filter(x => [...new Set($key)].includes(x))
    if (intersection.join(',') !== $key.join(',')) {
      el.parentNode.removeChild(el)
    }
  }
}
export default permission
