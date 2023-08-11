<template>
  <div class="flex flex-col h-full" v-loading="loading">
    <slot name="header"></slot>
    <div class="flex-1 overflow-auto rounded-lg waterfall-box">
      <Waterfall :list="listData" v-bind="options">
        <template #item="{ item, url, index }">
          <slot name="list-item" :item="item" :url="url" :index="index"></slot>
        </template>
      </Waterfall>
      <!-- 加载更多 -->
      <InfiniteLoading :firstload="false" @infinite="handleLoadMore" />
      <!-- 回到顶部 -->
      <a-back-top :target="targetFn" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import "vue-waterfall-plugin-next/dist/style.css";
import InfiniteLoading from "v3-infinite-loading";
import { Waterfall } from "vue-waterfall-plugin-next";
import { useWaterfall, type optionsType } from "./index";
import { pick } from "@/utils/util";
import { deepMerge } from "@/utils/util";

const props = withDefaults(
  defineProps<{
    //初始化数据
    initParam?: any;
    // 是否分页
    pagination?: boolean;
    /** 请求表格数据的api ==> 必传 */
    requestApi: any;
    /** 请求前触发入参为searchParams,返回值为false时取消请求,否则将返回值searchParams合并 */
    beforeLoad?: any;
    /** 请求完成后渲染数据前触发,可处理数据 */
    afterLoad?: any;
    option?: optionsType;
  }>(),
  {
    initParam: {},
    pagination: true,
  },
);

const {
  listData,
  pageable,
  loading,
  defaultOptions,
  hasMore,
  reset,
  search,
  change,
} = useWaterfall({
  ...pick(props, [
    "initParam",
    "requestApi",
    "beforeLoad",
    "afterLoad",
    "pagination",
  ]),
});

const options = computed(() => deepMerge(defaultOptions, props.option));

// 回到顶部盒子
const targetFn = () => document.querySelector(".waterfall-box"); //回到顶部

/** 加载更多 */
const handleLoadMore = async () => {
  change(pageable.value.pageNum + 1, pageable.value.pageSize);
};
</script>
