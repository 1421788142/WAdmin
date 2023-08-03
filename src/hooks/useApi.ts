import { reactive, toRefs, computed } from "vue"
export type stateType = {
    listData: any,
    loading: boolean,// 加载动画
    pageable: {
        pageNum: number,
        pageSize: number,
        total: number
    },
    searchParam: {
        [key: string]: any
    },
    initSearchParam: {
        [key: string]: any
    },
    totalParam: {
        [key: string]: any
    },
}
export const useApi = (api: () => Promise<any>, pagination: boolean) => {
    const state = reactive<stateType>({
        listData: [],
        loading: false,// 加载动画
        pageable: {
            // 当前页数
            pageNum: 1,
            // 每页显示条数
            pageSize: 10,
            // 总条数
            total: 0
        },
        searchParam: {},// 查询参数(只包括查询)
        initSearchParam: {},// 初始化默认的查询参数
        totalParam: {},// 总参数(包含分页和查询参数)
    })
    const search = async (pageNum: number = 1) => {
        state.pageable.pageNum = pageNum
        await api()
    }
    const reset = () => {
        state.searchParam = {};
        // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
        Object.keys(state.initSearchParam).forEach(key => {
            state.searchParam[key] = state.initSearchParam[key];
        });
        search()
    }

    /**
     * @description 更新分页信息
     * @param {Object} resPageable 后台返回的分页数据
     * @return void
     * */
    const updatePageable = (resPageable: stateType['pageable']) => {
        Object.assign(state.pageable, resPageable);
    };

    /**
     * @description 每页条数改变
     * @param {Number} pageNum 当前页数
     * @param {Number} pageSize 当前条数
     * @return void
     * */
    const change = (pageNum: number, pageSize: number) => {
        state.pageable.pageNum = pageNum;
        state.pageable.pageSize = pageSize;
        api();
    };

    const updateTotalParam = async () => {
        state.totalParam = {}
        let nowSearchParam: { [propName: string]: any } = {};
        // 防止手动清空输入框携带参数（可以自定义查询参数前缀）
        for (let key in state.searchParam) {
            // * 某些情况下参数为 false/0 也应该携带参数
            if ([false, 0].includes(state.searchParam[key]) || state.searchParam[key]) {
                nowSearchParam[key] = state.searchParam[key];
            }
        }
        Object.assign(state.totalParam, nowSearchParam, pagination ? pageParam.value : {});
    }

    /**
     * @description 页面所需参数,按需配置
     * */
    const pageParam = computed({
        get: () => {
            return {
                pageNum: state.pageable.pageNum,
                pageSize: state.pageable.pageSize
            };
        },
        set: (newVal: any) => {
            console.log("我是分页更新之后的值", newVal);
        }
    });

    return {
        ...toRefs(state),
        pageParam,
        search,
        reset,
        change,
        updatePageable,
        updateTotalParam
    }
}