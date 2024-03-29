import { Http } from "@/plugins/axios";
import { tableResultData, queryTableInterface } from '@/apis/interface'

export interface uploadFile {
    code: number,
    data: {
        name: string,
        url: string,
        id: number
    },
    message: string
}

export interface fileInterface {
    name: string,
    url: string,
    id: number
}

export const imageUpUrl = '/upload/image'
export const videoUpUrl = '/upload/video'
// 上传图片
export const uploadImg = (data: any) => {
    return Http.post<fileInterface>({ url: imageUpUrl, data })
}

// 上传视频
export const uploadVideo = (data: any) => {
    return Http.post<fileInterface>({ url: videoUpUrl, data })
}

export interface deptListType {
    title: string,
    pId: number,
    id: number
}
// 获取部门
export const deptList = () => {
    return Http.get<tableResultData<deptListType>>({ url: '/dept/list' })
}

export interface generalParamType {
    name: string,
    color?: string,
    value: number,
    valueType: number,
    id: number
}
// 获取通用参数
export const generalParam = (data: queryTableInterface & {
    valueType: string
}) => {
    return Http.get<tableResultData<generalParamType>>({ url: '/generalParameters', data })
}