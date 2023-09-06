import { reactive, toRefs } from "vue";
import { upload } from "@/hooks/interface/upload";
import {
  userList,
  updateUser,
  delUser,
  userInterface,
} from "@/apis/system/user";
import { deptList, deptListType } from "@/apis/common";
import { useOptions } from "@/hooks/useOptions";
import { generalParam } from "@/apis/common";

interface stateInterface {
  title: string; //modal 标题
  visible: boolean; //modal是否显示
  loading: boolean;
  formParam: userInterface;
  tableColumns: wTableProps;
  formColumns: wFormProps;
  initParam: any;
  fileList: upload.stateProps["fileListData"];
  deptTree: deptListType[]; //部门树
}

export const usePageData = () => {
  const colors = ["blue", "#FF9800", "red", "yellow", "#9C27B0"];

  const { list: userType } = useOptions(generalParam, [
    { valueType: "1", pageNum: 1, pageSize: 99 },
  ]);

  const { list: gradeList } = useOptions(
    generalParam,
    [{ valueType: "2", pageNum: 1, pageSize: 99 }],
    {
      optionKey: { label: "name", value: "value", color: "color" },
      afterRequest: record => {
        return record.map((x, i) => {
          return {
            ...x,
            color: colors[i],
          };
        });
      },
    },
  );

  // 自定义(使用tsx语法)
  const renderAge = ({ row, value }) => {
    return (
      <a-input-number
        step={1}
        min={1}
        max={100}
        v-model:value={row!["age"]}></a-input-number>
    );
  };

  const state = reactive<stateInterface>({
    title: "新增数据",
    visible: false,
    loading: false,
    fileList: [],
    formParam: null,
    initParam: {
      deptId: "",
    },
    deptTree: [], //部门树
    tableColumns: [
      { title: "真实姓名", dataIndex: "nickname", search: true },
      { title: "用户年龄", dataIndex: "age" },
      {
        title: "创建时间",
        dataIndex: "createdTime",
        searchOption: { formItemType: "a-date-picker" },
        sorter: (a: any, b: any) => {
          const t1 = new Date(a.createdTime).getTime();
          const t2 = new Date(b.createdTime).getTime();
          return t1 - t2;
        },
      },
      { title: "门户地址", dataIndex: "url", ellipsis: true },
      { title: "用户头像", dataIndex: "avatar", image: true },
      {
        title: "会员等级",
        dataIndex: "grade",
        search: true,
        tag: true,
        showEnum: true,
        searchOption: {
          formItemType: "a-select",
          componentOption: { options: gradeList },
        },
        sorter: (a: any, b: any) => a.grade - b.grade,
      },
      {
        title: "用户类型",
        dataIndex: "userType",
        showEnum: true,
        searchOption: {
          formItemType: "a-select",
          componentOption: { options: userType },
        },
      },
      {
        dataIndex: "operation",
        title: "操作",
        fixed: "right",
      },
    ],
    formColumns: [
      {
        isRule: true,
        formItemOption: { name: "userName", label: "用户账号" },
      },
      { formItemOption: { name: "nickname", label: "真实姓名" } },
      {
        formItemOption: {
          name: "age",
          label: "用户年龄",
          rules: [{ required: true, trigger: ["change", "blur"] }],
        },
        renderForm: renderAge,
      },
      {
        isRule: true,
        formItemOption: { name: "url", label: "门户地址" },
      },
      {
        isRule: true,
        formItemOption: { name: "avatar", label: "用户头像" },
        sort: 11,
      },
      { formItemOption: { name: "email", label: "邮箱" } },
      { formItemOption: { name: "address", label: "地址" } },
      {
        isRule: true,
        formItemType: "a-select",
        formItemOption: { name: "grade", label: "会员等级" },
        componentOption: {
          options: gradeList,
          showSearch: true,
          filterOption: (input: string, option: any) => {
            return option.label.indexOf(input) != -1;
          },
        },
      },
      {
        formItemType: "a-select",
        isRule: true,
        formItemOption: { name: "userType", label: "用户类型" },
        componentOption: {
          options: userType,
        },
      },
    ],
  });

  const open = async (type: string, row?: userInterface) => {
    state.visible = true;
    state.title = type === "add" ? "新增" : `编辑`;
    state.fileList = row
      ? [
          {
            url: row.avatar,
            status: "done",
            isHand: true, //手动上传 以防数据混乱
            uid: String(row.userId),
            name: "用户头像",
          },
        ]
      : [];
    state.formParam = row
      ? row
      : ({
          userType: 1,
          grade: 1,
        } as userInterface);
  };

  deptList().then(res => {
    const { code, data } = res;
    if (code === 200) {
      state.deptTree = data.dataList;
    }
  });

  return {
    userList,
    open,
    updateUser,
    delUser,
    ...toRefs(state),
  };
};
