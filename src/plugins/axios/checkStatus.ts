import { message, Modal } from 'ant-design-vue';
import userStore from '@/store/user';
import { $$t } from '../language/setupI18n';

export const checkStatus = async (
    status: number,
    msg: string
) => {
    let errMessage = '';
    const { loginOut } = userStore()
    switch (status) {
        case 400:
            errMessage = `${msg}`;
            break;
        case 401:
            //登录过期操作
            Modal.info({
                title: $$t('login.userExpiresTitle'),
                content: $$t('login.userExpiresDesc'),
                onOk: async () => {
                    await loginOut()
                }
            });
            break;
        case 403:
            errMessage = $$t('sys.errMsg403');
            break;
        case 404:
            errMessage = $$t('sys.errMsg404');
            break;
        case 405:
            errMessage = $$t('sys.errMsg405');
            break;
        case 408:
            errMessage = $$t('sys.errMsg408');
            break;
        case 500:
            errMessage = $$t('sys.errMsg500');
            break;
        case 501:
            errMessage = $$t('sys.errMsg501');
            break;
        case 502:
            errMessage = $$t('sys.errMsg502');
            break;
        case 503:
            errMessage = $$t('sys.errMsg503');
            break;
        case 504:
            errMessage = $$t('sys.errMsg504');
            break;
        case 505:
            errMessage = $$t('sys.errMsg505');
            break;
    }
    if (errMessage) {
        message.error(errMessage)
    }
}