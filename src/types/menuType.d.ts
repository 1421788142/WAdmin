interface menuListType {
    title:string, //标题
    icon:string, //图标
    menuType:string, //菜单类型(M:目录 C:菜单 F:按钮)
    hidden:number, //是否显示页面(0否1是)
    keepAlive:number, //是否缓存页面(0否1是)
    status:number, //菜单状态(0停用1启用)
    isFrame:number, //是否外链菜单(0否1是)
    orderNum?:number, //菜单排序
    perms:string,//权限标识
    path:string,//路径
    meta?:meta,//原信息
    component:string,//组件位置
    id:number,//id
    pId:number,//父级id
    children?:menuListType[],
}
interface meta {
    title:string, //标题
    parentPath?:string,//如果为详情则需要带上父级组件路径path
    permission?:string[], //权限 ['add','update']
}