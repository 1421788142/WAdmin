import _ from 'loadsh'
import { Layout } from './layout'
import { detailsRouter } from './routers'

// 根据后台返回的菜单生成路由
export default function getRoutes(routerList: menuListType[]) {
    let menuList = _.cloneDeep(routerList) as menuListType[]

    let router = [] //注册后的路由

    // 全部视图页面
    const views = import.meta.globEager('../views/**/*.vue')

    // 自动注册页面
    const autoRouterViews = (item: menuListType) => {
        Object.entries(views).forEach(([file, module]) => {
            let fileName = file.split('../views/')?.pop()?.split('.vue').shift()
            if (fileName === item.component) {
                module.default.name = item.path
                item.component = module.default
                router.push(item)
            }
        })
    }

    // 自动注册路由
    const setRoute = (menus: menuListType[]) => {
        menus.forEach(item => {
            if (item.component !== 'Layout' && !item.isFrame && item.status === 1) {
                autoRouterViews(item)
            }
            item.children && item.children.length > 0
                ? setRoute(item.children)
                : ""
        })
    }
    setRoute(menuList)
    // 大屏需要过滤的首页菜单
    const dataScreen = ['/dataScreen/home']
    const setRedirect = () => {//获取启动页
        let redirect = null
        for (let i = 0; i < router.length; i++) {
            if (!router[i].meta?.hidden && !router[i].meta?.parentPath && !dataScreen.includes(router[i].path)) {
                redirect = router[i].path
                break;
            }
        }
        return redirect
    }
    let routers = {
        path: '/',
        name: 'Layout',
        redirect: setRedirect() || '/login',
        component: Layout,
        children: [
            ...router,
            ...detailsRouter
        ]
    }
    return routers
}