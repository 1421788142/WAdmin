<template>
  <div>
    <a-modal
      :width="isFull ? '100%' : width"
      :wrap-class-name="isFull ? 'full-modal' : ''"
      ref="modalRef"
      @cancel="cancel"
      v-model:visible="modalVisibled"
      :destroyOnClose="destroyOnClose"
      :maskClosable="maskClosable"
      :wrap-style="{ overflow: 'hidden' }"
    >
      <template #closeIcon>
        <modalClose @cancel="cancel" />
      </template>
      <template #title v-if="headShow">
        <div style="cursor: move">
          <modalHeader
            :title="title"
            :isFull="isFull"
            @change="setupFull"
          />
        </div>
      </template>
      <div class="!max-h-[70vh] overflow-y-scroll overflow-x-hidden">
        <slot></slot>
      </div>
      <template #footer>
        <modalFooter
          v-if="footer"
          :okText="okText"
          :cancelText="cancelText"
          :showCancelBtn="showCancelBtn"
          :showOkBtn="showOkBtn"
          @confirm="ok"
          @cancel="cancel"
        />
        <!-- 按需插槽底部按钮  -->
        <slot name="btnSlot"></slot> 
      </template>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import modalClose from './components/modalClose.vue';
import modalHeader from './components/modalHeader.vue';
import modalFooter from './components/modalFooter.vue';

import { useModalDragMove } from '@/hooks/useModal';

import { sysModeEnum } from '@/enums/sys';
import { ref, watch } from "vue";

import { basicProps } from './index';

import config from '@/store/config';
const configStore = config()
const { sysMode } = configStore

const props = defineProps(basicProps)
const isFull = ref<boolean>(false)// 是否全屏

watch(()=>sysMode,(newVal,oldVal)=>{
    isFull.value = newVal === sysModeEnum.phone
},{immediate: true})

const setupFull = (bol:boolean)=>{
  isFull.value = bol
}
const emit = defineEmits(['btnOk','btnCancel','update:visible'])
const modalVisibled = ref<boolean>(false)

// 底部按钮
const ok = ()=>{
  emit('btnOk')
}
const cancel = ()=>{
  emit('update:visible',false)
  emit('btnCancel')
}

//挂载拖动modal hook 
watch(()=>props.visible,(newVal,oldVal)=>{
  modalVisibled.value = newVal
  useModalDragMove({
    visible:newVal,
    destroyOnClose:props.destroyOnClose,
    draggable:props.draggable,
  })
},{immediate: true})

</script>
<style lang="scss">
.ant-modal{
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
