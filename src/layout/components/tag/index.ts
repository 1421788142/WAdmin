import { reactive, toRefs } from "vue"
import { storeToRefs } from 'pinia'
import type { Router, RouteLocationNormalized } from "vue-router"
import userStore from '@/store/user';
import { message } from "ant-design-vue";
import emitter from "@/plugins/mitt";

export interface itemType {
    title: string,
    icon: string,
    type?: string,
    disabled?: boolean
}

interface stateInterface {
    tabItmes: itemType[],//操作菜单
}
export const useTagData = (route?: RouteLocationNormalized, router?: Router) => {
    const state = reactive<stateInterface>({
        tabItmes: [
            {
                title: '重新加载',
                icon: 'reload-outlined',
                disabled: true,
                type: 'refresh'
            },
            {
                title: '关闭标签页',
                icon: 'close-outlined',
                type: 'closeCurrent',
            },
            {
                title: '关闭左侧标签页',
                icon: 'vertical-right-outlined',
                type: 'closeLeft',
                disabled: true
            },
            {
                title: '关闭右侧标签页',
                icon: 'vertical-left-outlined',
                type: 'closeRight',
                disabled: true
            },
            {
                title: '关闭其他标签页',
                icon: 'pic-center-outlined',
                type: 'closeOther',
                disabled: true
            },
        ],
    })

    const { historyMenuTag } = storeToRefs(userStore())
    const set = () => {
        //如果是登录或错误页面则不缓存菜单
        if (['/login', '/403', '/404'].includes(route.path)) return
        //是否已经存在历史页签
        const isHas = historyMenuTag.value.some(x => x.path === route.path)
        if (!isHas) {
            historyMenuTag.value.unshift({
                title: route.meta.title as string,
                path: route.path,
                params: route?.params,
                parentPath: (route.meta.parentPath || '') as string
            })
        }
        if (historyMenuTag.value.length > 50) {
            historyMenuTag.value.pop()
        }
    }

    const setupMenuTag = (callBark: (tag: menuItem) => void) => {
        historyMenuTag.value.forEach(tag => {
            if (tag.path === route.path) {
                callBark(tag)
            }
        })
    }

    emitter.on('setupMenuTag', setupMenuTag)

    const closeCurrent = (value: menuItem) => {
        let length = historyMenuTag.value.length
        if (length <= 1) return message.error('不能关闭所有标签')
        let current = historyMenuTag.value.findIndex(x => x.path === value.path)
        historyMenuTag.value.splice(current, 1)
        if (current === historyMenuTag.value.length && value.path === route.path) {
            router.push({ path: historyMenuTag.value.at(-1).path })
        } else if (value.path === route.path) {
            router.push({ path: historyMenuTag.value.at(current).path })
        }
    }

    // 关闭左侧
    const closeLeft = (value: menuItem) => {
        let index = historyMenuTag.value.findIndex(x => value.path == x.path)
        historyMenuTag.value.splice(0, index)
    }
    // 关闭右侧
    const closeRight = (value: menuItem) => {
        let index = historyMenuTag.value.findIndex(x => value.path == x.path)
        historyMenuTag.value.splice(index + 1, historyMenuTag.value.length)
    }
    // 关闭全部
    const closeAll = () => {
        historyMenuTag.value = []
        router.push({ path: '/' })
    }
    // 关闭其他
    const closeOther = (value: menuItem) => {
        historyMenuTag.value = historyMenuTag.value.filter(x => value.path == x.path)
    }

    return {
        ...toRefs(state),
        historyMenuTag,
        set,
        closeCurrent,
        closeLeft,
        closeRight,
        closeAll,
        closeOther
    }
}