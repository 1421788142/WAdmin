<template>
    <useModal :title="state.title" width="1000px" v-model:visible="state.visible" @btnOk="btnOk">
        <a-form :model="ruleForm" ref="formRef" name="formRef">
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item label="菜单类型" name="menuType" :rules="[{ required: true }]">
                        <a-radio-group v-model:value="ruleForm.menuType" button-style="solid">
                            <a-radio-button value="M">目录</a-radio-button>
                            <a-radio-button value="C">菜单</a-radio-button>
                            <a-radio-button value="F">按钮</a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="上级菜单" name="pId">
                        <a-tree-select 
                            v-model:value="ruleForm.pId" 
                            show-search 
                            style="width: 100%"
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                            :fieldNames="{children:'children', label:'title', value: 'id' }"
                            allow-clear 
                            treeDefaultExpandAll
                            :tree-data="treeData"
                            >
                        </a-tree-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="菜单名称" name="title" :rules="[{ required: true }]">
                        <a-input v-model:value="ruleForm.title" />
                    </a-form-item>
                </a-col>
                <a-col :span="12" v-if="ruleForm.menuType != 'F'">
                    <a-form-item label="图标">
                        <iconPicker v-model:icon="ruleForm.icon" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="显示排序" name="orderNum">
                        <a-input-number :step="1" :min="0" v-model:value="ruleForm.orderNum"></a-input-number>
                    </a-form-item>
                </a-col>
                <a-col :span="12" v-if="ruleForm.menuType === 'C'">
                    <a-form-item name="component" :rules="[{ required: true, message: '请输入组件路径' }]">
                        <template #label>
                            <a-tooltip placement="top" title="访问的组件路径，如：`system/user/index`，默认在`views`目录下">
                                <info-circle-outlined />
                            </a-tooltip>
                            <span class="mx-2">组件路径</span>
                        </template>
                        <a-input v-model:value="ruleForm.component" />
                    </a-form-item>
                </a-col>
                <a-col :span="12" v-if="ruleForm.menuType != 'F'">
                    <a-form-item name="path" :rules="[{ required: true, message: '请输入路由地址' }]">
                        <template #label>
                            <a-tooltip placement="top" title="访问的路由地址，如：`/user`，如外网地址需内链访问则以`http(s)://`开头">
                                <info-circle-outlined />
                            </a-tooltip>
                            <span class="mx-2">路由地址</span>
                        </template>
                        <a-input v-model:value="ruleForm.path" />
                    </a-form-item>
                </a-col>
                <a-col :span="12" v-if="ruleForm.menuType !== 'F'">
                    <a-form-item name="isFrame" :rules="[{ required: true, message: '请选择是否外链' }]">
                        <template #label>
                            <a-tooltip placement="top" title="选择是外链则路由地址需要以`http(s)://`开头">
                                <info-circle-outlined />
                            </a-tooltip>
                            <span class="mx-2">是否外链</span>
                        </template>
                        <a-radio-group v-model:value="ruleForm.isFrame" button-style="solid">
                            <a-radio-button :value="0">是</a-radio-button>
                            <a-radio-button :value="1">否</a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
                <a-col :span="12" v-if="ruleForm.menuType != 'F'">
                    <a-form-item name="hidden" :rules="[{ required: true, message: '请选择是否显示' }]">
                        <template #label>
                            <a-tooltip placement="top" title="选择否则路由将不会出现在菜单栏,但依然会加载菜单">
                                <info-circle-outlined />
                            </a-tooltip>
                            <span class="mx-2">是否显示</span>
                        </template>
                        <a-radio-group v-model:value="ruleForm.hidden" button-style="solid">
                            <a-radio-button :value="1">是</a-radio-button>
                            <a-radio-button :value="0">否</a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
                <a-col :span="12" v-if="ruleForm.menuType === 'C'">
                    <a-form-item label="是否缓存" name="keepAlive" :rules="[{ required: true }]">
                        <a-radio-group v-model:value="ruleForm.keepAlive" button-style="solid">
                            <a-radio-button :value="1">是</a-radio-button>
                            <a-radio-button :value="0">否</a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
                <a-col :span="12" v-if="ruleForm.menuType != 'F'">
                    <a-form-item name="status" :rules="[{ required: true, message: '请选择菜单状态' }]">
                        <template #label>
                            <a-tooltip placement="top" title="选择停用则路由将不会出现在菜单栏不会加载菜单">
                                <info-circle-outlined />
                            </a-tooltip>
                            <span class="mx-2">菜单状态</span>
                        </template>
                        <a-radio-group v-model:value="ruleForm.status" button-style="solid">
                            <a-radio-button :value="1">正常</a-radio-button>
                            <a-radio-button :value="2">停用</a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
                <a-col :span="12" v-if="ruleForm.menuType === 'F'">
                    <a-form-item label="权限字符串" name="perms" :rules="[{ required: true }]">
                        <a-input v-model:value="ruleForm.perms" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </useModal>
</template>

<script setup lang="ts">
import { formData } from '../index'
import { FormInstance, message } from 'ant-design-vue'
import { ref, reactive } from "vue";
import { getRouter } from "@/apis/user/index";
import { arrayToTree, deepCopy } from '@/utils/util'
const state = reactive<{title:string,visible:boolean}>({
    title:'新增',
    visible:false
})

const treeData = ref<menuListType[]>();
const getMenu = async () => {
    let { code, data } = await getRouter();
    if (code === 200) treeData.value = arrayToTree<menuListType>(data.dataList);
};
const formRef = ref<FormInstance>();
const ruleForm = ref<menuListType>();
const open = async (type:string,row?:menuListType) => {
    await getMenu();
    ruleForm.value = deepCopy(formData)
    if(type === 'add'){
        ruleForm.value = deepCopy(formData)
        row ? (ruleForm.value.pId = row.id) : ''
    } else {
        ruleForm.value = deepCopy(row)
    }
    formRef.value && formRef.value.clearValidate()
    formRef.value && formRef.value
    state.title = row && type !== 'add' ? `编辑${row.title}` : '新增'
    state.visible = true;
};


//确认提交
const btnOk = () => {
    formRef.value.validateFields().then(()=> {
        message.warn('演示模式，不允许操作')
    })
};
defineExpose({ open });
</script>

<style scoped>

</style>
