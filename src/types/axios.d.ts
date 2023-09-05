declare interface RequestOptions {
    // 将请求参数拼接到url
    joinParamsToUrl?: boolean;
    // 接口地址，留空使用默认apiUrl
    apiUrl?: string;
    // 是否添加时间戳 加入了秒和毫秒级别时间戳会导致axios阻止重复请求功能失效
    joinTime?: boolean; //时间戳键名为_t
    // 是否取消令牌
    ignoreCancelToken?: boolean;
    // 是否在header中发送token
    withToken?: boolean;
    // 是否取消阻止重复请求默认否
    preventDuplication?: boolean
}
// 接口返回参数
declare interface Result<T> {
    code: number,
    message: string,
    msg?: string,
    data: T
}
