<template>
  <div class="flex w-full">
    <w-tree-filter
      :dataList="deptTree"
      :placeholder="$t('commons.pleaseEnter', { text: $t('commons.key') })"
      v-model:value="initParam.deptId"
      @change="table.refresh()"
    />
    <w-table
      ref="table"
      :requestApi="userList"
      :initParam="initParam"
      :columns="tableColumns"
    >
      <template #tableHeader>
        <w-button btnType="primary" @click="update()" />
      </template>
      <template #url="{ row }">
        <a :href="row.text">{{ row.text }}</a>
      </template>
      <template #operation="{ row }">
        <div class="w-table-btn">
          <w-button @click="update('edit', row.record)" type="update" />
          <w-button
            @click="update('delete', row.record)"
            color="red"
            type="delete"
          />
        </div>
      </template>
    </w-table>
    <!-- 新增编辑框 -->
    <w-modal
      :destroyOnClose="false"
      :loading="loading"
      :title="title"
      width="1000px"
      v-model:visible="visible"
      @btnOk="btnOk"
    >
      <w-form v-model:value="formParam" :columns="formColumns" ref="form">
        <template #avatarFormItem>
          <uploadImgVue
            ref="uploadImgRef"
            :total="1"
            accept="image/*"
            :fileList="fileList"
            @change="
              state =>
                (formParam.avatar = state.fileListData
                  .map(x => x.url)
                  .join(','))
            "
          />
        </template>
      </w-form>
    </w-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { usePageData } from "./index";
import { userInterface } from "@/apis/system/user";
import { message, Modal } from "ant-design-vue";
import formVue from "@/components/global/form/index.vue";
import tableVue from "@/components/global/table/index.vue";
import uploadImgVue from "@/components/upload/uploadImg.vue";

const {
  tableColumns,
  formColumns,
  formParam,
  visible,
  title,
  initParam,
  fileList,
  deptTree,
  loading,
  open,
  userList,
  delUser,
  updateUser,
} = usePageData();
const [form, table] = [
  ref<RefComponent<typeof formVue>>(),
  ref<RefComponent<typeof tableVue>>(),
];
const refresh = () => table.value.refresh();
const update = async (type: string = "add", row?: userInterface) => {
  if (type === "delete") {
    Modal.confirm({
      title: "是否确认删除",
      onOk: async () => {
        let { code, data } = await delUser({ id: row.id });
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
  let { code, data } = await updateUser(formParam.value);
  if (code === 200) {
    message.warn(data.message);
    visible.value = false;
    refresh();
    loading.value = false;
  }
};
</script>

<style scoped></style>
