import {
  defineComponent,
  h,
  withDirectives,
} from "vue";
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
import { $$t } from "@/plugins/language/setupI18n";
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
        title: $$t("buttons.upload"),
        icon: (
          <Upload
            beforeUpload={file =>
              props.beforeUpload(file)
            }
            showUploadList={false}>
            <UploadOutlined class='!text-xl' />
          </Upload>
        ),
      },
      {
        title: $$t("buttons.download"),
        icon: <DownloadOutlined />,
        event: () => props.downloadByBase64(),
      },
      {
        title: $$t("components.cropping"),
        icon: <AppstoreAddOutlined />,
        event: () => props.setViewType(),
      },
      {
        title: $$t("buttons.reset"),
        icon: <SyncOutlined />,
        event: () => props.handCropper("reset"),
      },
      {
        title: $$t("components.moveUp"),
        icon: <ArrowUpOutlined />,
        event: () =>
          props.handCropper("move", 0, -10),
      },
      {
        title: $$t("components.moveDown"),
        icon: <ArrowDownOutlined />,
        event: () =>
          props.handCropper("move", 0, 10),
      },
      {
        title: $$t("components.moveLeft"),
        icon: <ArrowLeftOutlined />,
        event: () =>
          props.handCropper("move", -10, 0),
      },
      {
        title: $$t("components.moveRight"),
        icon: <ArrowRightOutlined />,
        event: () =>
          props.handCropper("move", 10, 0),
      },
      {
        title: $$t("components.xTurn"),
        icon: <SwapOutlined />,
        event: () =>
          props.handCropper("scaleX", -1),
      },
      {
        title: $$t("components.yTurn"),
        icon: <VerticalAlignMiddleOutlined />,
        event: () =>
          props.handCropper("scaleY", -1),
      },
      {
        title: $$t("components.rotateL"),
        icon: <RotateLeftOutlined />,
        event: () =>
          props.handCropper("rotate", -45),
      },
      {
        title: $$t("components.rotateR"),
        icon: <RotateRightOutlined />,
        event: () =>
          props.handCropper("rotate", 45),
      },
      {
        title: $$t("components.enlarge"),
        icon: <ZoomInOutlined />,
        event: () =>
          props.handCropper("zoom", 0.1),
      },
      {
        title: $$t("components.zoom"),
        icon: <ZoomOutOutlined />,
        event: () =>
          props.handCropper("zoom", -0.1),
      },
    ];
    return () => (
      <div class='p-1 bg-white w-[60px] flex justify-between flex-wrap'>
        {menuItemList.map((item, index) =>
          withDirectives(
            h(
              "span",
              {
                class:
                  "cursor-pointer mb-2 !text-xl",
                onClick: item.event,
              },
              item.icon,
            ),
            [
              [
                tippy,
                {
                  content: item.title,
                  placement: `${
                    index % 2 === 0
                      ? "left"
                      : "right"
                  }-start`,
                },
              ],
            ],
          ),
        )}
      </div>
    );
  },
});
