import { Http } from "@/plugins/axios";
import { tableResultData } from '@/apis/interface'

export interface queryInterface {
    title?: string,
}

// 列表
export const menuList = (data?: queryInterface) => {
    return Http.get<tableResultData<menuListType>>({ url: `user/router`, data })
}
// 编辑
export const updateMenu = (data: menuListType) => {
    return Http.post<{ message: string }>({ url: `user/router/update`, data })
}
// 删除
export const delMenu = (data: { id: number }) => {
    return Http.delete<{ message: string }>({ url: `user/router/del`, data })
}