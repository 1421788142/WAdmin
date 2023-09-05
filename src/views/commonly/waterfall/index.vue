<template>
  <div class="h-full">
    <waterfallVue :request-api="userList" :init-param="{ pageSize: 18 }">
      <template #header>
        <div class="w-full py-10 mb-2 text-2xl text-center bg-slate-400">
          自行添加搜索模块等等...
        </div>
      </template>
      <template #list-item="{ item, url, index }">
        <div
          class="overflow-hidden transition-all duration-300 ease-linear rounded-lg shadow-md template-box hover:shadow-lg hover:shadow-gray-500 group"
          @click="handleClick(item)">
          <LazyImg :url="item.avatar"
            class="transition-all duration-300 ease-linear cursor-pointer group-hover:scale-105" />
          <div class="px-4 pt-2 pb-4 border-t">
            <h4>用户名称: {{ item.userName }} -- {{ item.userId }}</h4>
            <div class="flex items-center justify-between pt-3 border-t border-opacity-50">
              <div class="w-[200px]">{{ `${item.desc}` }}</div>
              <div>
                <a-button type="primary" @click.stop="handleDelete(item, index)">
                  删除
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </waterfallVue>
  </div>
</template>

<script setup lang="ts">
import { LazyImg } from "vue-waterfall-plugin-next";
import waterfallVue from "@/components/waterfall/index.vue";
import { userList } from "@/apis/system/user";
import { message } from "ant-design-vue";

const handleClick = item => {
  console.log(item);
};
const handleDelete = (item, index) => {
  message.warn("演示模式不能删除");
};
</script>

<style scoped></style>
