<template>
  <div>
    <a-button @click="cancel" :disabled="loading" v-if="showCancelBtn">
      {{ cancelText }}
    </a-button>
    <a-button @click="confirm" :loading="loading" :type="okType" v-if="showOkBtn">
      {{ okText }}
    </a-button>
  </div>
</template>

<script setup lang="ts">
import type { ButtonType } from 'ant-design-vue/es/button/buttonTypes';

withDefaults(defineProps<{
  okText: string,
  loading: boolean,
  cancelText: string,
  showCancelBtn: boolean,
  showOkBtn: boolean,
  okType: ButtonType,
}>(), {});
const emit = defineEmits(["cancel", "confirm"]);
const cancel = (e: Event) => {
  emit("cancel", e);
};
const confirm = (e: Event) => {
  emit("confirm", e);
};
</script>

<style scoped></style>
