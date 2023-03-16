<template>
  <div class="flip-clock">
    <flipper ref="hour1" />
    <flipper ref="hour2" />
    <em>:</em>
    <flipper ref="minute1" />
    <flipper ref="minute2" />
    <em>:</em>
    <flipper ref="second1" />
    <flipper ref="second2" />
  </div>
</template>
 
<script lang="ts" setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import flipper from './flipper.vue'
let timer: NodeJS.Timer = null
const hour1 = ref<any>()
const hour2 = ref<any>()
const minute1 = ref<any>()
const minute2 = ref<any>()
const second1 = ref<any>()
const second2 = ref<any>()

const timeNums = [
  hour1,
  hour2,
  minute1,
  minute2,
  second1,
  second2
]

onMounted(async () => {
  await nextTick()
  init()
  run()
})

onUnmounted(()=>{
  clearInterval(timer)
})

const init = () => {
  let now = new Date()
  let nowTimeStr = formatDate(new Date(now.getTime()), 'hhiiss')
  timeNums.forEach((x, i) => {
    x.value.setFront(nowTimeStr[i])
  })
}

const run = () => {
  timer = setInterval(() => {
    let now = new Date()
    let nowTime = formatDate(new Date(now.getTime() - 1000), 'hhiiss')
    let nextTime = formatDate(now, 'hhiiss')
    for (let i = 0; i < timeNums.length; i++) {
      if (nowTime[i] === nextTime[i]) continue
      timeNums[i].value.flipDown(nowTime[i], nextTime[i])
    }
  }, 1000)
}

const formatDate = (date: Date, dateFormat: string) => {
  if (/(y+)/.test(dateFormat)) {
    dateFormat = dateFormat.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  let times = {
    'm+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'i+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in times) {
    if (new RegExp(`(${k})`).test(dateFormat)) {
      let str = times[k] + ''
      dateFormat = dateFormat.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
      )
    }
  }
  return dateFormat
}

</script>
 
<style>
.flip-clock {
  text-align: center;
}

.flip-clock .w-flipper {
  margin: 0 10px;
}

.flip-clock em {
  color:#a4a2a2;
  display: inline-block;
  line-height: 210px;
  font-size: 160px;
  font-style: normal;
  vertical-align: top;
}
</style>