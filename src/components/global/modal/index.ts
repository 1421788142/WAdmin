import type { PropType } from 'vue';
export const basicProps = {
    draggable: { type: Boolean, default: true }, //是否课拖动modal
    cancelText:{ type: String, default: '取消' },
    okText:{ type: String, default: '确认' },
    showCancelBtn:{ type: Boolean, default: true },//显示关闭按钮
    showOkBtn:{ type: Boolean, default: true },//显示确定按钮
    okType:{ type: String, default: 'primary' },//确定按钮类型
    isFull:{ type: Boolean, default: false },//是否全屏
    title:{ type: String, default: '弹框' },
    visible: { type: Boolean, default:false },
    loading: { type: Boolean, default:false },//按钮loading
    footer: { type: Boolean, default:true },//是否显示底部按钮
    headShow: { type: Boolean, default:true },//是否显示头部
    destroyOnClose: { type: Boolean, default:true },//是否关闭销毁dom
    maskClosable: { type: Boolean, default:true },//是否点击遮罩层关闭
    width: [String, Number] as PropType<string | number>,//宽度
}