import { Http } from "@/plugins/axios";
import { tableResultData, queryTableInterface } from '@/apis/interface'
import { userInterface } from '../user'

export interface userListInterface extends userInterface {
    id:number,
    url:string,
    userType:number,
    age:number,
    address:string,
    stars: number,
}
export const userList = (data:queryTableInterface) => {
    return Http.get<tableResultData<userListInterface>>({ url:`user/pageList`, data })
}