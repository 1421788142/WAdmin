/// <reference types="ant-design-vue/typings/global" />

declare module 'vue' {
    interface GlobalComponents {
        // 自定义组件类型默认全局组件
        WButton: typeof import('com/global/button/index.vue')['default'],
        WForm: typeof import("com/global/form/index.vue")["default"];
        WIconPicker: typeof import("com/global/iconPicker/index.vue")["default"];
        WImportData: typeof import("com/global/importData/index.vue")["default"];
        WModal: typeof import("com/global/modal/index.vue")["default"];
        WPagination: typeof import("com/global/pagination/index.vue")["default"];
        WSearchForm: typeof import("com/global/searchForm/index.vue")["default"];
        WSvgIcon: typeof import("com/global/svgIcon/index.vue")["default"];
        WTable: typeof import("com/global/table/index.vue")["default"];
        WTreeFilter: typeof import("com/global/treeFilter/index.vue")["default"];
        WWangEditor: typeof import("com/global/wangEditor/index.vue")["default"];
    }
}
export { };