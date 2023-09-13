import { unref, watchEffect } from 'vue';

export interface useModalInterface {
    draggable: boolean;
    destroyOnClose: boolean;
    visible: boolean;
}

export function useModalDragMove(context: useModalInterface) {
    // 获取属性
    const getStyle = (dom: any, attr: any) => getComputedStyle(dom)[attr]
    const drag = (wrap: any) => {
        if (!wrap) return;

        wrap.setAttribute('data-drag', unref(context.draggable)); //添加属性 是否打开了model框

        const modelHeaderEl = wrap.querySelector('.ant-modal-header');//获取拖动dom

        const modelDom = wrap.querySelector('.ant-modal');//获取需要移动dom

        if (!modelHeaderEl || !modelDom || !unref(context.draggable)) return; //拖动dom || 没有需要拖到的dom || 和是否打开容器

        modelHeaderEl.style.cursor = 'move'; //添加鼠标小手

        modelHeaderEl.onmousedown = (e: any) => {
            if (!e) return;

            // 鼠标按下,获取当前按下的光标位置
            const disX = e.clientX;
            const disY = e.clientY;

            // 获取视图宽高
            const screenWidth = document.body.clientWidth;
            const screenHeight = document.documentElement.clientHeight; //应为body高度，可某些环境下无法获取

            // 对话框宽高
            const modelDomWidth = modelDom.offsetWidth;
            const modelDomHeight = modelDom.offsetHeight;

            // 获取对话框距离视图的所有距离差
            const minModelDomLeft = modelDom.offsetLeft;//距离左部
            const maxModelDomLeft = screenWidth - modelDom.offsetLeft - modelDomWidth;//距离右侧
            const minModelDomTop = modelDom.offsetTop;//距离顶部
            const maxModelDomTop = screenHeight - modelDom.offsetTop - modelDomHeight;//距离底部


            //获取model当前的left和top
            const domLeft = getStyle(modelDom, 'left');
            const domTop = getStyle(modelDom, 'top');
            let styL = +domLeft;
            let styT = +domTop;


            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if (domLeft.includes('%')) {
                styL = +document.body.clientWidth * (+domLeft.replace(/%/g, '') / 100);
                styT = +document.body.clientHeight * (+domTop.replace(/%/g, '') / 100);
            } else {
                styL = +domLeft.replace(/px/g, '');
                styT = +domTop.replace(/px/g, '');
            }

            // 通过事件委托，计算移动的距离
            document.onmousemove = function (e) {
                let left = e.clientX - disX;
                let top = e.clientY - disY;

                // 边界处理
                if (-left > minModelDomLeft) {
                    left = -minModelDomLeft;
                } else if (left > maxModelDomLeft) {
                    left = maxModelDomLeft;
                }

                if (-top > minModelDomTop) {
                    top = -minModelDomTop;
                } else if (top > maxModelDomTop) {
                    top = maxModelDomTop;
                }

                // 移动当前元素
                modelDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
            };

            // 抬起清空事件
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    };

    const handleDrag = () => {
        const dragWraps = document.querySelectorAll('.ant-modal-wrap');
        for (const wrap of Array.from(dragWraps)) {
            if (!wrap) continue;
            const display = getStyle(wrap, 'display');
            const draggable = wrap.getAttribute('data-drag');
            if (display !== 'none') {
                // 拖拽位置
                if (draggable === null || unref(context.destroyOnClose)) {
                    drag(wrap);
                }
            }
        }
    };

    watchEffect(() => {
        if (!unref(context.visible) || !unref(context.draggable)) {
            return;
        }
        setTimeout(() => {
            handleDrag()
        }, 30)
    });
}
