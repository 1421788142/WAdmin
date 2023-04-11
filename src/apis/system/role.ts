import { Http } from "@/plugins/axios";
import { tableResultData } from '@/apis/interface'

export interface queryInterface {
    roleName?: string,
}

export interface roleInterface {
    createdTime?: string,
    id: number,
    memo: string,
    menuId: number[],
    order: number,
    roleName: string,
    status: number,
}

// 全部列表
export const roleListAll = (data?: queryInterface) => {
    return Http.get<tableResultData<roleInterface>>({ url: `user/role/listAll`, data })
}
// 列表
export const roleList = (data?: queryInterface) => {
    return Http.get<tableResultData<roleInterface>>({ url: `user/role/pageList`, data })
}
// 编辑
export const updateRole = (data: roleInterface) => {
    return Http.post<{ message: string }>({ url: `user/role/update`, data })
}
// 删除
export const delRole = (data: { id: number }) => {
    return Http.delete<{ message: string }>({ url: `user/role/del`, data })
}