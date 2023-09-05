import { defineStore } from "pinia";
import { arrayToTree, arrRemoval, timeState } from '@/utils/util'
import { login, getRouter, userInterface, loginOut, loginInterface } from '@/apis/user'
import { $$t } from '@/plugins/language/setupI18n';
import router from "@/router";
import getRoutes from "@/router/autoload";//自动注册路由
import emitter from '@/plugins/mitt'

import { notification, message } from 'ant-design-vue';
import { CheckCircleTwoTone } from '@ant-design/icons-vue';
import { h } from 'vue';

import { WAdminUser, pageType } from './interface'

export default defineStore<'user', WAdminUser.state, WAdminUser.getters, WAdminUser.actions>('user', {
    state: () => {
        return {
            userRouterList: [],
            userInfo: null,
            requestRecord: [],//保存请求的接口
            historyMenuTag: [],//历史菜单
            token: '',//
            verifyCode: "",// 前端生成的验证码（按实际需求替换）
            // 判断登录页面显示哪个组件（1登录（默认）、2手机登录、3二维码登录、4注册、5忘记密码）
            currentPage: 1
        }
    },
    getters: {
        getMenus: (state) => state.userRouterList,
        getToken: (state) => state.token,
        getUserInfo: (state) => state.userInfo,
    },
    actions: {
        async setVerifyCode(code: string) {
            this.verifyCode = code ?? '';
        },
        async setCurrentPage(type: pageType) {
            this.currentPage = type ?? 1;
        },
        async setUserInfo(info: userInterface) {
            this.userInfo = info ?? null;
        },
        async setHistoryMenu(menu: historyTagItem[]) {
            emitter.emit('setRoute', menu)
            this.historyMenuTag = menu ?? [];
        },
        async getHistoryMenu() {
            return this.historyMenuTag
        },
        async setupUserRouter(menu: menuListType[]) {
            this.userRouterList = menu
            router.addRoute(getRoutes(this.userRouterList || []))
        },
        setupRequestRecord(cancel: Function | null, url: string, type: string = 'add') {
            if (type === 'add') {
                this.requestRecord.unshift({ url: url, fn: cancel })
                if (this.requestRecord.length > 15) this.requestRecord.pop()
            } else if (type === 'cancel') {
                this.requestRecord.forEach((item) => {
                    item.cancel && item.cancel()
                })
                this.requestRecord = []
            } else {
                this.requestRecord = this.requestRecord.filter(x => x.url !== url)
            }
        },
        // 登录
        async login(query: loginInterface) {
            try {
                const { code, data } = await login(query)
                if (code === 200) {
                    message.success($$t('login.loginOk'))
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
        // 获取用户菜单 
        async getUserRouter() {
            if (!this.userInfo) return
            try {
                const { code, data } = await getRouter() //获取用户菜单
                if (code === 200) {
                    let dataList = (data?.dataList ?? []).sort((a, b) => a.orderNum - b.orderNum)
                    let menuTree = arrayToTree(dataList)
                    await this.setMenuTree(menuTree)
                    await this.setupUserRouter(menuTree)
                    return true
                } else {
                    message.error($$t('sys.getMenuError'))
                    return false
                }
            } catch {
                message.error($$t('sys.getMenuError'))
                return false
            }

        },
        // 登录后的操作
        async afterLoginAction() {
            let res = await this.getUserRouter()
            if (res) {
                router.push({ path: '/' })
                notification.open({
                    message: $$t('login.loginOk'),
                    description: `${timeState()},${this.userInfo.userName}`,
                    icon: () => h(CheckCircleTwoTone, { twoToneColor: '#09F175' }),
                });
                return
            } else {
                this.setUserInfo(null)
            }
        },
        // 退出登录
        async loginOut() {
            try {
                let res = await loginOut()
                if (res.code === 200) {
                    this.setUserInfo(null)
                    this.setupUserRouter([])
                    this.setHistoryMenu([])
                    router.push({ path: '/login' })
                    message.success($$t('login.outLoginOk'))
                }
            } catch (error) {
                message.error($$t('login.outLoginError'))
            }
        },

        // 取菜单下的按钮
        async setMenuTree(menuTree: menuListType[]) {
            // 取菜单下的权限
            let getPermission = (data: menuListType) => {
                let arr = []
                data.children.forEach(item => arr.push(item.perms))
                delete data['children']
                return arrRemoval(arr)
            }
            menuTree.forEach(item => {
                let menuItem = {
                    component: item.menuType === 'M' ? 'Layout' : (item.menuType === 'C' ? item.component : ''),
                    name: item?.path.split('/').join(''),
                    meta: {
                        title: item.title,
                        permission: (item?.children && item.menuType === 'C') ? getPermission(item) : [],
                    }
                }
                Object.assign(item, menuItem)
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