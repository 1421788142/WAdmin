import { message } from 'ant-design-vue';
import type { UploadFile } from 'ant-design-vue'
// 上传前的验证
export function beforeUpload (file:UploadFile) {
	const isExcel = file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
	const isLt5M = file.size / 1024 / 1024 < 5;
	if (!isExcel) message.error('上传文件只能是 xls / xlsx 格式！');
	if (!isLt5M) message.error('上传文件大小不能超过 5MB！');
	return isExcel && isLt5M;
}