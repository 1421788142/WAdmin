import { message } from 'ant-design-vue';
import type { UploadFile } from 'ant-design-vue'
import { $$t } from "@/plugins/language/setupI18n";


// 上传前的验证
export function beforeUpload(file: UploadFile) {
	const isExcel = file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
	const isLt5M = file.size / 1024 / 1024 < 5;
	if (!isExcel) message.error($$t('messages.fileType', { type: 'xls / xlsx' }));
	if (!isLt5M) message.error($$t('messages.fileSizeMax', { num: '5' }));
	return isExcel && isLt5M;
}