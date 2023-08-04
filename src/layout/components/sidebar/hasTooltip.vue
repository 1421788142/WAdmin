<template>
  <span>
    <a-tooltip placement="top" v-if="isShowTooltip">
      <template #title>{{ text }}</template>
      <p class="cardp" @mouseenter="visibilityChange">{{ text }}</p>
    </a-tooltip>
    <p class="cardp" v-else @mouseenter="visibilityChange">{{ text }}</p>
  </span>
</template>

<script setup lang="ts">
import { ref } from "vue";
defineProps<{ text: string }>();
const isShowTooltip = ref<boolean>(false);

const visibilityChange = event => {
  const ev = event.target;
  const ev_weight = ev.scrollWidth; // 文本的实际宽度   scrollWidth：对象的实际内容的宽度，不包边线宽度，会随对象中内容超过可视区后而变大。
  const content_weight = ev.clientWidth; // 文本的可视宽度 clientWidth：对象内容的可视区的宽度，不包滚动条等边线，会随对象显示大小的变化而改变。
  if (ev_weight > content_weight) {
    // 实际宽度 > 可视宽度  文字溢出
    isShowTooltip.value = true;
  } else {
    // 否则为不溢出
    isShowTooltip.value = false;
  }
};
</script>

<style scoped>
.cardp {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 !important;
}
</style>
