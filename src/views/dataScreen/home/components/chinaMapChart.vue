<template>
	<div ref="mapContainerRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAMap } from "@/hooks/useMap";
import { parkInterface } from "@/apis/dataScreen/home";
const mapContainerRef = ref<HTMLDivElement>()

const map = useAMap(mapContainerRef, {
	zoom: 12,
	center: [106.55, 29.57],
	mapStyle: 'amap://styles/blue',
})
const initData = (data: parkInterface[]) => {
	setTimeout(() => {
		data.forEach(x => {
			var marker = new AMap.Marker({
				position: new AMap.LngLat(x.Longitude, x.Latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
				title: x.parkName,
				content: `<div class="ping ${x.value > 100 ? 'max' : x.value > 50 ? 'auto' : 'min'}"></div>`,
				extData: x.parkId
			})
			map.value.add([marker])
		})
	}, 1000)
}
defineExpose({
	initData
});
</script>
<style>
.ping {
	border-radius: 50%;
	animation: ping 1.2s ease-in-out infinite both;
	position: relative;
}

.ping::after {
	left: -20%;
	top: -20%;
	position: absolute;
	content: '';
	width: 140%;
	height: 140%;
	border-radius: 50%;
	border: 1px solid #00eaff;
}

.ping::before {
	left: -10%;
	top: -10%;
	position: absolute;
	content: '';
	width: 120%;
	height: 120%;
	border-radius: 50%;
	border: 1px solid #00eaff;
}

.max {
	width: 70px;
	height: 70px;
	background-color: #00eaff;
}

.auto {
	background-color: #05e9fee5;
	width: 50px;
	height: 50px;
}

.min {
	background-color: #05e9feb8;
	width: 30px;
	height: 30px;
}

@keyframes ping {
	0% {
		-webkit-transform: scale(0.75);
		transform: scale(0.75);
		opacity: 0.75;
	}

	10% {
		-webkit-transform: scale(0.8);
		transform: scale(0.8);
		opacity: 0.8;
	}

	20% {
		-webkit-transform: scale(0.85);
		transform: scale(0.85);
		opacity: 0.85;
	}

	30% {
		-webkit-transform: scale(0.9);
		transform: scale(0.9);
		opacity: 0.9;
	}

	40% {
		-webkit-transform: scale(0.95);
		transform: scale(0.95);
		opacity: 0.95;
	}

	50% {
		-webkit-transform: scale(1);
		transform: scale(1);
		opacity: 1;
	}

	60% {
		-webkit-transform: scale(0.95);
		transform: scale(0.95);
		opacity: 0.95;
	}

	70% {
		-webkit-transform: scale(0.9);
		transform: scale(0.9);
		opacity: 0.9;
	}

	80% {
		-webkit-transform: scale(0.85);
		transform: scale(0.85);
		opacity: 0.85;
	}

	90% {
		-webkit-transform: scale(0.8);
		transform: scale(0.8);
		opacity: 0.8;
	}


	100% {
		-webkit-transform: scale(0.75);
		transform: scale(0.75);
		opacity: 0.75;
	}
}
</style>
  