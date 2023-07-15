<template>
  <div class="w-flipper" :class="[state.flipType, { go: state.flipping }]">
    <div class="digital front" :class="textClass(state.frontText)"></div>
    <div class="digital back" :class="textClass(state.backText)"></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
interface stateInterface {
  flipType: string;
  flipping: boolean;
  frontText: string;
  backText: string;
  duration: number;
}

const state = reactive<stateInterface>({
  flipType: "down",
  flipping: false,
  frontText: "0",
  backText: "1",
  duration: 600,
});

const textClass = (number: string): string => "number" + number;
const flip = (type: string, front: string, back: string) => {
  if (state.flipping) return; // 如果处于翻转中，则不执行
  state.frontText = front;
  state.backText = back;
  state.flipType = type; // 根据传递过来的type设置翻转方向
  state.flipping = true; // 设置翻转状态为true
  setTimeout(() => {
    state.flipping = false; // 设置翻转状态为false
    state.frontText = back;
  }, state.duration);
};
// 下翻牌
const flipDown = (front: string, back: string) => {
  flip("down", front, back);
};
// 设置前牌文字
const setFront = (text: string) => (state.frontText = text);

defineExpose({ flipDown, setFront });
</script>

<style>
.w-flipper {
  display: inline-block;
  position: relative;
  width: 200px;
  height: 250px;
  line-height: 250px;
  border-radius: 20px;
  font-size: 160px;
  color: #a4a2a2;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: "HYLeMiaoTiW";
}

.w-flipper .digital:before,
.w-flipper .digital:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
  box-sizing: border-box;
  text-shadow: 0 10px 20px #000;
  background-color: #333;
}

.w-flipper .digital:before {
  top: 0;
  bottom: 50%;
  border-radius: 20px 20px 0 0;
  border-bottom: solid 1px #666;
}

.w-flipper .digital:after {
  top: 50%;
  bottom: 0;
  border-radius: 0 0 20px 20px;
  line-height: 0;
}

/*向下翻*/
.w-flipper.down .front:before {
  z-index: 3;
}

.w-flipper.down .back:after {
  z-index: 2;
  transform-origin: 50% 0%;
  transform: perspective(360px) rotateX(180deg);
}

.w-flipper.down .front:after,
.w-flipper.down .back:before {
  z-index: 1;
}

.w-flipper.down.go .front:before {
  transform-origin: 50% 100%;
  animation: frontFlipDown 0.6s ease-in-out both;
  box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
  backface-visibility: hidden;
}

.w-flipper.down.go .back:after {
  animation: backFlipDown 0.6s ease-in-out both;
}

/*向上翻*/
.w-flipper.up .front:after {
  z-index: 3;
}

.w-flipper.up .back:before {
  z-index: 2;
  transform-origin: 50% 100%;
  transform: perspective(360px) rotateX(-180deg);
}

.w-flipper.up .front:before,
.w-flipper.up .back:after {
  z-index: 1;
}

.w-flipper.up.go .front:after {
  transform-origin: 50% 0;
  animation: frontFlipUp 0.6s ease-in-out both;
  box-shadow: 0 2px 6px rgba(255, 255, 255, 0.3);
  backface-visibility: hidden;
}

.w-flipper.up.go .back:before {
  animation: backFlipUp 0.6s ease-in-out both;
}

@keyframes frontFlipDown {
  0% {
    transform: perspective(360px) rotateX(0deg);
  }
  100% {
    transform: perspective(360px) rotateX(-180deg);
  }
}

@keyframes backFlipDown {
  0% {
    transform: perspective(360px) rotateX(180deg);
  }
  100% {
    transform: perspective(360px) rotateX(0deg);
  }
}

@keyframes frontFlipUp {
  0% {
    transform: perspective(360px) rotateX(0deg);
  }
  100% {
    transform: perspective(360px) rotateX(180deg);
  }
}

@keyframes backFlipUp {
  0% {
    transform: perspective(360px) rotateX(-180deg);
  }
  100% {
    transform: perspective(360px) rotateX(0deg);
  }
}

.w-flipper .number0:before,
.w-flipper .number0:after {
  content: "0";
}

.w-flipper .number1:before,
.w-flipper .number1:after {
  content: "1";
}

.w-flipper .number2:before,
.w-flipper .number2:after {
  content: "2";
}

.w-flipper .number3:before,
.w-flipper .number3:after {
  content: "3";
}

.w-flipper .number4:before,
.w-flipper .number4:after {
  content: "4";
}

.w-flipper .number5:before,
.w-flipper .number5:after {
  content: "5";
}

.w-flipper .number6:before,
.w-flipper .number6:after {
  content: "6";
}

.w-flipper .number7:before,
.w-flipper .number7:after {
  content: "7";
}

.w-flipper .number8:before,
.w-flipper .number8:after {
  content: "8";
}

.w-flipper .number9:before,
.w-flipper .number9:after {
  content: "9";
}
</style>
