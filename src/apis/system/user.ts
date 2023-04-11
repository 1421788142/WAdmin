import { Http } from "@/plugins/axios";
import { tableResultData } from '@/apis/interface'
import { queryTableInterface } from '../interface'
export interface queryInterface extends queryTableInterface {
    grade?: number,
    userType?: number,
    userName?: string,
}

export interface userInterface {
    id: number,
    userName: string,
    nickname: string,
    userId: number,
    url: string,
    userType: number,
    age: number,
    address: string,
    avatar: string,
    grade: number,
    email: string,
}

// 列表
export const userList = (data?: queryInterface) => {
    return Http.get<tableResultData<userInterface>>({ url: `user/pageList`, data })
}
// 编辑
export const updateUser = (data: userInterface) => {
    return Http.post<{ message: string }>({ url: `user/update`, data })
}
// 删除
export const delUser = (data: { id: number }) => {
    return Http.delete<{ message: string }>({ url: `user/del`, data })
}