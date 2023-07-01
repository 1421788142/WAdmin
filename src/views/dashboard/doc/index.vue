<template>
  <div class="relative w-full h-full" v-loading="loading">
    <iframe
      src="http://121.4.119.52:82"
      class="w-full h-full"
      @load="load"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const loading = ref<boolean>(true);
const load = () => {
  setTimeout(() => {
    loading.value = false;
  }, 500);
};
</script>

<style scoped></style>
