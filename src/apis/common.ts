import { Http } from "@/plugins/axios";

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