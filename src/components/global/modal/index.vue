<template>
  <a-modal :closable="false" :width="isFull ? '100%' : width" :wrap-class-name="isFull ? 'full-modal' : ''" ref="modalRef"
    @cancel="cancel" v-model:visible="modalVisibled" :maskClosable="maskClosable" :wrap-style="{ overflow: 'hidden' }"
    :destroyOnClose="destroyOnClose" :style="{ top: top, left: '0px' }">
    <template #title v-if="headShow">
      <div style="cursor: move">
        <modalHeader :width="width" :title="title" :destroyOnClose="destroyOnClose" :isFull="isFull" @change="setupFull"
          @cancel="cancel" @modalMin="modalMin" />
      </div>
    </template>
    <div class="md:!max-h-[60vh] !max-h-[80vh] overflow-y-scroll overflow-x-hidden">
      <slot></slot>
    </div>
    <template #footer>
      <slot name="btnSlot">
        <!-- 按需插槽底部按钮  -->
        <modalFooter v-if="footer" :okText="okText" :loading="loading" :cancelText="cancelText"
          :showCancelBtn="showCancelBtn" :okType="okType" :showOkBtn="showOkBtn" @confirm="ok" @cancel="cancel" />
      </slot>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref, watch, onBeforeUnmount } from "vue";
import { sysModeEnum } from "@/enums/sys";
import { useModalDragMove } from "@/hooks/useModal";
import modalHeader from "./components/modalHeader.vue";
import modalFooter from "./components/modalFooter.vue";
import emitter from "@/plugins/mitt";
import { getUid } from "@/utils/util";
import config from "@/store/config";
import { $$t } from "@/plugins/language/setupI18n";
import type { ButtonType } from 'ant-design-vue/es/button/buttonTypes';

export type modalPropType = {
  draggable?: boolean,
  cancelText?: string,
  okText?: string,
  showCancelBtn?: boolean,
  showOkBtn?: boolean,
  okType?: ButtonType,
  title?: string,
  isFull?: boolean,
  visible: boolean,
  loading?: boolean,
  footer?: boolean,
  headShow?: boolean,
  destroyOnClose?: boolean,
  maskClosable?: boolean,
  width?: number | string,
}
const { getConfigState } = config();
const props = withDefaults(defineProps<modalPropType>(), {
  draggable: true,
  cancelText: () => $$t('buttons.cancel'),
  okText: () => $$t('buttons.confirm'),
  showCancelBtn: true,
  showOkBtn: true,
  okType: 'primary',
  isFull: false,
  title: '---',
  visible: false,
  loading: false,
  footer: true,
  headShow: true,
  destroyOnClose: true,
  maskClosable: true,
  width: 500,
});
const isFull = ref<boolean>(false); // 是否全屏
const modalRef = ref<ComponentRef>(); // 是否全屏
const top = ref<string>(null);

watch(
  () => getConfigState("sysMode"),
  (newVal, oldVal) => {
    isFull.value = newVal === sysModeEnum.phone;
  },
  { immediate: true },
);

const setupFull = (bol: boolean) => {
  isFull.value = bol;
  top.value = bol ? "0px" : null;
};
const emit = defineEmits(["btnOk", "btnCancel", "update:visible"]);
const modalVisibled = ref<boolean>(false);

// 底部按钮
const ok = () => {
  emit("btnOk");
};
const cancel = () => {
  emit("update:visible", false);
  emit("btnCancel");
};

const uid = getUid(); //弹窗绑定唯一id
//挂载拖动modal hook
watch(
  () => props.visible,
  (newVal, oldVal) => {
    modalVisibled.value = newVal;
    useModalDragMove({
      visible: newVal,
      destroyOnClose: props.destroyOnClose,
      draggable: props.draggable,
    });
    props.visible && emitter.emit("delModalMin", uid);
  },
  { immediate: true },
);

// 小化
const modalMin = () => {
  emit("update:visible", false);
  if (props.destroyOnClose) return;
  let refObj = {
    title: props.title,
    uid: uid,
  };
  emitter.emit("setModalMin", refObj);
};
emitter.on("openModalMin", uId => {
  if (uId === uid) emit("update:visible", true);
});

onBeforeUnmount(() => {
  emitter.off("openModalMin");
});
</script>
<style lang="scss">
.ant-modal {
  padding: 0 !important;
}

.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }

  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }

  .ant-modal-body {
    flex: 1;
  }
}
</style>
