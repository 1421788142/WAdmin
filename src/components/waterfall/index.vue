<script setup lang="ts">
import { userList } from "@/apis/system/user";
import error from "@/assets/image/404.png";
import loading from "@/assets/image/403.png";
import "vue-waterfall-plugin-next/dist/style.css";
import InfiniteLoading from "v3-infinite-loading";
import { onMounted, reactive, ref, nextTick } from "vue";
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";

const options = reactive({
  // 唯一key值
  rowKey: "id",
  // 卡片之间的间隙
  gutter: 10,
  // 是否有周围的gutter
  hasAroundGutter: true,
  // 卡片在PC上的宽度
  width: 320,
  // 自定义行显示个数，主要用于对移动端的适配
  breakpoints: {
    1200: {
      // 当屏幕宽度小于等于1200
      rowPerView: 4,
    },
    800: {
      // 当屏幕宽度小于等于800
      rowPerView: 3,
    },
    500: {
      // 当屏幕宽度小于等于500
      rowPerView: 2,
    },
  },
  // 动画效果 https://animate.style/
  animationEffect: "animate__zoomInUp",
  // 动画时间
  animationDuration: 1000,
  // 动画延迟
  animationDelay: 300,
  // 背景色
  // backgroundColor: "#2C2E3A",
  // 图片字段选择器，如果层级较深，使用 xxx.xxx.xxx 方式
  imgSelector: "src.original",
  // 加载配置
  loadProps: {
    loading,
    error,
  },
  // 是否懒加载
  lazyload: true,
});

const page = ref(1);
const hasLoading = ref(false);
const list = ref([]);
const pageSize = ref(10);

/** 加载更多 */
function handleLoadMore() {
  hasLoading.value = true;
  userList({
    pageNum: page.value,
    pageSize: pageSize.value,
  }).then(res => {
    setTimeout(() => {
      list.value.push(...res.data.dataList);
      page.value += 1;
      nextTick(() => {
        hasLoading.value = false;
      });
    }, 500);
  });
}

function handleDelete(item, index) {
  list.value.splice(index, 1);
}

function handleClick(item) {
  console.log(item);
}

onMounted(() => {
  handleLoadMore();
});
</script>

<template>
  <div class="content" v-loading="hasLoading">
    <Waterfall :list="list" v-bind="options">
      <template #item="{ item, index }">
        <div
          class="overflow-hidden transition-all duration-300 ease-linear bg-gray-900 rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-600 group"
          @click="handleClick(item)"
        >
          <div class="overflow-hidden">
            <LazyImg
              :url="item.avatar"
              class="transition-all duration-300 ease-linear cursor-pointer group-hover:scale-105"
            />
          </div>
          <div class="px-4 pt-2 pb-4 border-t border-t-gray-800">
            <h4 class="pb-4 text-gray-50 group-hover:text-yellow-300">
              {{ item.userName }}
            </h4>
            <div
              class="flex items-center justify-between pt-3 border-t border-opacity-50 border-t-gray-600"
            >
              <div class="w-[200px] text-gray-50">
                <span>{{ `${item.desc}` }}</span>
              </div>
              <div>
                <a-button
                  type="primary"
                  @click.stop="handleDelete(item, index)"
                >
                  删除
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Waterfall>
    <!-- 加载更多 -->
    <InfiniteLoading :firstload="false" @infinite="handleLoadMore" />
  </div>
</template>
