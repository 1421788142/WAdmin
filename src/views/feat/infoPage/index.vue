<template>
  <a-card title="跳转详情页(这是主页面)" :bordered="false">
    <div class="flex">
      <span>query传参模式</span>
      <a-button type="primary" class="mx-5" v-for="i in 3" :key="i">
        <router-link :to="{ path: `/feat/infoPage/query-detail/${i}` }">
          跳转详情页 id:{{ i }}
        </router-link>
      </a-button>
    </div>
    <a-divider />
    <div class="flex">
      <span>params传参模式</span>

      <a-button type="primary" class="mx-5" v-for="i in 3" :key="i">
        <router-link
          :to="{ name: 'paramsDetail', params: { id: i, name: '大帅哥' } }"
        >
          跳转详情页 id:{{ i }}
        </router-link>
      </a-button>
    </div>
    <a-divider />
    <div class="flex">
      <a-button type="primary" class="mr-5">
        <router-link :to="{ name: 'tableuseTable' }">
          跳转useTable(传name对象,推荐)
        </router-link>
      </a-button>
      <a-button type="primary" class="mx-5">
        <router-link :to="{ path: '/table/useComponent' }">
          跳转useComponent(直接传跳转的path路径)
        </router-link>
      </a-button>
    </div>
    <div class="flex items-center mt-4">
      <a-button type="primary" class="mr-5">
        <router-link
          :to="{ name: 'menumenu2menu21', params: { id: 1, name: '大帅哥' } }"
        >
          跳转页内菜单(传name对象,推荐)
        </router-link>
      </a-button>
      <a-button type="primary" class="mx-5" @click="toMenu1">
        跳转页内菜单(path携带数据)
      </a-button>
      <a
        href="http://121.4.119.52:81/#/"
        target="_blank"
        class="mr-10 hover:underline"
      >
        官网demo
      </a>
      <a
        href="http://121.4.119.52:82/#/"
        target="_blank"
        class="hover:underline"
      >
        WAdmin文档
      </a>
    </div>
    <a-button type="primary" class="mt-5">
      <router-link :to="{ name: 'empty' }">跳转无Layout空白页面</router-link>
    </a-button>
  </a-card>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const route = useRouter();
const toMenu1 = () => {
  route.push({
    path: "/menu/menu1",
    query: { text: "123", msg: "俺是大帅哥" },
  });
};
</script>

<style scoped></style>
