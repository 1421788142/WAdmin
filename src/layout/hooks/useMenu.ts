import { reactive, computed, watch, toRefs, onMounted } from 'vue'
import { Layout } from "../type"
import { RouteLocationNormalizedLoaded } from 'vue-router';

import { selected, openKey, setBreadCrumbs } from '../index'
import { menuTypeEnum, menuThemeEnum } from '@/enums/menu'

import { storeToRefs } from "pinia"
import userStore from '@/store/user';
import config from '@/store/config';
const { userRouterList } = storeToRefs(userStore())//获取菜单

const { getConfigState } = config()

/**
 * @description layout 页面操作方法封装
 * */
export const useMenu = (
    menuTheme:string = 'dark',
    route:RouteLocationNormalizedLoaded
)=>{
    const state = reactive<Layout.menuStatePrpos>({
        // 菜单列表
        menuList:[],
        // 当前选中的菜单项 key 数组
        selectedKeys:[],
        // 当前展开的 SubMenu 菜单项 key 数组
        openKeys:[],
        // 菜单类型
        mode:'vertical',
        // 是否显示logo
        isHasLogo:false,
    })

	/**
	 * @description 获取菜单用computed方便后面迭代菜单对菜单修改
	 * */
    const setMenuList = (path = '')=>{
        state.menuList = []
        if(getConfigState('menuType') === 'mix' && getConfigState('sysMode') === 'web'){
            let routePath = (path || route.meta.parentPath || route.path) as string
            state.menuList = userRouterList.value.filter(item=>routePath === item.path && item.children)
            if(state.menuList.length === 0) state.menuList = setBreadCrumbs(routePath)[0]?.children || []
        } else {
            state.menuList = userRouterList.value
        }
    }
    watch(()=>getConfigState('menuType'),()=>setMenuList())
    // 监听路由变化设置选中菜单和展开菜单
    watch(()=>route.path,(newValue)=>{
        let routePath = route.meta.parentPath as string ?? newValue
        // 展开菜单
        state.openKeys = []
        if(!getConfigState('isHasCollapsed')) state.openKeys = openKey(routePath);
        (state.mode === 'vertical' && getConfigState('menuType') === 'horizontal') && (state.openKeys = [])
        setMenuList()
        // 菜单高亮
        if(getConfigState('menuType') === 'mix'){
            state.selectedKeys = [routePath]
        } else {
            state.selectedKeys = selected(routePath)
        }
    },{immediate:true,deep:true})

    // 初始化的时候需要做的事情就获取菜单
	onMounted(() => {
        state.mode =  getConfigState('menuType') !== 'horizontal' ? 'inline' : 'horizontal'
        state.isHasLogo = getConfigState('menuType') === 'mix' && state.mode === 'horizontal' ? false : getConfigState('isHasLogo')
	});
    
    // 菜单主题
    const theme = computed(():string=>getConfigState('menuType') === menuTypeEnum.verticalLight ? menuThemeEnum.light : menuTheme)

    // 菜单类名
    const menuClass = computed(():string[]=>{ //菜单类名
        return [
            getConfigState('menuType') === 'horizontal' ? 'justify-center flex-1' : 'min-h-[100%]',
        ]
    })

    return {
		...toRefs(state),
        menuClass,
        theme,
        getConfigState,
        setMenuList
	};
}