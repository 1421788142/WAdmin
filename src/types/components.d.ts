import button from '@/components/global/button/index.vue'
import modal from '@/components/global/modal/index.vue'
import table from '@/components/global/table/index.vue'
import form from '@/components/global/form/index.vue'
import treeFilter from '@/components/global/treeFilter/index.vue'
import iconPicker from '@/components/global/iconPicker/index.vue'
import importData from '@/components/global/importData/index.vue'
import wangEditor from '@/components/global/wangEditor/index.vue'
import uploadImg from '@/components/upload/uploadImg.vue'
declare module 'vue' {
    interface GlobalComponents {
        wButton: typeof button,
        wModal: typeof modal,
        wTable: typeof table,
        wForm: typeof form,
        wTreeFilter: typeof treeFilter,
        wIconPicker: typeof iconPicker,
        wImportData: typeof importData,
        wWangEditor: typeof wangEditor,
        wUploadImg: typeof uploadImg,
    }
}