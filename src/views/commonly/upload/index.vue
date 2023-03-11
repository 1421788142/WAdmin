<template>
    <a-card title="上传组件" :bordered="false">
        <div> 
            <span>上传图片<strong>(total限制上传张数)</strong></span>
            <w-upload uploadType="image" v-model:value="imgList" />
            <div class="my-5">
                <div class="p-2 bg-slate-300">上传图片v-model:value</div>
                <div v-for="item in imgList" :key="item.uid">
                    {{item}}
                </div>
            </div>
        </div>
        <div>
            <span>上传视频<strong>(total限制上传条数,点击预览可查看视频)</strong></span>
            <w-upload uploadType="video" actionUrl="/upload/video" v-model:value="videoList" />
            <div class="my-5">
                <div class="p-2 bg-slate-300">上传视频v-model:value</div>
                <div v-for="item in videoList" :key="item.uid">
                    {{item}}
                </div>
            </div>
        </div>
    </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const imgList = ref<any[]>([])
const videoList = ref<any[]>([])
</script>

<style scoped>

</style>