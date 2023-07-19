import { reactive } from 'vue'
const menus = reactive<menuListType[]>([
  {
    component: "dataScreen/home/index",
    path: "/dataScreen/home",
    menuType: "C",
    id: 1,
    orderNum: 0,
    pId: 0,
    title: "数据大屏",
    icon: "bar-chart-outlined",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "home/index",
    path: "/home",
    menuType: "C",
    id: 2,
    orderNum: 1,
    pId: 0,
    title: "工作台",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "Layout",
    path: "dashboard",
    menuType: "M",
    id: 3,
    orderNum: 3,
    pId: 0,
    title: "Dashboard",
    icon: "appstore-outlined",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "dashboard/doc/index",
    path: "/dashboard/doc",
    menuType: "C",
    id: 301,
    orderNum: 0,
    pId: 3,
    title: "项目文档",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "Layout",
    path: "system",
    menuType: "M",
    id: 4,
    orderNum: 4,
    pId: 0,
    title: "系统管理",
    icon: "setting-outlined",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "system/menu/index",
    path: "/system/menu",
    menuType: "C",
    id: 401,
    orderNum: 0,
    pId: 4,
    title: "菜单管理",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    id: 40101,
    orderNum: 0,
    pId: 401,
    title: "新增",
    icon: "",
    perms: "add",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    id: 40102,
    orderNum: 0,
    pId: 401,
    title: "编辑",
    icon: "",
    perms: "update",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    id: 40103,
    orderNum: 0,
    pId: 401,
    title: "删除",
    icon: "",
    perms: "delete",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "system/role/index",
    path: "/system/role",
    menuType: "C",
    id: 402,
    orderNum: 1,
    pId: 4,
    title: "角色管理",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    id: 40201,
    orderNum: 0,
    pId: 402,
    title: "新增",
    icon: "",
    perms: "add",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    orderNum: 0,
    id: 40202,
    pId: 402,
    title: "编辑",
    icon: "",
    perms: "update",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    id: 40203,
    orderNum: 0,
    pId: 402,
    title: "删除",
    icon: "",
    perms: "delete",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "system/user/index",
    path: "/system/user",
    menuType: "C",
    id: 403,
    orderNum: 2,
    pId: 4,
    title: "用户管理",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    id: 40301,
    orderNum: 0,
    pId: 403,
    title: "新增",
    icon: "",
    perms: "add",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    id: 40302,
    orderNum: 0,
    pId: 403,
    title: "编辑",
    icon: "",
    perms: "update",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    id: 40303,
    orderNum: 0,
    pId: 403,
    title: "删除",
    icon: "",
    perms: "delete",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "Layout",
    path: "menu",
    menuType: "M",
    id: 5,
    orderNum: 5,
    pId: 0,
    title: "菜单嵌套",
    icon: "appstore-outlined",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "menu/menu1/index",
    path: "/menu/menu1",
    menuType: "C",
    id: 501,
    orderNum: 0,
    pId: 5,
    title: "菜单1",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "Layout",
    path: "menu2",
    menuType: "M",
    id: 502,
    orderNum: 0,
    pId: 5,
    title: "菜单2",
    icon: "appstore-outlined",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "menu/menu2/menu21/index",
    path: "/menu/menu2/menu21",
    menuType: "C",
    id: 50201,
    orderNum: 0,
    pId: 502,
    title: "菜单2-1",
    icon: "appstore-outlined",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 0,
    hidden: 1,
  },
  {
    component: "Layout",
    path: "menu3",
    menuType: "M",
    id: 503,
    orderNum: 0,
    pId: 5,
    title: "菜单3",
    icon: "appstore-outlined",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "menu/menu3/menu31/index",
    path: "/menu/menu3/menu31",
    menuType: "C",
    id: 50301,
    orderNum: 0,
    pId: 503,
    title: "菜单3-1",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "Layout",
    path: "menu312",
    menuType: "M",
    id: 50302,
    pId: 503,
    orderNum: 0,
    title: "菜单3-2",
    icon: "appstore-outlined",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "menu/menu3/menu31/menu312/index",
    path: "/menu/menu3/menu31/menu312",
    menuType: "C",
    id: 5030201,
    orderNum: 0,
    pId: 50302,
    title: "菜单3-2-1",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "Layout",
    path: "table",
    menuType: "M",
    id: 6,
    orderNum: 6,
    pId: 0,
    title: "Table表格",
    icon: "bar-chart-outlined",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "table/useTable/index",
    path: "/table/useTable",
    menuType: "C",
    id: 601,
    orderNum: 0,
    pId: 6,
    title: "Hooks Table",
    icon: "bar-chart-outlined",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    id: 60101,
    orderNum: 0,
    pId: 601,
    title: "新增",
    icon: "",
    perms: "add",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    id: 60102,
    orderNum: 0,
    pId: 601,
    title: "编辑",
    icon: "",
    perms: "update",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    id: 60103,
    orderNum: 0,
    pId: 601,
    title: "删除",
    icon: "",
    perms: "delete",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "table/useComponent/index",
    path: "/table/useComponent",
    menuType: "C",
    id: 602,
    orderNum: 1,
    pId: 6,
    title: "Component Table",
    icon: "bar-chart-outlined",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    id: 60201,
    orderNum: 0,
    pId: 602,
    title: "新增",
    icon: "",
    perms: "add",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    id: 60202,
    orderNum: 0,
    pId: 602,
    title: "编辑",
    icon: "",
    perms: "update",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    id: 60203,
    orderNum: 0,
    pId: 602,
    title: "删除",
    icon: "",
    perms: "delete",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "",
    path: "",
    menuType: "F",
    id: 60204,
    orderNum: 0,
    pId: 602,
    title: "导出",
    icon: "",
    perms: "export",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "Layout",
    path: "commonly",
    menuType: "M",
    id: 7,
    orderNum: 7,
    pId: 0,
    title: "常用组件",
    icon: "appstore-outlined",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "commonly/editor/index",
    path: "/commonly/editor",
    menuType: "C",
    id: 701,
    orderNum: 0,
    pId: 7,
    title: "富文本编辑器",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "commonly/selectIcon/index",
    path: "/commonly/selectIcon",
    menuType: "C",
    id: 702,
    orderNum: 1,
    pId: 7,
    title: "Icon选择器",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "commonly/upload/index",
    path: "/commonly/upload",
    menuType: "C",
    id: 703,
    orderNum: 3,
    pId: 7,
    title: "上传组件",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "commonly/batchImport/index",
    path: "/commonly/batchImport",
    menuType: "C",
    id: 704,
    orderNum: 4,
    pId: 7,
    title: "导入数据",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "commonly/svgIcon/index",
    path: "/commonly/svgIcon",
    menuType: "C",
    id: 705,
    orderNum: 2,
    pId: 7,
    title: "SVG图标",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "Layout",
    path: "feat",
    menuType: "M",
    id: 8,
    orderNum: 8,
    pId: 0,
    title: "更多功能",
    icon: "funnel-plot-outlined",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "feat/directive/index",
    path: "/feat/directive",
    menuType: "C",
    id: 801,
    orderNum: 0,
    pId: 8,
    title: "自定义指令",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "feat/infoPage/index",
    path: "/feat/infoPage",
    menuType: "C",
    id: 802,
    orderNum: 1,
    pId: 8,
    title: "跳转详情页",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "feat/loginExpired/index",
    path: "/feat/loginExpired",
    menuType: "C",
    id: 803,
    orderNum: 2,
    pId: 8,
    title: "登录过期",
    icon: "",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 1,
    hidden: 1,
  },
  {
    component: "Layout",
    path: "link",
    menuType: "M",
    id: 9,
    orderNum: 9,
    pId: 0,
    title: "外链示例",
    icon: "desktop-outlined",
    perms: "",
    isFrame: 0,
    status: 1,
    keepAlive: 0,
    hidden: 1,
  },
  {
    component: "",
    path: "http://121.4.119.52:81",
    menuType: "C",
    id: 901,
    orderNum: 0,
    pId: 9,
    title: "练习官网demo",
    icon: "desktop-outlined",
    perms: "",
    isFrame: 1,
    status: 1,
    keepAlive: 0,
    hidden: 1,
  },
  {
    component: "",
    path: "https://github.com/1421788142/WAdmin",
    menuType: "C",
    id: 902,
    orderNum: 1,
    pId: 9,
    title: "github地址",
    icon: "github-outlined",
    perms: "",
    isFrame: 1,
    status: 1,
    keepAlive: 0,
    hidden: 1,
  },
  {
    component: "",
    path: "http://121.4.119.52:82",
    menuType: "C",
    id: 903,
    orderNum: 2,
    pId: 9,
    title: "WAdmin文档",
    icon: "file-text-outlined",
    perms: "",
    isFrame: 1,
    status: 1,
    keepAlive: 0,
    hidden: 1,
  }
])

export default menus