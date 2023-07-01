export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 80,
  },
  {
    title: '手机号',
    dataIndex: 'no',
    width: 120,
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
  {
    title: '开始时间',
    dataIndex: 'beginTime',
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
  },
];

export const data: any[] = (() => {
  const arr: any[] = [];
  for (let index = 0; index < 10000; index++) {
    arr.push({
      id: `${index}`,
      name: `${index} 用户名称`,
      age: `${index + 10}`,
      no: `${index}21341298678`,
      address: '测试地址',
      beginTime: new Date().toLocaleString(),
      endTime: new Date().toLocaleString(),
    });
  }
  return arr;
})();

// ["ID", "姓名", "年龄", "编号", "地址", "开始时间", "结束时间"]
export const xlsxHeader = columns.map((column) => column.title);
// [["ID", "姓名", "年龄", "编号", "地址", "开始时间", "结束时间"],["0", "0 John Brown", "10", "098678"]]
export const xlsxData = data.map((item) => {
  return Object.keys(item).map((key) => item[key]);
});
