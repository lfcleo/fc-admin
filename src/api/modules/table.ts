import http from "@/api";
import { ResultPage } from "../utils/models";
import { TableListModel, RequestTableParams } from "@/models/tableModel"
import { DepartmentModel } from "@/models/departmentModel"


// 获取表格列表
export const getTabelDataApi = (params: RequestTableParams) => {
    return http.get<ResultPage<TableListModel>>('/table', params);
};

// 获取部门列表
export const getDepartmentDataApi = (params: RequestTableParams) => {
    return http.get<ResultPage<DepartmentModel>>('/department', params, { cancel: false });
};