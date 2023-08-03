<template>
  <a-card title="矩形裁剪（提示：右键下面左侧裁剪区可开启功能菜单）">
    <div class="flex flex-wrap items-center justify-around">
      <div class="md:w-[50%] w-[100%]">
        <cropperImageVue
          @cropper="cropper"
          :circled="false"
          :src="getAssets('/image/cropper.png')"
        />
      </div>
      <div
        class="p-5 w-[300px] h-[300px] flex justify-center items-center ml-4 rounded-lg shadow-2xl"
      >
        <a-image :src="imageSrc" />
      </div>
    </div>
    <div class="mt-4 text-center">裁剪信息:{{ cropperInfo }}</div>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getAssets } from "@/utils/util";
import cropperImageVue from "@/components/cropperImage/index.vue";

const imageSrc = ref();
const cropperInfo = ref();
// 定义输出函数
const cropper = value => {
  imageSrc.value = value.base64;
  cropperInfo.value = value.info;
};
</script>

<style scoped></style>
