<template>
    <a-card title="自定义指令" :bordered="false">
		<div class="p-2 border border-teal-300">
			<div class="my-5 text">复制指令</div>
			<a-input-group>
				<a-input class="!w-[200px]" v-model:value="data"/>
				<a-button type="primary" v-copy="data">复制</a-button>
			</a-input-group>
			<div class="my-5 text">可以将复制文本粘贴到下面文本域</div>
			<a-textarea :rows="4"></a-textarea>
		</div>
		<div class="p-2 my-4 border border-teal-300">
			<span class="m-5 text">防抖指令</span>
			<a-button type="primary" v-debounce="debounce">防抖按钮(.5s后触发)</a-button>
			<span class="m-5 text">节流指令</span>
			<a-button type="primary" v-throttle="throttle">节流按钮(每隔1s执行)</a-button>
			<span class="m-5 text">长按指令</span>
			<a-button type="primary" v-longpress="longpress">长按事件(每隔2s执行)</a-button>
		</div>
    </a-card>
</template>

<script setup lang="ts" name="copyDirect">
import { ref } from "vue";
import { message } from 'ant-design-vue';
const data = ref<string>("请输入你需要复制的内容");
const debounce = ()=>{
    message.success('我是防抖事件')
}
const throttle = ()=>{
    message.success('我是防抖事件')
}
const longpress = ()=>{
    message.success('我是长按事件')
}
</script>

<style scoped lang="scss">
</style>
