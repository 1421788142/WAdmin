<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <div
      @click="route.go(-1)"
      class="bg-[#F6F7F8] cursor-pointer p-[50px] rounded-2xl shadow-2xl"
    >
      <w-svg-icon name="jiemo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const route = useRouter();
</script>

<style scoped></style>
