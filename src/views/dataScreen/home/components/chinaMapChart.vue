<template>
	<div ref="mapContainerRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAMap } from "@/hooks/useMap";
import { parkInterface } from "@/apis/dataScreen/home";
const mapContainerRef = ref<HTMLDivElement>()

// 示例
const map = useAMap(mapContainerRef, {
	zoom: 12,//放大倍数
	center: [120.279, 31.60],//初始点
	mapStyle: 'amap://styles/blue',//地图主题
})

// 创建原点
const createMarker = async (info: parkInterface) => {
	let className = info.value > 100 ? 'max' : info.value > 50 ? 'auto' : 'min' //点class名称
	let marker = new AMap.Marker({
		position: new AMap.LngLat(info.Longitude, info.Latitude), // 经纬度对象，
		title: info.parkName,
		content: `<div class="ping ${className}"></div>`,
		extData: info.parkId,
		clickable: true
	})
	return marker
}

// 设置点击弹出框
const setInfoContent = (marker: AMap.Marker, info: parkInterface) => {
	let x = info.value > 100 ? 35 : info.value > 50 ? 25 : 15 //x偏移量
	let y = 0 //y偏移量
	let infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(x, y) })
	infoWindow.setContent(
		`<div class="map-box">
			<div>站点名称： ${info.parkName}</div>
			<div>站点地址： ${info.address}</div>
			<div>总枪数： ${info.value}（个）</div>
			<div>快充： ${parseInt(String(info.value / 2))}（个）</div>
			<div>慢充： ${info.value - parseInt(String(info.value / 2))}（个）</div>
			<div>充电中： ${parseInt(String(info.value / 5))}（个）</div>
			<div>空余充电枪： ${info.value - parseInt(String(info.value / 5))}（个）</div>
		</div>`
	)
	marker.on('click', (e) => {
		infoWindow.open(map.value, e.target.getPosition())
	})
	map.value.on('click', () => infoWindow.close()) //点击地图任何地点都关闭弹出框
}

const initData = (data: parkInterface[]) => {
	setTimeout(() => {
		data.forEach(async (info) => {
			let marker = await createMarker(info)
			setInfoContent(marker, info)
			map.value.add([marker])
		})
	}, 1000)
}
defineExpose({
	initData
});
</script>
<style lang="scss">
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
	border: 2px solid #00eaff;
	animation: border 1.2s ease-in-out infinite both;
}

.ping::before {
	left: -10%;
	top: -10%;
	position: absolute;
	content: '';
	width: 120%;
	height: 120%;
	border-radius: 50%;
	border: 2px solid #00eaff;
	animation: border 1.2s ease-in-out infinite both;
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

@keyframes border {
	0% {
		-webkit-transform: scale(0.8);
		transform: scale(0.8);
		opacity: 0.2;
	}

	10% {
		-webkit-transform: scale(0.85);
		transform: scale(0.85);
		opacity: 0.4;
	}

	20% {
		-webkit-transform: scale(0.9);
		transform: scale(1);
		opacity: 0.6;
	}

	30% {
		-webkit-transform: scale(0.95);
		transform: scale(0.95);
		opacity: 0.8;
	}

	40% {
		-webkit-transform: scale(1);
		transform: scale(1);
		opacity: 1;
	}

	50% {
		-webkit-transform: scale(1.05);
		transform: scale(1.05);
		opacity: 0.8;
	}

	60% {
		-webkit-transform: scale(1);
		transform: scale(1);
		opacity: 0.6;
	}

	70% {
		-webkit-transform: scale(0.95);
		transform: scale(0.95);
		opacity: 0.5;
	}

	80% {
		-webkit-transform: scale(0.9);
		transform: scale(0.9);
		opacity: 0.4;
	}

	90% {
		-webkit-transform: scale(0.85);
		transform: scale(0.85);
		opacity: 0.3;
	}

	100% {
		-webkit-transform: scale(0.8);
		transform: scale(0.8);
		opacity: 0.2;
	}
}

.map-box {
	div {
		margin-top: 5px;
		font-size: 18px;
	}
}

.amap-info-content {
	width: max-content;
	padding: 15px 30px !important;
	background: url("../../images/line-bg.png") no-repeat;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	color: #00eaff;
}

.bottom-center .amap-info-sharp {
	border-top: 8px solid #00eaff;
}
</style>
  