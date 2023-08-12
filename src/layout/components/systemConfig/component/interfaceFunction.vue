<template>
  <a-divider orientation="center">🚀 {{ $t("layouts.projectFun") }}</a-divider>
  <div>
    <div class="flex items-center justify-between my-4">
      <span>{{ $t("layouts.historyDialog") }}</span>
      <a-input-number
        @change="
          () => {
            change(modalMinNum, 'modalMinNum');
          }
        "
        v-model:value="modalMinNum"
        :min="0"
        :max="10"
      />
    </div>
    <div class="flex items-center justify-between my-4">
      <span>{{ $t("layouts.autoLockScreenTime") }}</span>
      <a-input-number
        class="!w-[150px] h-[50px]"
        v-model:value="lockNum"
        :min="0"
        :max="10000"
        :formatter="
          value =>
            `${value}${
              value === '0' ? `(${$t('layouts.noLock')})` : $t('commons.minute')
            }`
        "
        :parser="value => value.replace($t('commons.minute'), '')"
        @change="lockNumChange"
      />
    </div>
    <div class="flex items-center justify-between my-4">
      <span>{{ $t("layouts.historyMenu") }}</span>
      <a-switch
        v-model:checked="isHasHistory"
        @change="setConfigState('isHasHistory', isHasHistory)"
        :checked-children="$t('layouts.karat')"
        :un-checked-children="$t('layouts.shut')"
      />
    </div>
    <div class="flex items-center justify-between">
      <span>Logo</span>
      <a-switch
        v-model:checked="isHasLogo"
        @change="setConfigState('isHasLogo', isHasLogo)"
        :checked-children="$t('layouts.karat')"
        :un-checked-children="$t('layouts.shut')"
      />
    </div>
    <div class="flex items-center justify-between my-4">
      <span>{{ $t("layouts.collapseMenu") }}</span>
      <a-switch
        v-model:checked="isHasCollapsed"
        :disabled="['mix', 'horizontal'].includes(getConfigState('menuType'))"
        @change="setConfigState('isHasCollapsed', isHasCollapsed)"
        :checked-children="$t('layouts.karat')"
        :un-checked-children="$t('layouts.shut')"
      />
    </div>
    <div class="flex items-center justify-between">
      <span>{{ $t("layouts.grayMode") }}</span>
      <a-switch
        v-model:checked="isHasGrey"
        @change="setupGrey(isHasGrey)"
        :checked-children="$t('layouts.karat')"
        :un-checked-children="$t('layouts.shut')"
      />
    </div>
    <div class="flex items-center justify-between my-4">
      <span>{{ $t("layouts.colorWeaknessMode") }}</span>
      <a-switch
        v-model:checked="isHasColorblind"
        @change="setupColorblind(isHasColorblind)"
        :checked-children="$t('layouts.karat')"
        :un-checked-children="$t('layouts.shut')"
      />
    </div>
    <div>
      <a-button
        class="!flex items-center justify-center w-full my-4"
        @click="reset()"
      >
        <reload-outlined />
        {{ $t("buttons.reset") }}
      </a-button>
      <a-button
        class="!flex items-center justify-center w-full"
        @click="reload()"
      >
        <reload-outlined />
        {{ $t("layouts.clearAndlogOut") }}
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message, ConfigProvider } from "ant-design-vue";
import { inject, ref, watch } from "vue";
import { layoutInterface } from "@/hooks/interface/layout";
import emitter from "@/plugins/mitt";
import { $$t } from "@/plugins/language/setupI18n";
import userStore from "@/store/user";
const { loginOut } = userStore();

const {
  getConfigState,
  setConfigState,
  resetConfig,
  setupGrey,
  setupColorblind,
} = inject<layoutInterface>("sysConfig");

const isHasHistory = ref<boolean>();
const isHasLogo = ref<boolean>();
const isHasCollapsed = ref<boolean>();
const isHasGrey = ref<boolean>();
const isHasColorblind = ref<boolean>();
const modalMinNum = ref<number>(0);
const lockNum = ref<number>(0);

watch(
  () => getConfigState("isHasCollapsed"),
  newVal => {
    isHasCollapsed.value = newVal;
  },
);

const setDefaultVal = () => {
  isHasHistory.value = getConfigState("isHasHistory");
  isHasLogo.value = getConfigState("isHasLogo");
  isHasCollapsed.value = getConfigState("isHasCollapsed");
  isHasGrey.value = getConfigState("isHasGrey");
  isHasColorblind.value = getConfigState("isHasColorblind");
  modalMinNum.value = getConfigState("modalMinNum");
  lockNum.value = getConfigState("lockNum");
};

const lockNumChange = (value: number) => {
  if (!value) {
    change(0, "lockNum");
    change(0, "lockExpireNum");
    return;
  }
  change(value, "lockNum");
  emitter.emit("setExpire");
};

setDefaultVal();

const change = (value: boolean | number, type: string) => {
  setConfigState(type, value);
};

const reset = (show = true) => {
  setTimeout(async () => {
    await resetConfig();
    setDefaultVal();
    show && message.success($$t("layouts.resetOk"));
    ConfigProvider.config({
      theme: getConfigState("themeColor"),
    });
  }, 500);
};

const reload = async () => {
  await reset(false);
  await loginOut();
};
</script>

<style scoped></style>
