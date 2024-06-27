import http from "@/api";
import { ResultPage } from "../utils/models";
import { TableListModel, RequestTableParams } from "@/models/tableModel"
import { DepartmentModel } from "@/models/departmentModel"


// 获取表格列表
export const getTabelDataApi = (params: RequestTableParams) => {
    return http.get<ResultPage<TableListModel>>('/v1/table', params);
};

// 获取部门列表
export const getDepartmentDataApi = (params: RequestTableParams) => {
    return http.get<ResultPage<DepartmentModel>>('/v1/department', params, { cancel: false });
};