import config from '@/store/config';
const configStore = config()
const { setConfigState, getConfigState  } = configStore


interface stateInterface {
    darkId:string,
    isDev:boolean,//当前环境
    darkContent:any
}

export const useTheme = ()=>{
    const state:stateInterface = {
        darkId:'theme-dark',//暗黑模式Id
        isDev:import.meta.env.DEV,
        darkContent:null,
    }

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
    // 获取dom
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

    return {
        switchDark,
        setupGrey,
        setupColorblind,
        getConfigState
    }
}