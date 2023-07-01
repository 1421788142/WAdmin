<template>
  <a-popover :trigger="['click']" placement="bottom">
    <div
      id="sys-message"
      class="flex items-center mx-4 cursor-pointer ant-dropdown-link"
    >
      <a-badge count="10">
        <bell-outlined :style="{ fontSize: '20px' }" />
      </a-badge>
    </div>
    <template #content>
      <div class="w-[250px]">
        <a-tabs v-model:activeKey="activeKey" centered>
          <a-tab-pane key="1" :tab="`通知(${NoticeList.length})`">
            <div
              class="rounded-md border-zinc-400 px-2 max-h-[400px] overflow-y-auto"
            >
              <div v-for="(item, index) in NoticeList" :key="index">
                <div class="flex">
                  <a-image
                    :preview="false"
                    :width="40"
                    :src="ImgList[item.type]"
                  ></a-image>
                  <div class="ml-2">
                    <div class="mb-2 text-base truncate w-[180px]">
                      {{ item.title }}
                    </div>
                    <span class="text-md">{{ item.createTime }}</span>
                  </div>
                </div>
                <a-divider class="!my-1" />
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </template>
  </a-popover>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const activeKey = ref<string>("1");
const ImgList = [
  "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
  "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
];
const NoticeList = reactive<any[]>([
  { type: 0, title: "一个开箱即用的后台管理模板", createTime: "2022-7-16" },
  { type: 0, title: "一个开箱即用的后台管理模板", createTime: "2022-7-16" },
  { type: 1, title: "一个开箱即用的后台管理模板", createTime: "2022-7-16" },
  { type: 0, title: "一个开箱即用的后台管理模板", createTime: "2022-7-16" },
  { type: 1, title: "一个开箱即用的后台管理模板", createTime: "2022-7-16" },
  { type: 0, title: "一个开箱即用的后台管理模板", createTime: "2022-7-16" },
  { type: 0, title: "一个开箱即用的后台管理模板", createTime: "2022-7-16" },
  { type: 1, title: "一个开箱即用的后台管理模板", createTime: "2022-7-16" },
  { type: 0, title: "一个开箱即用的后台管理模板", createTime: "2022-7-16" },
  { type: 1, title: "一个开箱即用的后台管理模板", createTime: "2022-7-16" },
]);
</script>

<style scoped></style>
