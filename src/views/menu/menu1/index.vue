<template>
  <div class="w-[100%] h-[100%]">
    <span>测试缓存</span>
    <a-input></a-input>
    <span v-if="JSON.stringify(query) !== '{}'">跳转携带传参{{ query }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const query = ref<any>();
query.value = route.query;
</script>

<style scoped></style>
