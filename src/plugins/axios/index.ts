import VAxios from "./axios";
import { ResultEnum, ContentTypeEnum } from "@/enums/httpEnum";
export const baseURL = import.meta.env.VITE_API_URL as string
const Http = new VAxios({
    baseURL: baseURL,
    timeout: ResultEnum.TIMEOUT as number,
    headers: {
        'Content-Type': ContentTypeEnum.JSON
    }
})
export { Http }