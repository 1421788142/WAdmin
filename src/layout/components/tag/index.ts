import { reactive, toRefs, nextTick } from "vue"
import type { Router } from "vue-router"
import userStore from '@/store/user';
import { message } from "ant-design-vue";

const { setHistoryMenu, getHistoryMenu } = userStore()
export interface itemType {
    title:string,
    icon:string,
    type?:string,
    disabled?:boolean
}

interface stateInterface {
    tabItmes:itemType[],
    historyMenu:menuItem[],
    detailList:string[]
}
export const useTagData = (route?:any,router?:Router)=>{
    const state = reactive<stateInterface>({
        tabItmes:[
            {
                title:'重新加载',
                icon:'reload-outlined',
                disabled:true,
                type:'refresh'
            },
            {
                title:'关闭标签页',
                icon:'close-outlined',
                type:'closeCurrent',
            },
            {
                title:'关闭左侧标签页',
                icon:'vertical-right-outlined',
                type:'closeLeft',
                disabled:true
            },
            {
                title:'关闭右侧标签页',
                icon:'vertical-left-outlined',
                type:'closeRight',
                disabled:true
            },
            {
                title:'关闭其他标签页',
                icon:'pic-center-outlined',
                type:'closeOther',
                disabled:true
            },
        ],
        historyMenu:[],
        detailList:[]
    })
    
    const getList = async ()=>{
        await nextTick()
        let menuList = await getHistoryMenu()
        state.historyMenu = menuList.length && menuList || []
    }

    getList()

    const set = ()=>{
        let parentPath = route.meta.parentPath as string || ''
        if(['/login','/403','404'].includes(route.path)) return //如果是登录或错误页面则不缓存菜单
        const isHas = state.historyMenu.some(x=>x.path === route.path)
        const isHasDetail = state.detailList.includes(parentPath)
        isHasDetail && (state.historyMenu = state.historyMenu.filter(x=>x.parentPath !== parentPath))
        if(!isHas || isHasDetail){
            parentPath && state.detailList.push(parentPath)
            state.historyMenu.unshift({
                title:route.meta.title,
                path:route.path,
                parentPath:route.meta.parentPath || ''
            })
        }
        if(state.historyMenu.length>10){
            state.historyMenu.pop()
        }
        setHistoryMenu(state.historyMenu)
    }

    const closeCurrent = (value:menuItem)=>{
        if(state.historyMenu.length <= 1) return message.error('不能关闭所有标签')
        let current = state.historyMenu.findIndex(x=>x.path === value.path)
        let length = state.historyMenu.length
        if(!current && length === 1) return
        if(length > 1 && route.path === value.path){
            state.historyMenu.splice(0,1)
            if(route.path === value.path) router.push({path:state.historyMenu[0].path})
        } else {
            state.historyMenu.splice(current,1)
            if(route.path === value.path) router.push({path:state.historyMenu[current -1].path})
        }
    }

    // 关闭左侧
    const closeLeft = (value:menuItem)=>{
        let index = state.historyMenu.findIndex(x=>value.path == x.path)
        state.historyMenu.splice(0,index)
        setHistoryMenu(state.historyMenu)
    }
    // 关闭右侧
    const closeRight = (value:menuItem) =>{
        let index = state.historyMenu.findIndex(x=>value.path == x.path)
        state.historyMenu.splice(index+1,state.historyMenu.length)
        setHistoryMenu(state.historyMenu)
    }
    // 关闭全部
    const closeAll = ()=>{
        if(state.historyMenu.length > 1){
            state.historyMenu.splice(1,state.historyMenu.length)
        }
        setHistoryMenu(state.historyMenu)
    }
    // 关闭其他
    const closeOther = (value:menuItem)=>{
        state.historyMenu = state.historyMenu.filter(x=>value.path == x.path)
        setHistoryMenu(state.historyMenu)
    }

    return {
        ...toRefs(state),
        set,
        closeCurrent,
        closeLeft,
        closeRight,
        closeAll,
        closeOther
    }
}