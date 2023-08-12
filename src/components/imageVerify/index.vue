<template>
  <canvas
    ref="domRef"
    width="120"
    height="40"
    class="cursor-pointer"
    @click="getImgCode"
  />
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useImageVerify } from ".";
const { domRef, imgCode, setImgCode, getImgCode } = useImageVerify();

interface Emits {
  (e: "update:code", code: string): void;
}
const emit = defineEmits<Emits>();
watch(
  () => props.code,
  newValue => {
    setImgCode(newValue);
  },
);

watch(imgCode, newValue => {
  emit("update:code", newValue);
});

const props = withDefaults(defineProps<{ code: string }>(), {
  code: "",
});

defineExpose({ getImgCode });
</script>

<style scoped></style>
