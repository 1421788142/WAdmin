import { onMounted, reactive, toRefs } from "vue";
import { message } from "ant-design-vue"
import { WaterfallType, resultType } from './interface'
import { useApi } from "@/hooks/useApi"
import errorImg from "@/assets/image/404.png";
import loadingImg from "@/assets/image/403.png";
import { $$t } from "@/plugins/language/setupI18n";

const defaultOptions = {
    rowKey: "id", // 唯一key值
    gutter: 10, // 卡片之间的间隙
    hasAroundGutter: true, // 是否有周围的gutter
    width: 320, // 卡片在PC上的宽度
    breakpoints: { // 自定义行显示个数，主要用于对移动端的适配
        1200: {
            rowPerView: 4, // 当屏幕宽度小于等于1200
        },
        800: {
            rowPerView: 3,  // 当屏幕宽度小于等于800
        },
        500: {
            rowPerView: 2, // 当屏幕宽度小于等于500
        },
    },
    animationEffect: "animate__zoomInUp",  // 动画效果 https://animate.style/
    animationDuration: 1000, // 动画时间
    animationDelay: 300, // 动画延迟
    backgroundColor: "#fff", // 背景色
    imgSelector: "src.original",  // 图片字段选择器，如果层级较深，使用 xxx.xxx.xxx 方式
    loadProps: {  // 加载配置
        loadingImg,
        errorImg,
    },
    lazyload: true, // 是否懒加载
}

export type optionsType = typeof defaultOptions

export const useWaterfall = ({
    initParam,
    requestApi,
    beforeLoad,
    afterLoad,
    pagination
}: WaterfallType.hookProps) => {
    const state = reactive({
        hasMore: true,
    })
    const handleData = (data: resultType) => {
        return afterLoad ? afterLoad(data, {
            listData,
            loading,
            pageable
        }) : (() => data.dataList)()
    }
    const getListData = async () => {
        if (!state.hasMore) return message.warn($$t('commons.noMoreData'))
        try {
            loading.value = true
            await updateTotalParam()
            Object.assign(totalParam.value, initParam)
            let { data } = await requestApi(beforeLoad ? beforeLoad(totalParam.value) : totalParam.value)
            if (data.pageNum === 1) {
                listData.value = handleData(data)
            } else if (listData.value.length < data.total) {
                listData.value = listData.value.concat(handleData(data))
            } else {
                state.hasMore = false
                message.warn($$t('commons.noMoreData'))
            }
            // 解构后台返回的分页数据(如果有分页更新分页信息)
            const { pageNum, pageSize, total } = data;
            pagination && updatePageable({ pageNum, pageSize, total });
        } catch (error) {
            console.log(error)
            message.warn($$t('commons.requestFailure'))
        } finally {
            loading.value = false
        }
    }

    const {
        listData,
        loading,
        pageable,
        totalParam,
        initSearchParam,
        change,
        search,
        reset,
        updatePageable,
        updateTotalParam
    } = useApi(getListData, pagination)
    onMounted(() => {
        initSearchParam.value = initParam
        reset()
    })

    return {
        ...toRefs(state),
        listData,
        loading,
        defaultOptions,
        pageable,
        change,
        search,
        reset,
        getListData
    }
}