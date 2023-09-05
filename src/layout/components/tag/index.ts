import { reactive, toRefs } from "vue"
import { storeToRefs } from 'pinia'
import type { Router, RouteLocationNormalized } from "vue-router"
import userStore from '@/store/user';
import { message } from "ant-design-vue";
import emitter from "@/plugins/mitt";
import { $$t } from "@/plugins/language/setupI18n";

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
                title: $$t('layouts.reload'),
                icon: 'reload-outlined',
                disabled: true,
                type: 'refresh'
            },
            {
                title: $$t('layouts.closeTab'),
                icon: 'close-outlined',
                type: 'closeCurrent',
            },
            {
                title: $$t('layouts.closeLeftTabs'),
                icon: 'vertical-right-outlined',
                type: 'closeLeft',
                disabled: true
            },
            {
                title: $$t('layouts.closeRightTabs'),
                icon: 'vertical-left-outlined',
                type: 'closeRight',
                disabled: true
            },
            {
                title: $$t('layouts.closeOtherTabs'),
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

    const setupMenuTag = (callBark: (tag: historyTagItem) => void) => {
        historyMenuTag.value.forEach(tag => {
            if (tag.path === route.path) {
                callBark(tag)
            }
        })
    }

    emitter.on('setupMenuTag', setupMenuTag)

    const closeCurrent = (value: historyTagItem) => {
        let length = historyMenuTag.value.length
        if (length <= 1) return message.error($$t('layouts.noCloseAllTabs'))
        let current = historyMenuTag.value.findIndex(x => x.path === value.path)
        historyMenuTag.value.splice(current, 1)
        if (current === historyMenuTag.value.length && value.path === route.path) {
            router.push({ path: historyMenuTag.value.at(-1).path })
        } else if (value.path === route.path) {
            router.push({ path: historyMenuTag.value.at(current).path })
        }
    }

    // 关闭左侧
    const closeLeft = (value: historyTagItem) => {
        let index = historyMenuTag.value.findIndex(x => value.path == x.path)
        historyMenuTag.value.splice(0, index)
    }
    // 关闭右侧
    const closeRight = (value: historyTagItem) => {
        let index = historyMenuTag.value.findIndex(x => value.path == x.path)
        historyMenuTag.value.splice(index + 1, historyMenuTag.value.length)
    }
    // 关闭全部
    const closeAll = () => {
        historyMenuTag.value = []
        router.push({ path: '/' })
    }
    // 关闭其他
    const closeOther = (value: historyTagItem) => {
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