import { i18nText } from '../language/setupI18n'
import { message, Modal } from 'ant-design-vue';
import userStore from '@/store/user';
export const checkStatus = async (
    status: number,
    msg:string
)=>{
    let errMessage = '';
    const { loginOut } = userStore()
    switch(status){
        case 400:
            errMessage = `${msg}`;
            break;
        case 401:
            //登录过期操作
            Modal.info({
                title: '温馨提示',
                content: '用户信息过期,请重新登录!',
                onOk:async ()=>{
                    await loginOut()
                }
            });
            break;
        case 403:
            errMessage = await i18nText('sys.errMsg403');
            break;
        case 404:
            errMessage = await i18nText('sys.errMsg404');
            break;
        case 405:
            errMessage = await i18nText('sys.errMsg405');
            break;
        case 408:
            errMessage = await i18nText('sys.errMsg408');
            break;
        case 500:
            errMessage = await i18nText('sys.errMsg500');
            break;
        case 501:
            errMessage = await i18nText('sys.errMsg501');
            break;
        case 502:
            errMessage = await i18nText('sys.errMsg502');
            break;
        case 503:
            errMessage = await i18nText('sys.errMsg503');
            break;
        case 504:
            errMessage = await i18nText('sys.errMsg504');
            break;
        case 505:
            errMessage = await i18nText('sys.errMsg505');
            break;
    }
    if(errMessage){
        message.error(errMessage)
    }
}