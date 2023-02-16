import { defineStore } from "pinia";
export default defineStore('config', {
    state: ()=>{
        return {
            menuType:'verticalDark',//菜单主题
            themeColor:'#1890FF',//系统颜色
            componentSize:'middle',//控件大小
            tableHeight:'auto',//table表格高度
            language:'zh_CN',//多语言
            isHasDark:false,//是否暗黑主题
            isHasHistory:true,//是否历史菜单
            isHasLogo:true,//是否显示logo
            isHasCollapsed:false,//是否折叠菜单
            isHasGrey:false,//是否灰色模式
            isHasColorblind:false,//是否色弱模式
            sysMode:'web',//系统模式
            isHasFull:false,//是否全屏
            isHasSystem:false,//是否第一次进入系统
            modalMinNum:2,//历史对话框数量
        }
    },
    actions:{
        // 获取参数
        getConfigState(key:string){
            return this[key]
        },
        // 修改参数
        setConfigState(key:string,value:string | boolean){
            this[key] = value
        },
        // 重置参数
        async resetConfig(){
            this.menuType = 'verticalDark'
            this.themeColor = '#1890FF'
            this.componentSize = 'middle'
            this.tableHeight = 'auto'
            this.language = 'zh_CN'
            this.isHasDark = false
            this.isHasHistory = true
            this.isHasLogo = true
            this.isHasCollapsed = false
            this.isHasGrey = false
            this.isHasColorblind = false
            this.isHasFull = false
            this.modalMinNum = 2
        }
    },
    persist: {
        enabled: true,
        strategies: [{
            key: 'XiaoWuAdminConfig',
            storage:localStorage
        }]
    }
})