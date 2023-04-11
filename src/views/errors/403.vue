<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <div>
      <a-image
        :preview="false"
        :src="getAssets('image/403.png')"
      ></a-image>
    </div>
    <div class="ml-[5vw]">
      <h2 class="text-6xl font-bold text-w text-stone-600">403</h2>
      <p class="text-xl">抱歉，您无权访问该页面~🙅‍♂️🙅‍♀️</p>
      <a-button type="primary" @click="goHome">返回上一页</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAssets } from '@/utils/util'
import { useRouter } from "vue-router";
const router = useRouter();

const goHome = () => {
  router.go(-1);
};
</script>

<style scoped>
</style>