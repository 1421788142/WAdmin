<template>
    <div>
        <a-card title="关于">
            <p class="text-md !mb-0">
                <a target="_blank" href="https://github.com/1421788142/WAdmin">WAdmin</a>
                一款基于 Vue3.2、vue-Router4 、Pinia、TypeScript、Vite2、Ant-Design3 开源的后台管理框架。
            </p>
        </a-card>
        <a-card title="项目信息" class="!my-2">
            <a-descriptions bordered :column="2">
                <a-descriptions-item label="版本号">
                    <a-tag color="blue">{{ version }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="发布时间">
                    <a-tag color="blue">{{ lastBuildTime }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="Gitee">
                    暂无仓库,待添加
                </a-descriptions-item>
                <a-descriptions-item label="Github">
                    <a target="_blank" href="https://github.com/1421788142/WAdmin">https://github.com/1421788142/WAdmin</a>
                </a-descriptions-item>
                <a-descriptions-item label="Issues">
                    <a target="_blank" href="https://github.com/1421788142/WAdmin/issues">Issues</a>
                </a-descriptions-item>
                <a-descriptions-item label="预览地址">
                    <a target="_blank" href="http://121.4.119.52/#/login">http://121.4.119.52/#/login</a>
                </a-descriptions-item>
            </a-descriptions>
        </a-card>
        <a-card title="生产环境依赖" class="!my-2">
            <a-descriptions bordered :column="4">
                <a-descriptions-item :label="key" v-for="(val, key) in dependencies" :key="key">
                    <a-tag color="blue">{{ val }}</a-tag>
                </a-descriptions-item>
            </a-descriptions>
        </a-card>
        <a-card title="开发环境依赖" class="!my-2">
            <a-descriptions bordered :column="4">
                <a-descriptions-item :label="key" v-for="(val, key) in devDependencies" :key="key">
                    <a-tag color="blue">{{ val }}</a-tag>
                </a-descriptions-item>
            </a-descriptions>
        </a-card>
    </div>
</template>

<script setup lang="ts">
const { pkg, lastBuildTime } = __APP_INFO__;
const { dependencies, devDependencies, version } = pkg;
</script>

<style scoped></style>