import Driver from "driver.js";
import { $$t } from "@/plugins/language/setupI18n";
import { storeToRefs } from "pinia"
import userStore from '@/store/user';
const { userRouterList } = storeToRefs(userStore())

/**
 * @description 查询出单个打开的菜单用于复合菜单
 * @param {string} fullPath //当前的菜单
 * */
export function selected(fullPath: string) {
    let arr = [fullPath]
    return arr
}

/**
 * @description 根据不通需求筛选出对应菜单
 * @param {Function} key 最终返回字符串的key
 * @param {Function} filterKey  最终返回字符串的需要过滤的key
 * @param {Function} returnKey 最终返回字符串的过滤出的key
 * */
export function findFn<T>(key: Function, filterKey: Function, returnKey: Function) {
    let stack: T[] = [];
    let going: boolean = true;
    let filter = (menuItem: menuListType[], keys: Function) => {
        menuItem.forEach(item => {
            if (!going) return;
            stack.push(returnKey(item));
            if (filterKey(item) == keys(item)) {
                going = false;
            } else if (item['children']) {
                filter(item['children'], keys);
            } else {
                stack.pop();
            }
        });
        if (going) stack.pop();
    }
    filter(userRouterList.value, key);
    return stack;
}

/**
 * @description 查询出打开菜单
 * @param {string} fullPath //当前的菜单
 * */
export function openKey(fullPath: string) {
    let menuList = findFn(
        () => fullPath,
        (val: any) => val.path,
        (val: any) => val.path,
    ) as string[]
    return menuList
}

/**
 * @description 查询出面包屑
 * @param {string} fullPath //当前的菜单
 * */
export function setBreadCrumbs(fullPath: string): menuListType[] {
    let breadList = findFn<menuListType>(
        () => fullPath,
        (val: menuListType) => val.path,
        (val: menuListType) => val,
    )
    return breadList
}

/**
 * @description 根据关键字搜索菜单
 * @param {string} key 
 */
export function screenPageList<T>(key: string): T[][] {
    let menuList: T[][] = [];
    let walker = (menuItem: menuListType[], key: string) => {
        menuItem.forEach(item => {
            if ((item.meta.title.search(key) != -1 || item.path.search(key) != -1) && item.component !== 'Layout' && item.hidden === 1) {
                let menu = findFn<T>(
                    () => item.path,
                    (val: menuListType) => val.path,
                    (val: menuListType) => {
                        return {
                            path: val.path,
                            title: val.meta.title,
                            icon: val.icon
                        }
                    }
                )
                menuList.push(menu)
            }
            item.children && item.children.length > 0
                ? walker(item.children, key)
                : ""
        })
    }
    walker(userRouterList.value, key);
    return menuList
}

/**
 * @description 使用递归，过滤需要缓存的路由
 * @return string[]
 * */
export const filterKeepAlive = () => {
    let cacheRouter: string[] = [];
    const filterFn = (_route: menuListType[], _cache: string[]): void => {
        _route.forEach(item => {
            item.keepAlive && item.path && item.component != 'Layout' && _cache.push(item.path);
            item.children && item.children.length !== 0 && filterFn(item.children, _cache);
        });
    }
    filterFn(userRouterList.value, cacheRouter);

    // 将静态详情页面加入缓存
    return cacheRouter
}

/**
 * @description 动态取路由第一个path
 */
export const getFirstMenu = (path: string): menuListType => {
    let firstMenu: menuListType = null
    let filterFn = (item: menuListType[]) => {
        for (let i = 0; i < item.length; i++) {
            item[i].component === 'Layout' && item[i]?.children?.length > 0 ? filterFn(item[i].children) : firstMenu = item[i]
            break
        }
    }
    let menuItem = userRouterList.value.filter(x => x.path == path)
    filterFn(menuItem)
    return firstMenu
}

// 用户首次登录则引导页
export const guide = async (isSystem: boolean) => {
    return new Promise<boolean>((resolve, reject) => {
        const driver: Driver = new Driver({
            allowClose: false,
            doneBtnText: $$t('layouts.driverBtnText1'),
            closeBtnText: $$t('layouts.driverBtnText2'),
            nextBtnText: $$t('layouts.driverBtnText3'),
            prevBtnText: $$t('layouts.driverBtnText4'),
            onReset() {
                resolve(true)
            }
        });
        if (!isSystem) {
            driver.defineSteps(steps);
            driver.start();
        }
    })
};
const steps = [
    {
        element: "#w-breadcrumb",
        popover: {
            title: $$t('layouts.stepTitle1'),
            description: $$t('layouts.stepDesc1'),
            position: "bottom"
        }
    },
    {
        element: "#menu-search",
        popover: {
            title: $$t('layouts.stepTitle2'),
            description: $$t('layouts.stepDesc2'),
            position: "bottom"
        }
    },
    {
        element: "#full-screen",
        popover: {
            title: $$t('layouts.stepTitle3'),
            description: $$t('layouts.stepDesc3'),
            position: "left"
        }
    },
    {
        element: "#sys-message",
        popover: {
            title: $$t('layouts.stepTitle4'),
            description: $$t('layouts.stepDesc4'),
            position: "left"
        }
    },
    {
        element: "#chang-lan",
        popover: {
            title: $$t('layouts.stepTitle5'),
            description: $$t('layouts.stepDesc5'),
            position: "left"
        }
    },
    {
        element: "#set-up",
        popover: {
            title: $$t('layouts.stepTitle6'),
            description: $$t('layouts.stepDesc6'),
            position: "left"
        }
    },
];
