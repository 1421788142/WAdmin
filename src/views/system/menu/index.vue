<template>
  <div>
    <w-table
      ref="table"
      :selection="false"
      :afterLoad="afterLoad"
      :pagination="false"
      :requestApi="menuList"
      :columns="tableColumns"
    >
      <template #tableHeader>
        <w-button btnType="primary" @click="update()" />
      </template>
      <template #icon="{ row }">
        <component v-if="row.record.icon" :is="row.record.icon"></component>
      </template>
      <template #operation="{ row }">
        <div class="w-table-btn">
          <w-button
            v-if="row.record.menuType != 'F'"
            @click="update('add', row.record)"
          />
          <w-button @click="update('update', row.record)" type="update" />
          <w-button
            @click="update('delete', row.record)"
            color="red"
            type="delete"
          />
        </div>
      </template>
    </w-table>
    <!-- 新增编辑 -->
    <w-modal
      :destroyOnClose="false"
      :loading="loading"
      :title="title"
      width="1000px"
      v-model:visible="visible"
      @btnOk="btnOk"
    >
      <w-form
        ref="form"
        :labelCol="{ span: 6 }"
        :columns="formColumns"
        v-model:value="formParam"
      />
    </w-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { usePageData } from "./index";
import { arrayToTree } from "@/utils/util";
import { Table } from "@/components/global/table/interface";
import { message, Modal } from "ant-design-vue";
import formVue from "@/components/global/form/index.vue";
import tableVue from "@/components/global/table/index.vue";

const afterLoad = (value: any, state: Table.stateProps) => {
  state.expandedKeys = Array.from(
    new Set(value.dataList.map(x => x.menuType !== "C" && x.id)),
  );
  return arrayToTree<menuListType>(value.dataList).sort((a, b) => {
    return a.orderNum - b.orderNum;
  });
};

const [form, table] = [
  ref<RefComponent<typeof formVue>>(),
  ref<RefComponent<typeof tableVue>>(),
];
const refresh = () => table.value.refresh();
const {
  title,
  visible,
  loading,
  formColumns,
  tableColumns,
  formParam,
  menuList,
  open,
  updateMenu,
  delMenu,
} = usePageData();

const update = async (type: string = "add", row?: menuListType) => {
  if (type === "delete") {
    Modal.confirm({
      title: "是否确认删除",
      onOk: async () => {
        let { code, data } = await delMenu({ id: row.id });
        if (code === 200) {
          refresh();
          message.warn(data.message);
        }
      },
    });
  } else {
    await open(type, row);
    form.value?.reset();
  }
};

const btnOk = async () => {
  let res = await form.value.submitForm();
  if (res) submitApi();
};

const submitApi = async () => {
  loading.value = true;
  let { code, data } = await updateMenu(formParam.value);
  if (code === 200) {
    message.warn(data.message);
    visible.value = false;
    refresh();
    loading.value = false;
  }
};
</script>

<style scoped></style>
