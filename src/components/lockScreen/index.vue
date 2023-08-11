<template>
  <div class="w-lock-screen" v-if="getConfigState('isHasLock')">
    <div class="cursor-pointer w-lock-screen-top" @click="open">
      <lock-outlined class="icon" />
      <div class="title">{{ $t("layouts.unlockScreen") }}</div>
    </div>
    <div
      class="!select-none flex flex-row justify-around grid-flow-row gap-2 my-40 text-white items-center"
    >
      <digitalFlip />
    </div>
    <transition name="fade-slide">
      <div
        class="w-screen h-screen bg-[#060606bd] fixed left-0 top-0 z-10 backdrop-blur flex justify-center items-center"
        v-show="showData"
      >
        <div
          class="flex flex-col items-center justify-center mb-4 w-[300px] mx-auto fixed"
          v-show="showData"
        >
          <a-avatar :src="getAssets(VITE_PROJECT_LOGO)" :size="100" />
          <div class="my-4 text-4xl text-white">{{ VITE_PROJECT_NAME }}</div>
          <a-input-password
            v-model:value="lockPassword"
            :placeholder="
              $t('commons.pleaseEnter', {
                text: $t('layouts.lockScreenPassword'),
              })
            "
          />
          <div class="my-2 text-red-700 text-lt">{{ errMsg }}</div>
          <div class="flex justify-between w-full text-white">
            <span class="cursor-pointer" @click="showData = false">
              {{ $t("buttons.back") }}
            </span>
            <span
              class="cursor-pointer"
              @click="loginOut().then(() => reset())"
            >
              {{ $t("buttons.reLogin") }}
            </span>
            <span class="cursor-pointer" @click="toSys">
              {{ $t("buttons.enterSystem") }}
            </span>
          </div>
        </div>
      </div>
    </transition>
    <div class="mt-10 text-4xl text-center text-white">
      {{ `${year} / ${month} ${week}` }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import digitalFlip from "../digitalFlip/index.vue";
import { useTime } from "@/hooks/useTime";
import { layoutInterface } from "@/hooks/interface/layout";
import emitter from "@/plugins/mitt";
import { getAssets } from "@/utils/util";
import userStore from "@/store/user";
import { Modal } from "ant-design-vue";
import { $$t } from "@/plugins/language/setupI18n";
const { loginOut } = userStore();

const { VITE_PROJECT_NAME, VITE_PROJECT_LOGO } = import.meta.env;

const { month, year, week } = useTime();

const { getConfigState, setConfigState } = inject<layoutInterface>("sysConfig");

const showData = ref<boolean>(false);
const lockPassword = ref<string>(""); //锁屏密码
const errMsg = ref<string>(""); //锁屏提示

const open = () => (showData.value = true);

const stop = () => {
  clearInterval(timer);
};

let timer: NodeJS.Timer = null;
const setAutoLock = () => {
  (timer || showData.value) && stop();
  timer = setInterval(() => {
    timerFn();
  }, getConfigState("lockNum") * 60000);
};

const timerFn = () => {
  if (!getConfigState("lockNum")) return stop();
  if (getConfigState("lockExpireNum") < new Date().getTime()) {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: $$t("layouts.lockScreenTime"),
      content: `${$$t("layouts.autoLockScreen", { secondsToGo })}`,
      okText: `${$$t("layouts.cancelLockScreen", {
        lockNum: getConfigState("lockNum"),
      })}`,
      onOk: () => {
        setExpire();
        clearInterval(interval);
      },
    });
    const interval = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `${$$t("layouts.autoLockScreen", { secondsToGo })}`,
      });
      if (secondsToGo === 0) {
        clearInterval(interval);
        modal.destroy();
        setConfigState("isHasLock", true);
        stop();
      }
    }, 1000);
  }
};

const setExpire = async () => {
  let expire = new Date().getTime() + getConfigState("lockNum") * 60000;
  setConfigState("lockExpireNum", expire);
  setAutoLock();
  timerFn();
};

setExpire();

emitter.on("setExpire", () => {
  setExpire();
});

const reset = () => {
  setConfigState("isHasLock", false);
  errMsg.value = "";
  lockPassword.value = "";
  showData.value = false;
};

const toSys = () => {
  if (lockPassword.value !== getConfigState("lockPassword"))
    return (errMsg.value = $$t("messages.wrongPassword"));
  reset();
  setExpire();
};
</script>

<style scoped></style>
