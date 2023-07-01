import { computed } from "vue"

/**
 * @description v-model 
 * @param {object} props 数据源
 * @param {String} propName 需要双向绑定的属性
 * @param {Function} emit 触发的事件
 * @param {object} mergeObj 需要合并的对象
 * @return object
 * */

export const useVModel = (props: object, propName: string, emit: EmitType, mergeObj: object = {}) => {
    return computed({
        get() {
            return new Proxy(props[propName], {
                set(obj, name, value) {
                    emit('update:' + propName, {
                        ...mergeObj,
                        ...obj,
                        [name]: value
                    })
                    return true
                }
            })
        },
        set(val) {
            emit('update:' + propName, val)
        }
    });
}