export interface IData {
    expire?: number
    [key: string]: any
}
// 封装一个自定义的可过期的localStorage缓存
// expire 过期时间,不传默认不过期
export default {
    set(key: string, data: IData):void {
        if (data.expire) {
            data.expire = new Date().getTime() + data.expire * 1000
        }
        localStorage.setItem(key, JSON.stringify(data))
    },

    get(key: string): IData | null {
        const item = localStorage.getItem(key)
        if (item) {
            const data = JSON.parse(item)
            const expire = data?.expire
            if (expire && expire < new Date().getTime()) {
                localStorage.removeItem(key)
                return null
            } else {
                return data
            }
        }
        return null
    }
}