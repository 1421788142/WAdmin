import { reactive, computed, toRefs, watch } from 'vue'
import { Layout } from "./interface/layout"
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { storeToRefs } from "pinia"
import config from '@/store/config';
import user from '@/store/user';
import { setBreadCrumbs } from '@/layout/index'
import { useTheme } from './useTheme';

const { 
    switchDark,
    setupGrey,
    setupColorblind,
} = useTheme()

const configStore = config()
const { getConfigState, setConfigState, resetConfig  } = configStore

const userStore = user()
let { userRouterList } = storeToRefs(userStore)

/**
 * @description layout 页面操作方法封装
 * @param {String} route 当前路由
 * */
export const useLayout = (
    route?:RouteLocationNormalizedLoaded,
    router?:Router
)=>{
    const state = reactive<Layout.LayoutStatePrpos>({
        menuMixList:userRouterList.value,// 混合模式菜单
        wapMenuVisible:false,// 手机导航抽屉
        selectedKeys:[],
    })
    
    // 头部面包屑
    const crumbsList = computed(()=>setBreadCrumbs(route.path))
    let parentPath = route.meta.parentPath as string
    state.selectedKeys = [crumbsList.value.length && crumbsList.value[0].path || parentPath || '']

    watch([
        ()=>getConfigState('isHasDark'),
        ()=>getConfigState('isHasGrey'),
        ()=>getConfigState('isHasColorblind')],
        ([newDark,newGrey,newColorblind])=>{
            switchDark(newDark)
            setupGrey(newGrey)
            setupColorblind(newColorblind)
        })

    return {
        crumbsList,
        ...toRefs(state),
        getConfigState,
        setConfigState,
        resetConfig,
        switchDark,
        setupColorblind,
        setupGrey,
    }
}