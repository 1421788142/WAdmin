import modal from '@/components/global/modal/index.vue'
import table from '@/components/global/table/index.vue'
import form from '@/components/global/form/index.vue'
import treeFilter from '@/components/global/treeFilter/index.vue'
import iconPicker from '@/components/global/iconPicker/index.vue'
import importData from '@/components/global/importData/index.vue'
import wangEditor from '@/components/global/wangEditor/index.vue'
declare module 'vue' {
    interface GlobalComponents {
        modal: typeof modal,
        table: typeof table,
        form: typeof form,
        treeFilter: typeof treeFilter,
        iconPicker: typeof iconPicker,
        importData: typeof importData,
        wangEditor: typeof wangEditor,
    }
}