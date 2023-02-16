import { reactive, computed, toRefs, watch } from 'vue'
import { Layout } from "../type"
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { storeToRefs } from "pinia"
import config from '@/store/config';
import user from '@/store/user';
import { setBreadCrumbs } from '../index'
import emitter from '@/plugins/mitt'

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
        darkId:'theme-dark',//暗黑模式Id
        isDev:import.meta.env.DEV,//当前环境
        darkContent:null,
        selectedKeys:[],
        modalMinList:[],
        modalMinUid:''
    })
    
    // 头部面包屑
    const crumbsList = computed(()=>setBreadCrumbs(route.path))
    let parentPath = route.meta.parentPath as string
    state.selectedKeys = [crumbsList.value.length && crumbsList.value[0].path || parentPath || '']
    // 切换暗黑和亮色主题
    const switchDark = async (checked:boolean) => {
        setConfigState('isHasDark',checked)
        let darkDom = document.getElementById(state.darkId)
        document.documentElement.setAttribute('data-theme', checked ? 'dark' : 'light')
        document.documentElement.classList[checked ? 'add' : 'remove']('dark')

        // 白天主题设置为空 黑夜主题设置textContent|href
        if (!checked || state.darkContent) return regetContent(darkDom, checked ? state.darkContent : '')

        let dark: any = import('@/styles/index.dark.less')
        // 开发模式需要promise.then  生产模式引入之后立即获取dom
        if (!state.isDev) return (state.darkContent = getContent())

        dark.then(() => {
            state.darkContent = getContent()
        })
    }

    const getContent = () => {
        let child = document.head.lastElementChild
        child.id = state.darkId
        return state.isDev ? child.textContent : child.getAttribute('href') // 深克隆一个节点
      }

    // 重置dom
    const regetContent = (el: Element, value: any) =>
    el && (state.isDev ? (el.textContent = value) : el.setAttribute('href', value))

    // 是否系统灰色
    const setupGrey = (value:boolean)=>{
        let body = document.getElementsByTagName('body')[0]
        body.style.setProperty('filter',`grayscale(${value ? '100%' : '0%'})`)
        setConfigState('isHasGrey',value)
    }
    
    // 是否系统色弱模式
    const setupColorblind = (value:boolean)=>{
        if(value){
            document.getElementsByTagName("body")[0].className="color-weak";
        }else {
            document.body.removeAttribute("class")
        }
        setConfigState('isHasColorblind',value)
    }

    watch([
        ()=>getConfigState('isHasDark'),
        ()=>getConfigState('isHasGrey'),
        ()=>getConfigState('isHasColorblind')],
        ([newDark,newGrey,newColorblind])=>{
            switchDark(newDark)
            setupGrey(newGrey)
            setupColorblind(newColorblind)
        })

    // 初始化
    switchDark(getConfigState('isHasDark'))
    setupGrey(getConfigState('isHasGrey'))
    setupColorblind(getConfigState('isHasColorblind'))
    
    // 监听弹窗小化
    emitter.on('setModalMin',(event:any)=>{
        let isHas = state.modalMinList.some(x=>x.uid === event.uid)
        if(isHas || getConfigState('modalMinNum') < state.modalMinList.length + 1) return
        state.modalMinList.push({
            title:`${route.meta.title} [${event.title}]`,
            path:route.path,
            uid:event.uid,
        })
    })
    emitter.on('delModalMin',(uid:string)=>delModalMin(uid))
    emitter.on('setRoute',(historyMenu:menuItem[])=>{
        state.modalMinList.forEach(min=>{
            let has = historyMenu.some(menu=>menu.path === min.path)
            if(!has) state.modalMinList = state.modalMinList.filter(x=>x.uid !== min.uid)
        })
    })
    const delModalMin = (uid:string)=>{
        state.modalMinUid = uid
        setTimeout(()=>{
            state.modalMinList = state.modalMinList.filter(x=>x.uid !== uid)
            state.modalMinUid = ''
        },500)
    }

    const openModalMin = (modal:any)=>{
        delModalMin(modal.uid)
        router.push({ path:modal.path }).then(res=>{
            emitter.emit('openModalMin',modal.uid)
        })
    }

    return {
        crumbsList,
        ...toRefs(state),
        getConfigState,
        setConfigState,
        resetConfig,
        switchDark,
        setupColorblind,
        setupGrey,
        delModalMin,
        openModalMin
    }
}