import { reactive, toRefs } from "vue";
import { tableResultData } from "@/apis/interface";
import _ from 'loadsh'
type Api = (...args: any[]) => Promise<Result<tableResultData<any>>>
type UseOptions<T extends Api> = {
    autoLoad?: boolean,//自动加载
    optionKey?: {
        lable?: keyof OptionType<PromiseReturn<T>>[0],
        value?: keyof OptionType<PromiseReturn<T>>[0],
        children: keyof OptionType<PromiseReturn<T>>[0]
    }
}
type OptionType<T> = T extends Result<tableResultData<any>> ? T['data']['dataList'] : any[]

type UseOptionsReturn<T extends Api, O extends UseOptions<T>> = {
    options: OptionType<PromiseReturn<T>>,
    list: {
        [K in keyof O['optionKey']]-?: any
    }[],
    getOptions: (...args: Parameters<T>) => Promise<void>
}
/**
 * @param api 获取options的api
 * @param autoLoad 是否自动加载
 * @param args api入参
 * @example
  const PromiseFunction = async (a: number, c: { id: number }) => Promise<Result<tableResultData<number|string>>>;
  const { options:number|string[] } = useOptions(PromiseFunction,true,1,{id:2});
  const columns: useTableColumn[] = [{enum: options}];
 */
export const useOptions = <T extends Api>(
    api: T,
    args: Parameters<T>,
    option: UseOptions<T> = {}
): UseOptionsReturn<T, UseOptions<T>> => {
    const { autoLoad, optionKey = { lable: 'lable', value: 'value' } } = option
    const options = reactive([]) as OptionType<PromiseReturn<T>>
    const list = reactive([])
    // 获取数据
    let paramsArgs = _.cloneDeep(args) as Parameters<T>;
    const getOptions = async (..._params: Parameters<T>): Promise<void> => {
        // 初始化入参数据
        let params = _.cloneDeep(args, _params) as Parameters<T>;
        const result = (await api.apply(null, params)) as PromiseReturn<Api>
        if (result.code !== 200) return
        options.splice(0); // 不改变options指向的前提 重置options
        options.push(...result.data.dataList)
        list.splice(0)
        list.push(
            ...options.map(x => {
                const _e = {}
                for (const [key, value] of Object.entries(optionKey)) {
                    _e[key] = x[value]
                }
                return _e
            })
        )
    }
    autoLoad && getOptions(...paramsArgs)
    return { options, list, getOptions }
}