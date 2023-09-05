<template>
	<svg :style="iconStyle" aria-hidden="true">
		<use :xlink:href="symbolId" />
	</svg>
</template>
 
<script lang="ts" setup>
import { computed } from "vue";

interface SvgProps {
	name: string; // 图标的名称 ==> 必传
	prefix?: string; // 图标的前缀 ==> 非必传（默认为"icon"）
	iconStyle?: { [key: string]: any }; // 图标的样式 ==> 非必传
}
// 接收父组件参数并设置默认值
const props = withDefaults(defineProps<SvgProps>(), {
	prefix: "icon",
	iconStyle: () => ({ width: 100, height: 100 })
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>