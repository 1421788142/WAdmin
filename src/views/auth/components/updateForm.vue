<template>
  <div>
    <a-form
      :rules="updateRules"
      class="mt-5"
      ref="updateRef"
      name="updateRef"
      :model="form"
      @finish="submit"
    >
      <a-form-item name="phone">
        <a-input
          size="large"
          :placeholder="$t('login.phone')"
          v-model:value="form.phone"
        />
      </a-form-item>
      <a-form-item name="code" class="mt-5">
        <div class="grid grid-flow-row-dense grid-cols-5 gap-2">
          <a-input
            class="col-span-3"
            size="large"
            :placeholder="$t('login.verifyCode')"
            v-model:value="form.code"
          />
          <a-button
            class="col-span-2"
            :disabled="isDisabled"
            size="large"
            @click="start(updateRef, 'phone')"
          >
            <span class="text-sm">
              {{ text ? `${text}${$t("login.info")}` : $t("login.sendSms") }}
            </span>
          </a-button>
        </div>
      </a-form-item>
      <a-form-item name="password">
        <a-input
          size="large"
          @input="getLvl(form.password)"
          :placeholder="$t('login.password')"
          v-model:value="form.password"
        />
        <div>
          <a-progress :percent="level" :showInfo="false" :steps="3" />
        </div>
      </a-form-item>
      <a-form-item name="confirmPassword" :rules="repeatPasswordRule">
        <a-input
          size="large"
          :placeholder="$t('login.confirmPassword')"
          v-model:value="form.confirmPassword"
        />
      </a-form-item>
      <a-form-item>
        <a-button class="w-full" html-type="submit" type="primary" size="large">
          <span class="text-sm">{{ $t("buttons.submit") }}</span>
        </a-button>
      </a-form-item>
      <a-form-item>
        <backButton />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { updateRules } from "../utils/rules";
import { useVerifyCode } from "../utils/verifyCode";
import { FormInstance, message } from "ant-design-vue";
import { $$t } from "@/plugins/language/setupI18n";
import type { Rule } from "ant-design-vue/es/form";
import backButton from "./backButton.vue";

const { isDisabled, text, start } = useVerifyCode();
const level = ref<number>(0);
const getLvl = (val: any) => {
  let num = 0;
  if (/\d/.test(val)) num++; //数字
  if (/[a-z]/.test(val)) num++; //小写
  if (/[,\.#%'\+\*\-:;^_`]/.test(val)) num++; //字符
  if (val.length > 8) num++;
  if (num == 0) level.value = 0;
  if (num > 0) level.value = 25;
  if (num > 1) level.value = 50;
  if (num > 2) level.value = 75;
  if (num > 3) level.value = 100;
};
interface loginInterface {
  phone: string;
  code: string;
  password: string;
  confirmPassword: string;
}

const form = reactive<loginInterface>({
  phone: "",
  code: "",
  password: "",
  confirmPassword: "",
});

const submit = async () => {
  message.success("ok");
};

const repeatPasswordRule = [
  {
    validator: (rule: Rule, value: string, callback: Function) => {
      if (value === "") {
        callback(
          new Error(
            $$t("commons.pleaseEnter", { text: $$t("login.confirmPassword") }),
          ),
        );
      } else if (form.password !== value) {
        callback(new Error($$t("login.passwordDifferentReg")));
      } else {
        return Promise.resolve();
      }
    },
    trigger: "blur",
  },
];

const updateRef = ref<FormInstance>();
</script>

<style lang="scss">
.ant-progress-steps-item {
  width: 33% !important;
}
</style>
