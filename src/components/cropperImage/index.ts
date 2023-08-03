import Cropper from "cropperjs"; // 引入Cropper插件

export const defaultOptions = {
  aspectRatio: 1,
  zoomOnWheel: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: true,
  autoCrop: true, //当初始化时，可以自动生成图像(就是自动显示裁剪框，改成false裁剪框自动消失)
  background: true, //显示容器的网格背景(就是后面的马赛克)
  highlight: true, //在裁剪框上方显示白色的区域(突出裁剪框)
  center: true, //裁剪框在图片正中心
  responsive: true, //在调整窗口大小的时候重新渲染cropper
  restore: true, //在调整窗口大小后恢复裁剪的区域
  checkCrossOrigin: true, //检查当前图像是否为跨域图像
  checkOrientation: true, //检查当前图像的Exif定向信息
  scalable: true, //是否允许缩放图像
  zoomable: true, //是否允许放大图像
  zoomOnTouch: true, //是否可以通过拖动触摸来放大图像
  modal: true, //显示图片上方的黑色模态并在裁剪框下面
  guides: true, //显示在裁剪框上方的虚线
  movable: true, //是否允许可以移动后面的图片
  rotatable: true, //是否允许旋转图像
} as Cropper.Options;
