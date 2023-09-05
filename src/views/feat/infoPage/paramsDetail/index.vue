<template>
  <a-card title="这是详情页" :bordered="false">
    <div>
      <div class="my-5">组件拿到参数为{{ params }}</div>
      <a-input v-model:value="test"></a-input>
      <div class="flex">
        <a-button type="primary">
          <router-link type="" :to="'/feat/infoPage'">返回上一页</router-link>
        </a-button>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import emitter from "@/plugins/mitt";

const route = useRoute();
const params =
  "{}" !== JSON.stringify(route.query) ? route.query : route.params;
const test = ref<string>("");

onMounted(() => {
  emitter.emit("setupMenuTag", (tag: historyTagItem) => {
    tag.title = `No.${params.id}详情信息-params`;
  });
});
</script>

<style scoped></style>
