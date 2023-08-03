<template>
  <div
    ref="tippyElRef"
    @contextmenu="contextmenu"
    :style="getWrapperStyle"
    :class="getClass"
  >
    <img
      :style="getImageStyle"
      :crossorigin="crossorigin"
      v-show="isReady"
      :src="beforeSrc"
      ref="imgElRef"
    />
  </div>
</template>

<script setup lang="tsx">
import {
  ref,
  onMounted,
  unref,
  onUnmounted,
  PropType,
  type CSSProperties,
  nextTick,
  computed,
  useAttrs,
  defineComponent,
  h,
  withDirectives,
} from "vue"; // 引入 ref、onMounted、onUnmounted
import { useResizeObserver } from "@vueuse/core";
import { useTippy } from "vue-tippy";
import Cropper from "cropperjs"; // 引入Cropper插件
import "cropperjs/dist/cropper.css"; // 引入Cropper插件的样式文件
import { defaultOptions } from "./";
import { directive as tippy } from "vue-tippy";
import { debounce, downloadByBase64 } from "@/utils/util";
import { Upload } from "ant-design-vue";
import {
  UploadOutlined,
  DownloadOutlined,
  AppstoreAddOutlined,
  SyncOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  VerticalAlignMiddleOutlined,
  SwapOutlined,
} from "@ant-design/icons-vue";

interface propsType {
  src: string;
  alt?: string;
  height?: number;
  crossorigin?: "" | "anonymous" | "use-credentials" | undefined;
  imageStyle?: CSSProperties; //图片样式
  realTimePreview?: boolean; //是否实时裁剪预览
  circled?: boolean; //是否圆形裁剪
  options?: PropType<Cropper.Options>; //配置
}

const props = withDefaults(defineProps<propsType>(), {
  height: 350,
  realTimePreview: true,
  circled: true,
  imageStyle: () => ({}),
  options: () => ({}),
});

const getImageStyle = computed((): CSSProperties => {
  return {
    height: `${props.height}px`,
    maxWidth: "100%",
    ...props.imageStyle,
  };
});

const getWrapperStyle = computed((): CSSProperties => {
  return { height: `${props.height}` + "px" };
});

const getClass = computed(() => {
  const attrs = useAttrs();
  return [
    attrs.class,
    {
      ["circled"]: inCircled.value,
    },
  ];
});

const cropper = ref<Nullable<Cropper>>(null);
const tippyElRef = ref<HTMLImageElement>();
const imgElRef = ref<HTMLImageElement>(); // 定义图片
const isReady = ref<boolean>(false); //是否图片准备完毕
const inCircled = ref<boolean>(props.circled); //是否圆形裁剪
const beforeSrc = ref(props.src);
const imageBase64 = ref(null); //裁剪后的图片base64
let scaleX = 1; //翻转记录
let scaleY = 1; //翻转记录
const emit = defineEmits(["cropper", "error"]);

const beforeUpload = (file: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  beforeSrc.value = "";
  reader.onload = e => {
    beforeSrc.value = e.target?.result as string;
  };
  reader.onloadend = () => {
    cropper.value.destroy();
    init();
  };
  return false;
};
const menuItemList = [
  {
    title: "上传",
    icon: (
      <Upload beforeUpload={beforeUpload} showUploadList={false}>
        <UploadOutlined class='!text-xl' />
      </Upload>
    ),
  },
  {
    title: "下载",
    icon: <DownloadOutlined />,
    event: () => downloadByBase64(imageBase64.value, "cropping"),
  },
  {
    title: "圆形,矩形裁剪",
    icon: <AppstoreAddOutlined />,
    event: () => {
      (inCircled.value = !inCircled.value), realTimeCroppered();
    },
  },
  {
    title: "重置",
    icon: <SyncOutlined />,
    event: () => handCropper("reset"),
  },
  {
    title: "上移",
    icon: <ArrowUpOutlined />,
    event: () => handCropper("move", 0, -10),
  },
  {
    title: "下移",
    icon: <ArrowDownOutlined />,
    event: () => handCropper("move", 0, 10),
  },
  {
    title: "左移",
    icon: <ArrowLeftOutlined />,
    event: () => handCropper("move", -10, 0),
  },
  {
    title: "右移",
    icon: <ArrowRightOutlined />,
    event: () => handCropper("move", 10, 0),
  },
  {
    title: "水平翻转",
    icon: <SwapOutlined />,
    event: () => handCropper("scaleX", -1),
  },
  {
    title: "垂直翻转",
    icon: <VerticalAlignMiddleOutlined />,
    event: () => handCropper("scaleY", -1),
  },
  {
    title: "逆时针旋转",
    icon: <RotateLeftOutlined />,
    event: () => handCropper("rotate", -45),
  },
  {
    title: "顺时针旋转",
    icon: <RotateRightOutlined />,
    event: () => handCropper("rotate", 45),
  },
  {
    title: "放大",
    icon: <ZoomInOutlined />,
    event: () => handCropper("zoom", 0.1),
  },
  {
    title: "缩小",
    icon: <ZoomOutOutlined />,
    event: () => handCropper("zoom", -0.1),
  },
];

const menuContent = defineComponent({
  directives: {
    tippy,
  },
  setup() {
    return () => (
      <div class='p-1 bg-white w-[60px] flex justify-between flex-wrap'>
        {menuItemList.map((item, index) =>
          withDirectives(
            h(
              "span",
              { class: "cursor-pointer mb-2 !text-xl", onClick: item.event },
              item.icon,
            ),
            [
              [
                tippy,
                {
                  content: item.title,
                  placement: `${index % 2 === 0 ? "left" : "right"}-start`,
                },
              ],
            ],
          ),
        )}
      </div>
    );
  },
});

// 裁剪预览
const realTimeCroppered = () => {
  props.realTimePreview && croppered();
};

// 圆形裁剪
const getRoundedCanvas = (): HTMLCanvasElement => {
  const sourceCanvas = cropper.value!.getCroppedCanvas();
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;
  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = "destination-in";
  context.beginPath();
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true,
  );
  context.fill();
  return canvas;
};

// 实时裁剪
const croppered = () => {
  if (!cropper.value) return;
  const canvas = inCircled.value
    ? getRoundedCanvas()
    : cropper.value.getCroppedCanvas();
  canvas.toBlob(blob => {
    if (!blob) return;
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onloadend = e => {
      if (!e.target?.result || !blob) return;
      imageBase64.value = e.target.result;
      emit("cropper", {
        base64: e.target.result,
        blob,
        info: { size: blob.size, ...cropper.value.getData() },
      });
    };
    fileReader.onerror = () => {
      emit("error");
    };
  });
};

const debounceRealTimeCroppered = debounce(realTimeCroppered, 80);

const init = () => {
  const imgEl = unref(imgElRef);
  if (!imgEl) return;
  cropper.value = new Cropper(imgEl, {
    ...defaultOptions,
    ready: () => {
      //插件准备完成执行的函数（只执行一次）
      isReady.value = true;
      realTimeCroppered();
    },
    cropmove: () => {
      //剪裁框移动时执行的函数
      debounceRealTimeCroppered();
    },
    crop: () => {
      //剪裁框发生变化执行的函数
      debounceRealTimeCroppered();
    },
    zoom: () => {
      //剪裁框缩放的时候执行的函数
      debounceRealTimeCroppered();
    },
    ...props.options,
  });
};

type eventType = keyof Cropper;
const handCropper = <T extends eventType>(
  event: T,
  ...args: Parameters<Cropper[T]>
) => {
  if (event === "scaleX") {
    scaleX = args[0] = scaleX === -1 ? 1 : -1;
  }
  if (event === "scaleY") {
    scaleY = args[0] = scaleY === -1 ? 1 : -1;
  }
  cropper.value[event].apply(cropper.value, args);
};

useResizeObserver(tippyElRef, () => {
  handCropper("reset");
});

const contextmenu = event => {
  event.preventDefault();
  const { show, setProps } = useTippy(tippyElRef, {
    content: menuContent,
    arrow: false,
    theme: "light",
    trigger: "manual",
    interactive: true,
    appendTo: "parent",
    // hideOnClick: false,
    animation: "perspective",
    placement: "bottom-start",
  });

  setProps({
    getReferenceClientRect: () => ({
      width: 0,
      height: 0,
      top: event.clientY,
      bottom: event.clientY,
      left: event.clientX,
      right: event.clientX,
    }),
  });

  show();
};

onMounted(async () => {
  await nextTick();
  init();
});

// 定义销毁函数
const handleDestroy = () => {
  if (cropper.value) {
    cropper.value.destroy(); // 销毁对象
    cropper.value = null;
  }
};

onUnmounted(() => {
  handleDestroy(); // 组件销毁时销毁对象
});
</script>

<style lang="scss">
@import "cropperjs/dist/cropper.css";
@import "tippy.js/dist/tippy.css";
@import "tippy.js/themes/light.css";
@import "tippy.js/animations/perspective.css";
.circled .cropper-face,
.circled .cropper-view-box {
  border-radius: 50% !important;
}
</style>
