import * as xlsx from 'xlsx';
import type { WorkBook } from 'xlsx';
const { utils, writeFile } = xlsx;
import { notification } from 'ant-design-vue';
import { CheckCircleTwoTone } from '@ant-design/icons-vue';
import { h } from 'vue';
import { $$t } from '@/plugins/language/setupI18n';

// 导出数据
export default ({
    data,
    header,
    filename,
}: {
    data: string[][],
    header: string[],
    filename: string,
}) => {
    notification.open({
        message: $$t('messages.xlsxTitle'),
        description: $$t('messages.xlsxDesc'),
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