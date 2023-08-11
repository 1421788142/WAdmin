<template>
  <div class="relative" :style="{ width: `${width}px` }">
    <div class="flex items-center justify-center">
      <span>{{ title }}</span>
    </div>
    <!-- 操作按钮集合 -->
    <div
      class="flex items-center justify-between absolute z-[11] right-0 top-0"
    >
      <minus-outlined
        v-if="!destroyOnClose"
        :style="{ fontSize: '20px' }"
        @click="emit('modalMin')"
      />
      <div class="flex items-center mx-4">
        <compress-outlined
          v-if="isFull"
          :style="{ fontSize: '17px' }"
          @click="setup(false)"
        />
        <expand-outlined
          v-else
          :style="{ fontSize: '17px' }"
          @click="setup(true)"
        />
      </div>
      <CloseOutlined
        :style="{ fontSize: '20px' }"
        @click="() => emit('cancel')"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { basicProps } from "../index";

const props = defineProps(basicProps);
const emit = defineEmits(["change", "cancel", "modalMin"]);
const setup = (bol: boolean) => {
  emit("change", bol);
};
</script>

<style lang="scss" scoped></style>
