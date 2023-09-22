import { userInterface, loginInterface } from '@/apis/user'
export type pageType = 1 | 2 | 3 | 4 | 5
export namespace WAdminUser {
    export type state = {
        userRouterList: menuListType[];
        userInfo: userInterface;
        requestRecord: { cancel: Function, url: string }[];
        historyMenuTag: historyTagItem[];
        token: string;
        verifyCode: string,
        currentPage: pageType
    }
    export type getters = {
        getMenus: (state: state) => state['userRouterList'],
        getToken: (state: state) => state['token'],
        getUserInfo: (state: state) => state['userInfo'],
        [key: string]: any
    }
    export type actions = {
        setVerifyCode: (code: string) => Promise<void>,
        setCurrentPage: (type: pageType) => Promise<void>,
        setUserInfo: (info: userInterface) => Promise<any>,
        setHistoryMenu: (menu: state['historyMenuTag']) => Promise<any>,
        getHistoryMenu: () => Promise<state['historyMenuTag']>,
        setupUserRouter: (menu: state['userRouterList']) => Promise<any>,
        setupRequestRecord: (cancel: Function | null, url: string, type: string) => void,
        login: (query: loginInterface) => Promise<boolean>,
        getUserRouter: () => Promise<boolean>,
        afterLoginAction: () => Promise<void>,
        loginOut: () => Promise<void>,
        setMenuTree: (menu: state['userRouterList']) => Promise<void>,
    }
}

export namespace WAdminConfig {
    export type state = {
        menuType: 'verticalDark' | 'horizontal' | 'mix' | 'verticalLight',//菜单主题
        themeColor: string,//系统颜色
        componentSize: 'small' | 'middle' | 'large',//控件大小
        language: 'zh_CN' | 'en_US',//多语言
        isHasDark: boolean,//是否暗黑主题
        isHasHistory: boolean,//是否历史菜单
        isHasLogo: boolean,//是否显示logo
        isHasCollapsed: boolean,//是否折叠菜单
        isHasGrey: boolean,//是否灰色模式
        isHasColorblind: boolean,//是否色弱模式
        sysMode: 'phone' | 'web',//系统模式
        isHasFull: boolean,//是否全屏
        isHasSystem: boolean,//是否第一次进入系统
        modalMinNum: number,//历史对话框数量
        lockNum: number,//自动锁屏时间0为不锁屏单位分钟
        lockExpireNum: number,//自动锁屏到期时间
        isHasLock: boolean,//是否锁定屏幕
        lockPassword: string,//锁屏密码
    }
    export type getters = {}
    export type actions = {
        getConfigState: <K extends keyof state>(key: K) => state[K],
        setConfigState: <K extends keyof state>(key: K, value: state[K]) => void,
        resetConfig: () => Promise<void>,
        [key: string]: any
    }
}