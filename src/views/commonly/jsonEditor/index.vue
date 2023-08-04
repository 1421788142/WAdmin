<template>
  <div>
    <a-card title="JSON编辑器组件,采用开源的vue-json-pretty(支持大数据量)">
      <template #extra>
        <a
          href="https://github.com/leezng/vue-json-pretty/blob/e74d358bb6953dd0e4c581ca6b3550705008feb4/README.md"
        >
          github地址(配置介绍)
        </a>
      </template>
      <vue-json-pretty
        v-model:data="state.data"
        :deep="state.deep"
        :show-double-quotes="state.showDoubleQuotes"
        :show-line="state.showLine"
        :show-length="state.showLength"
        :show-icon="state.showIcon"
        :show-line-number="state.showLineNumber"
        :editable="state.editable"
        :editable-trigger="(state.editableTrigger as any)"
      />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

const defaultData = {
  code: 200,
  message: "请求成功",
  data: [
    {
      id: 1,
      title:
        "Bejjzs yxdvrxlmt piqfjdfek hhysiun dnicpsqxxe ivxhbh tnllnd mpwobwf kpsqgj ydjpy muudrbgwl.",
      name: "Kenneth",
    },
    {
      id: 1,
      title: "Efrwg jucyfgl uszy rhvwy zqldr dgvhiprc ajvodz bmwzec hvprljf.",
      name: "Richard",
    },
    {
      id: 3,
      title: "Ddvxiwhl fgc njrcmltk ecqp qkzcbx jtei hdou dqeqdgtib.",
      name: "Cynthia",
    },
    {
      id: 4,
      title: "Vrktw voerboc relmi ajichrl xvmdo cfv zllcd ponmvmmcky.",
      name: "Shirley",
    },
  ],
  total: 3,
  pageNum: 1,
  pageSize: 10,
};

const state = reactive({
  val: JSON.stringify(defaultData),
  data: defaultData,
  showLine: true,
  showLineNumber: true,
  showDoubleQuotes: true,
  showLength: true,
  editable: true,
  showIcon: true,
  editableTrigger: "click",
  deep: 3,
});
</script>

<style scoped></style>
