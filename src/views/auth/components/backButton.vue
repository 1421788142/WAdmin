<template>
  <a-button size="large" class="w-full" @click="setCurrentPage(1)">
    <span class="text-sm">{{ $t("buttons.back") }}</span>
  </a-button>
</template>

<script setup lang="ts">
import userStore from "@/store/user";

const { setCurrentPage } = userStore();
</script>

<style scoped></style>
