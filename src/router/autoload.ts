import _ from 'loadsh'
import { Layout } from './layout'
import { layoutRoute } from './routers'
import { deepCopy } from '@/utils/util'
// 根据后台返回的菜单生成路由
export default function getRoutes(routerList: menuListType[]) {
    let menuList = _.cloneDeep(routerList) as menuListType[]
    let router = []
    let layoutRoutes = deepCopy<any[]>(layoutRoute)

    const views = import.meta.globEager('../views/**/*.vue')
    function setRoute(menus: menuListType[]) {
        menus.forEach(item => {
            if (item.component !== 'Layout' && !item.isFrame && item.status === 1) {
                Object.entries(views).forEach(([file, module]) => {
                    let fileName = file.split('../views/')?.pop()?.split('.vue').shift()
                    if (fileName === item.component) {
                        module.default.name = item.path
                        item.component = module.default
                        router.push(item)
                    }
                })
            }
            item.children && item.children.length > 0
                ? setRoute(item.children)
                : ""
        })
    }

    function setDitailRoute() {
        layoutRoutes.forEach(item => {
            Object.entries(views).forEach(([file, module]) => {
                let fileName = file.split('../views/')?.pop()?.split('.vue').shift()
                if (fileName === item.component) {
                    module.default.name = item.path
                    item.component = module.default
                    router.push(item)
                }
            })
        })
    }

    setRoute(menuList)
    setDitailRoute()
    // 大屏需要过滤的首页菜单
    const dataScreen = ['/dataScreen/home']
    function setRedirect() {//获取启动页
        let redirect = null
        for (let i = 0; i < router.length; i++) {
            if (!router[i].meta?.hidden && !router[i].meta?.parentPath && !dataScreen.includes(router[i].path)) {
                redirect = router[i].path
                break;
            }
        }
        return redirect
    }
    setRedirect()
    let routers = {
        path: '/',
        name: 'Layout',
        redirect: setRedirect() || '/login',
        component: Layout,
        meta: {
            title: "首页",
            icon: ""
        },
        children: [
            ...router,
        ]
    }
    return routers
}