import _ from 'loadsh'
import { Layout } from './layout'
import { layoutRoute } from './routers'
// 根据后台返回的菜单生成路由
export default function getRoutes(routerList:menuListType[]) {
    let menuList = _.cloneDeep(routerList) as menuListType[]
    let router = []
    function setRoute(menus:menuListType[]){
        menus.forEach(item => {
            if(item.component !== 'Layout' && item.status === 1){
                const views = import.meta.globEager('../views/**/*.vue')
                Object.entries(views).forEach(([file, module]) => {
                    let fileName = file.split('../views/')?.pop()?.split('.vue').shift()
                    if(fileName === item.component){
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
    setRoute(menuList)
    function setRedirect(){//获取启动页
        let redirect = null
        for(let i=0; i<router.length; i++){
            if(!router[i].meta?.hidden && !router[i].meta?.isDetail){
                redirect = router[i].path
                break;
            } 
        }
        return redirect
    }
    setRedirect()
    let routers = {
        path:'/',
        name:'Layout',
        redirect:setRedirect() || '/login',
        component:Layout,
        meta: {
			title: "首页",
			icon: ""
		},
        children:[
            ...router,
            ...layoutRoute
        ]
    }
    return routers
}