export namespace Layout {
    export type menuType = 'verticalDark' | 'verticalLight' | 'horizontal' | 'mix'
    export type mode = 'vertical' | 'horizontal' | 'inline'
    export type sysMode = 'phone' | 'web'
    export interface LayoutStatePrpos {
        menuMixList: menuListType[],
        wapMenuVisible: boolean,
        selectedKeys: string[],
    }
    export interface menuStatePrpos {
        menuList: menuListType[],
        selectedKeys: string[],
        openKeys: string[],
        rootSubmenuKeys: string[],
        mode: mode,
        isHasLogo: boolean,
    }
}

export interface layoutInterface {
    getConfigState: Function,
    setConfigState: Function,
    resetConfig: Function,
    switchDark: Function,
    setupGrey: Function,
    setupColorblind: Function,
    crumbsList: menuListType[],
}