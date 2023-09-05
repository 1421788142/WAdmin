import { tableResultData } from '@/apis/interface'
export type resultType = tableResultData<any>
type requestApiType = (params: any) => Promise<Result<resultType>>
type beforeLoadType = (params: any) => boolean | object | void
type afterLoadType = (records: resultType, state: any) => any
export namespace WaterfallType {
    export interface hookProps {
        initParam?: {
            [key: string]: any
        },
        pagination?: boolean,
        requestApi: requestApiType,
        beforeLoad?: beforeLoadType,
        afterLoad?: afterLoadType,
    }
    export interface stateProps {

    }
}