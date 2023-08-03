import { defineComponent, h, withDirectives } from "vue";
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

import { directive as tippy } from "vue-tippy";

type eventType = keyof Cropper;
interface MyProps {
  beforeUpload: (file: File) => void;
  downloadByBase64: () => void;
  setViewType: () => void;
  handCropper: <T extends eventType>(
    event: T,
    ...args: Parameters<Cropper[T]>
  ) => void;
}

export default defineComponent({
  directives: {
    tippy,
  },
  props: {
    beforeUpload: {
      type: Function,
      required: true,
    },
    downloadByBase64: {
      type: Function,
      required: true,
    },
    setViewType: {
      type: Function,
      required: true,
    },
    handCropper: {
      type: Function,
      required: true,
    },
  },
  setup(props: MyProps) {
    const menuItemList = [
      {
        title: "上传",
        icon: (
          <Upload
            beforeUpload={file => props.beforeUpload(file)}
            showUploadList={false}>
            <UploadOutlined class='!text-xl' />
          </Upload>
        ),
      },
      {
        title: "下载",
        icon: <DownloadOutlined />,
        event: () => props.downloadByBase64(),
      },
      {
        title: "圆形,矩形裁剪",
        icon: <AppstoreAddOutlined />,
        event: () => props.setViewType(),
      },
      {
        title: "重置",
        icon: <SyncOutlined />,
        event: () => props.handCropper("reset"),
      },
      {
        title: "上移",
        icon: <ArrowUpOutlined />,
        event: () => props.handCropper("move", 0, -10),
      },
      {
        title: "下移",
        icon: <ArrowDownOutlined />,
        event: () => props.handCropper("move", 0, 10),
      },
      {
        title: "左移",
        icon: <ArrowLeftOutlined />,
        event: () => props.handCropper("move", -10, 0),
      },
      {
        title: "右移",
        icon: <ArrowRightOutlined />,
        event: () => props.handCropper("move", 10, 0),
      },
      {
        title: "水平翻转",
        icon: <SwapOutlined />,
        event: () => props.handCropper("scaleX", -1),
      },
      {
        title: "垂直翻转",
        icon: <VerticalAlignMiddleOutlined />,
        event: () => props.handCropper("scaleY", -1),
      },
      {
        title: "逆时针旋转",
        icon: <RotateLeftOutlined />,
        event: () => props.handCropper("rotate", -45),
      },
      {
        title: "顺时针旋转",
        icon: <RotateRightOutlined />,
        event: () => props.handCropper("rotate", 45),
      },
      {
        title: "放大",
        icon: <ZoomInOutlined />,
        event: () => props.handCropper("zoom", 0.1),
      },
      {
        title: "缩小",
        icon: <ZoomOutOutlined />,
        event: () => props.handCropper("zoom", -0.1),
      },
    ];
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
