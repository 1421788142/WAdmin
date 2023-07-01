import { debounce } from "@/utils/util";
import { nextTick, ref, Ref, onMounted, onDeactivated, onBeforeUnmount } from "vue";

const getColNum = (width: number) => {
    if (!width) return 0
    if (width >= 1600) {
        return 6;
    } else if (width >= 1200) {
        return 4;
    } else if (width >= 1000) {
        return 3;
    } else if (width >= 400) {
        return 2;
    } else {
        return 1;
    }
}

export const useAutoFormRow = (
    el: Ref<Element>,
    defaultNum = 4,
    maxLength = 4
) => {
    let num = ref(defaultNum);

    const resetNum = () => {
        if (!el.value) return
        const width = el.value.clientWidth;
        num.value = Math.min(maxLength, getColNum(width));
    }

    const intersectionObserver = new IntersectionObserver(entries => {
        for (let i = 0, len = entries.length; i < len; i++) {
            if (entries[i].intersectionRatio <= 0) continue;
            resetNum();
        }
    });

    const resize = debounce(resetNum);
    const remove = () => {
        let r = () => {
            if (!el.value) return
            window.removeEventListener("resize", resize);
            intersectionObserver.unobserve(el.value);
            intersectionObserver.disconnect();
        };
        onDeactivated(r);
        onBeforeUnmount(r);
    };
    const init = () => {
        if (!el?.value) return;
        intersectionObserver.observe(el.value);
        remove();
        window.addEventListener("resize", resize);
    };

    onMounted(async () => {
        await nextTick();
        init();
    });

    return { num, init, resize, remove, resetNum };
}