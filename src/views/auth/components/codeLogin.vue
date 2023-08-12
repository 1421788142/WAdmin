<template>
  <div class="text-center">
    <qrcode-vue
      class="mx-auto"
      :value="data.payUrl"
      :size="data.size"
      level="H"
    />
    <p class="my-5 text-sm text-gray-700">{{ $t("login.scanCodeDesc") }}</p>
    <backButton />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import QrcodeVue from "qrcode.vue";
import backButton from "./backButton.vue";

const data = reactive<{
  payUrl: string;
  size: number;
}>({
  payUrl: "wwww.w..dwa",
  size: 200,
});
</script>

<style scoped></style>
