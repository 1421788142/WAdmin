/***
 * 给项目添加水印或者页面
 * 实现思路 使用canvas生成base64格式的图片文件,可设置字体样式，颜色。。。
 * 将生成的base64设为背景图片
 * <template v-waterMarker="{text:'水印',textStyle}">
 */
import type { Directive, DirectiveBinding } from "vue";

interface styleInterface {
    font:string,
    fillStyle:string,
    textAlign:'left' | 'top' | 'right' | 'bottom',
    textBaseline:string,
}

const createBase64 = (el:HTMLElement,text:string,style:styleInterface):string=>{
    let canDom:HTMLCanvasElement = document.createElement('canvas')
    el.append(canDom)
    const width = 320;
    const height = 240;
    Object.assign(canDom,{width,height})
    let canDoms = canDom.getContext('2d') as CanvasRenderingContext2D
    if(!canDoms) return ''
    canDoms.rotate((-20 * Math.PI) / 120);
    Object.assign(canDoms,style)
    canDoms.fillText(text, width / 60, height);
    return canDom.toDataURL('image/png')
}

const setWaterMarker = (
    text:string, 
    el:HTMLElement, 
    style:styleInterface = { 
        font:'15px Vedana', 
        fillStyle:'rgba(180, 180, 180, 0.3) ',
        textAlign:'left', 
        textBaseline:'middle'
    }
) =>{
    let waterMarkerDiv = document.createElement('div')
    waterMarkerDiv.style.pointerEvents = 'none'
    waterMarkerDiv.style.zIndex = '1000'
    waterMarkerDiv.style.left = '0px'
    waterMarkerDiv.style.top = '0px'
    waterMarkerDiv.style.position = 'absolute'
    waterMarkerDiv.style.width = el.clientWidth + 'px'
    waterMarkerDiv.style.height = el.clientHeight + 'px'
    waterMarkerDiv.style.background = `url(${createBase64(el,text,style)}) left top repeat`
    el.append(waterMarkerDiv)
    el.style.position = 'relative'
}

const waterMarker:Directive = {
    mounted(el:HTMLElement, binding:DirectiveBinding) {
        setWaterMarker(binding.value.text, el, binding.value.textStyle)
    },
}

export default waterMarker