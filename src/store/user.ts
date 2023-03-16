import { defineStore } from "pinia";
import { arrayToTree, arrRemoval, timeState } from '@/utils/util'

import { login, getRouter, userInterface, loginOut, loginInterface } from '@/apis/user'

import router from "@/router";
import getRoutes from "@/router/autoload";//自动注册路由
import emitter from '@/plugins/mitt'

import { notification, message } from 'ant-design-vue';
import { CheckCircleTwoTone } from '@ant-design/icons-vue';
import { h } from 'vue';

export default defineStore('user',{
    state:()=>{
        return {
            userRouterList:[],
            userInfo: null,
            requestRecord:[],//保存请求的接口
            historyMenuTag:[],
            token:''
        }
    },
    getters:{
        getMenus: (state)=> state.userRouterList,
        getToken: (state)=> state.token,
        getUserInfo: (state)=> state.userInfo,
    },
    actions:{
        setUserInfo(info: userInterface) {
            this.userInfo = info ?? null;
        },
        async setHistoryMenu(menu: menuItem[]) {
            emitter.emit('setRoute',menu)
            this.historyMenuTag = menu ?? [];
        },
        async getHistoryMenu(){
            return this.historyMenuTag
        },
        setupUserRouter(menu:menuListType[]){
            this.userRouterList = menu
            router.addRoute(getRoutes(this.userRouterList || []))
        },
        setupRequestRecord(cancel:Function | null, type:string = 'add'){
            if(type === 'add'){
                this.requestRecord.unshift({cancel})
                if(this.requestRecord.length > 15) this.requestRecord.pop()
            } else if(type === 'cancel'){
                this.requestRecord.forEach((item)=>{
                    item.cancel && item.cancel()
                })
                this.requestRecord = []
            }
        },
        // 登录
        async login(query:loginInterface){
            try {
                const { code, data } = await login(query)
                if(code === 200){
                    await this.setUserInfo(data)
                    await this.afterLoginAction()
                    return true
                } else {
                    return false
                }
            } catch {
                return false
            }
        },
        // 登录后的操作
        async afterLoginAction(){
            try {
                //获取用户信息
                const { code, data } = await getRouter() //获取用户菜单
                if(code === 200){
                    let menuTree = arrayToTree(data?.dataList ?? [])
                    await this.setMenuTree(menuTree)
                    await this.setupUserRouter(menuTree)
                    router.push({path:'/'})
                    notification.open({
                        message: '登录成功',
                        description:`${timeState()},${this.userInfo.userName}`,
                        icon: () => h(CheckCircleTwoTone, { twoToneColor: '#09F175' }),
                    });
                    return
                } else {
                    this.setUserInfo(null)
                    message.error('获取菜单失败请重新登录')
                }
            } catch (error){

            }
        },
        // 退出登录
        async loginOut(){
            try {
                let res = await loginOut()
                if(res.code === 200){
                    this.setUserInfo(null)
                    this.setupUserRouter([])
                    this.setHistoryMenu([])
                    router.push({path:'/login'})
                    message.success(res.message)
                }
            } catch (error){
                
            }
        },

        // 取菜单下的按钮
        async setMenuTree(menuTree:menuListType[]){
            // 取菜单下的权限
            let getPermission = (data:menuListType)=>{
                let arr = []
                data.children.forEach(item=>arr.push(item.perms))
                delete data['children']
                return arrRemoval(arr)
            }
            menuTree.forEach(item=>{
                let menuItem = {
                    component:item.menuType === 'M' ? 'Layout' : (item.menuType === 'C' ? item.component : ''),
                    name:item?.path.split('/').join(''),
                    meta:{
                        title:item.title,
                        permission:(item?.children && item.menuType === 'C') ? getPermission(item) : [],
                    }
                }
                Object.assign(item,menuItem)
                item?.children && item?.children?.length > 0 ? this.setMenuTree(item.children) : '' 
            })
        }
    },
    persist: {
        enabled: true,
        strategies: [{
            key: 'WAdminUser'
        }]
    }
})