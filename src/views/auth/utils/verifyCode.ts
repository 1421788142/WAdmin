import type { FormInstance } from "ant-design-vue";
import { ref } from "vue";

const isDisabled = ref(false);
const timer = ref(null);
const text = ref("");

export const useVerifyCode = () => {
    const start = async (
        formEl: FormInstance | undefined,
        props: string,
        time = 60
    ) => {
        if (!formEl) return;
        const initTime = time;
        await formEl.validateFields(props)
        clearInterval(timer.value);
        isDisabled.value = true;
        text.value = `${time}`;
        timer.value = setInterval(() => {
            if (time > 0) {
                time -= 1;
                text.value = `${time}`;
            } else {
                text.value = "";
                isDisabled.value = false;
                clearInterval(timer.value);
                time = initTime;
            }
        }, 1000);
    };

    const end = () => {
        text.value = "";
        isDisabled.value = false;
        clearInterval(timer.value);
    };

    return {
        isDisabled,
        timer,
        text,
        start,
        end
    };
};