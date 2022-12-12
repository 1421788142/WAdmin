import { Layout } from '@/layout/type'
export interface configStoreInterface {
    menuType:Layout.menuType,//菜单风格类型
    themeColor:string,//系统颜色
    componentSize:string,//控件大小
    tableHeight:string,//table表格高度
    language:string,//多语言
    isHasDark:boolean,//是否暗黑主题
    isHasHistory:boolean,//是否历史菜单
    isHasLogo:boolean,//是否显示logo
    isHasCollapsed:boolean,//是否折叠菜单
    isHasGrey:boolean,//是否灰色模式
    isHasColorblind:boolean,//是否色弱模式
    sysMode:string,//系统模式
    isHasFull:boolean,//是否全屏
    isHasSystem:boolean,//是否第一次进入系统
}