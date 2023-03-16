import { reactive, toRefs, onMounted, onUnmounted } from 'vue';
import dayjs from 'dayjs';

export function useNow() {
  const state = reactive({
    year: 0,
    month: 0,
    week: '',
    hour: '',
    minute: '',
    second: '0',
  });

  const update = () => {
    const now = dayjs();
    const h = now.format('HH');
    const m = now.format('mm');
    const s = now.format('ss');
    state.year = now.get('y');
    state.month = now.get('M') + 1;
    state.week = '星期' + ['日', '一', '二', '三', '四', '五', '六'][now.day()];
    state.hour = h;
    state.minute = m;
    state.second = s;
  };

  const start = () => {
    update();
  }

  onMounted(() => {
    start();
  });

  return {
    ...toRefs(state),
    start,
  };
}
