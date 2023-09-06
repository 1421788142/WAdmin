import { tableResultData } from '@/apis/interface'

export type Api = (...args: any[]) => Promise<Result<tableResultData<any>>>

export type OptionsType<T> = T extends Result<tableResultData<any>> ? T['data']['dataList'] : any[]

export type DataContent<T extends Api> = OptionsType<PromiseReturnType<T>>[number]

export type OptionsContent<T extends Api> = {
    autoLoad?: boolean,//是否自动加载
    optionKey?: {
        label?: keyof DataContent<T>,
        value?: keyof DataContent<T>,
        [props: string]: keyof DataContent<T>
    },
    afterRequest?: (record: OptionsType<PromiseReturnType<T>>) => OptionsType<PromiseReturnType<T>> //加载完成后的回调
}

type GetEnumKey<O extends OptionsContent<any>> = keyof O['optionKey'] extends '' ?
    { label: "name"; value: "value" }
    : O["optionKey"];

export type UseOptionsReturnType<T extends Api, O extends OptionsContent<T>> = {
    options: OptionsType<PromiseReturnType<T>>
    list: {
        // @ts-ignore
        [K in keyof GetEnumKey<O>]-?: DataContent<T>[GetEnumKey<O>[K]]
    }[]
    getOptions: (...args: Parameters<T>) => Promise<void>;
}