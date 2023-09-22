<template>
  <div>
    <a-form :rules="loginRules" class="mt-5" name="ruleFormRef" :model="form" @finish="submit">
      <a-form-item name="userName" :rules="[
        {
          required: true,
          message: $t('commons.pleaseEnter', { text: $t('login.account') }),
        },
      ]">
        <a-input size="large" :placeholder="$t('login.account')" v-model:value="form.userName" />
      </a-form-item>
      <a-form-item name="password" class="mt-5">
        <a-input-password size="large" :placeholder="$t('login.password')" v-model:value="form.password" />
      </a-form-item>
      <a-form-item name="code" class="mt-5">
        <div class="grid grid-flow-row-dense grid-cols-3 gap-2">
          <a-input class="col-span-2" size="large" :placeholder="$t('login.verifyCode')" v-model:value="form.code" />
          <a-spin :spinning="codeLoading">
            <div class="relative cursor-pointer">
              <div @click="setupCodeImg"
                class="w-[100%] h-[100%] opacity-0 hover:opacity-100 absolute backdrop-invert backdrop-opacity-30 flex justify-center items-center">
                <span class="text-white text-md">
                  {{ $t("login.refresh") }}
                </span>
              </div>
              <imageVerify v-model:code="codeValue" class="!w-full !h-[40px]" ref="codeRef" />
            </div>
          </a-spin>
        </div>
      </a-form-item>
      <a-form-item>
        <div class="flex items-center justify-between">
          <a-checkbox class="my-2" v-model:checked="form.isRemember">
            {{ $t("login.remember") }}
          </a-checkbox>
          <a-button type="link" @click="setCurrentPage(5)">
            {{ $t("login.forget") }}
          </a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button class="!h-[45px] w-full" type="primary" :loading="loading" html-type="submit">
          {{ $t("login.sign") }}
        </a-button>
      </a-form-item>
    </a-form>
    <div class="grid grid-cols-1 gap-2 xl:grid-cols-3">
      <a-button @click="setCurrentPage(2)">
        <span class="text-sm">{{ $t("login.phoneLogin") }}</span>
      </a-button>
      <a-button @click="setCurrentPage(3)">
        <span class="text-sm">{{ $t("login.qrCodeLogin") }}</span>
      </a-button>
      <a-button @click="setCurrentPage(4)">
        <span class="text-sm">{{ $t("login.register") }}</span>
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import imageVerify from "com/imageVerify/index.vue";
import { loginRules } from "../utils/rules";
import userStore from "@/store/user";

const { login, setVerifyCode, setCurrentPage } = userStore();

const codeRef = ref<RefComponent<typeof imageVerify>>();

// 图片验证码
const codeLoading = ref<boolean>(false);
const codeValue = ref<string>("");
const setupCodeImg = async () => {
  form.code = ''
  codeLoading.value = true;
  await codeRef.value.getImgCode();
  codeLoading.value = false;
};

watch(codeValue, value => {
  setVerifyCode(value);
});

// 定义接口
interface loginInterface {
  userName: string;
  password: string;
  isRemember: boolean;
  code: string;
}
const form = reactive<loginInterface>({
  userName: "wadmin",
  password: "wadmin123",
  isRemember: true,
  code: "",
});
// 登录验证
const loading = ref<boolean>(false);
const submit = async () => {
  loading.value = true;
  const res = await login(form);
  loading.value = res;
  setupCodeImg();
  form.code = "";
};
</script>

<style scoped></style>
