import * as xlsx from 'xlsx';
import type { WorkBook } from 'xlsx';
const { utils, writeFile } = xlsx;
import { notification } from 'ant-design-vue';
import { CheckCircleTwoTone } from '@ant-design/icons-vue';
import { h } from 'vue';
// 导出数据
export default ({
  data,
  header,
  filename,
}) => {
    notification.open({
        message: '正在导出请稍后',
        description:`如果数据庞大会导致下载缓慢哦，请您耐心等待！`,
        icon: () => h(CheckCircleTwoTone, { twoToneColor: '#09F175' }),
    });
    const arrData = [...data];
    if (header) {
        arrData.unshift(header);
    }
    const worksheet = utils.aoa_to_sheet(arrData);
    const workbook: WorkBook = {
        SheetNames: [filename],
        Sheets: {
            [filename]: worksheet,
        },
    };
    writeFile(workbook, `${filename}.xlsx`, { bookType: 'xlsx' });
}