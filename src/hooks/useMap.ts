import AMapLoader from "@amap/amap-jsapi-loader";
import { onMounted, ref, Ref, shallowRef, watchEffect } from "vue";
// 加载地图API
function loadAMap() {
    const aMapLoaded = ref<boolean>(false)
    // 从环境变量读取AMAP KEY
    const key = '835dcfdf15a17135bd5f33ddc45505c7'
    if (key) {
        onMounted(() => {
            AMapLoader.load({
                key,
                version: '2.0',
                plugins: []
            }).then(() => {
                aMapLoaded.value = true
            })
        })
    } else {
        throw new Error('map load error.')
    }
    return aMapLoaded
}

// 初始化地图 ，传入作为容器的元素节点
export const useAMap = (
    mapContainerRef: Ref<HTMLDivElement | undefined>,
    options?: any
): Ref<AMap.Map | undefined> => {
    const mapRef = shallowRef<AMap.Map>()
    const aMapLoaded = loadAMap()
    watchEffect(() => {
        if (aMapLoaded.value && mapContainerRef.value) {
            mapRef.value = new AMap.Map(mapContainerRef.value, options)
        }
    })
    return mapRef
}
