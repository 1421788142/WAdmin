<template>
  <div>
    <a-form
      class="mt-5"
      ref="phoneRef"
      name="phoneRef"
      :model="form"
      :rules="phoneRules"
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
            @click="start(phoneRef, 'phone')"
          >
            <span class="text-sm">
              {{ text ? `${text}${$t("login.info")}` : $t("login.sendSms") }}
            </span>
          </a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary" size="large" class="w-full">
          <span class="text-sm">{{ $t("buttons.confirm") }}</span>
        </a-button>
      </a-form-item>
      <a-form-item>
        <backButton />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useVerifyCode } from "../utils/verifyCode";
import { FormInstance, message } from "ant-design-vue";
import { phoneRules } from "../utils/rules";
import backButton from "./backButton.vue";

const { isDisabled, text, start } = useVerifyCode();

interface loginInterface {
  phone: string;
  code: string;
}

const phoneRef = ref<FormInstance>();

const form = reactive<loginInterface>({
  phone: "",
  code: "",
});

const submit = async (values: any) => {
  message.success("ok");
};
</script>

<style scoped></style>
