import { reactive, toRefs, watch } from 'vue'
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

import emitter from '@/plugins/mitt'
import config from '@/store/config';
const configStore = config()
const { getConfigState } = configStore

interface stateInterface {
    modalMinList: {
        title: string,
        path: string,
        uid: string,
    }[],
    modalMinUid: string
}

export const useModalMin = (
    route: RouteLocationNormalizedLoaded,
    router: Router,
) => {
    const state = reactive<stateInterface>({
        modalMinList: [],
        modalMinUid: ''
    })

    watch(() => getConfigState('modalMinNum'), (newV, oldV) => {
        if (!newV) colseModalMin()
    })

    const colseModalMin = () => {
        emitter.off('setModalMin')
        emitter.off('delModalMin')
        emitter.off('setRoute')
    }

    if (!getConfigState('modalMinNum')) colseModalMin()

    // 监听弹窗小化
    emitter.on('setModalMin', (event: any) => {
        let isHas = state.modalMinList.some(x => x.uid === event.uid)
        if (isHas || getConfigState('modalMinNum') < state.modalMinList.length + 1) return
        state.modalMinList.push({
            title: `${route.meta.title} [${event.title}]`,
            path: route.path,
            uid: event.uid,
        })
    })
    emitter.on('delModalMin', (uid: string) => delModalMin(uid))
    emitter.on('setRoute', (historyMenu: menuItem[]) => {
        state.modalMinList.forEach(min => {
            let has = historyMenu.some(menu => menu.path === min.path)
            if (!has) state.modalMinList = state.modalMinList.filter(x => x.uid !== min.uid)
        })
    })

    const delModalMin = (uid: string) => {
        state.modalMinUid = uid
        setTimeout(() => {
            state.modalMinList = state.modalMinList.filter(x => x.uid !== uid)
            state.modalMinUid = ''
        }, 500)
    }

    const openModalMin = (modal: any) => {
        delModalMin(modal.uid)
        router.push({ path: modal.path }).then(res => {
            emitter.emit('openModalMin', modal.uid)
        })
    }

    return {
        ...toRefs(state),
        openModalMin,
        delModalMin
    }
}