import { reactive } from "vue";
import _ from "loadsh";
// import { paramsAll } from "@/apis/system/generalParam";
import type {
    Api,
    OptionsContent,
    UseOptionsReturnType,
    OptionsType,
} from "./type";

/**
 * @param api 获取options的api
 * @param args api入参
 * @example
 * ```js
  import { paramsAll } from "xxx/xxx/xxx/xxx";
  const { options, enums } = useOptions(paramsAll, [{}]); // typeof enums === { label: string; value: string; }[]

  const { options, enums } = useOptions(paramsAll, [{}], { // typeof enums === { a: number; }[]
    enumKey: {
      a: "id",
    },
  });
 * ```
 */

export const useOptions = <
    T extends Api,
    O extends OptionsContent<T> = OptionsContent<T>
>(
    api: T,
    args: Parameters<T>['length'] extends 0 ? undefined[] : Parameters<T>,
    option: O = {} as O
): UseOptionsReturnType<T, O> => {
    const {
        autoLoad = true,
        optionKey = { label: 'name', value: 'value' },
        afterRequest,
    } = option;

    const options = reactive([]) as OptionsType<PromiseReturnType<T>>;

    const list = reactive([])

    let paramsArgs = _.cloneDeep(args) as Parameters<T>;

    const getOptions = async (..._args: Parameters<T>): Promise<void> => {
        paramsArgs = _.merge(paramsArgs, _args);
        const result = (await api.apply(null, paramsArgs)) as PromiseReturn<Api>;
        if (result.code !== 200) return
        options.splice(0); // 不改变options指向的前提 重置options
        options.push(
            ...afterRequest
                ? afterRequest(result.data.dataList as OptionsType<PromiseReturnType<T>>)
                : result.data.dataList
        );
        list.splice(0);
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
    return {
        options,
        list,
        getOptions
    }
}