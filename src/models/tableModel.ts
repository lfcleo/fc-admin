// 分页请求参数
export interface RequestPageModel {
    page: number;
    pageSize: number;
}

// 表格模型
export interface TableListModel {
    id: string;
    name: string;
    status: boolean;
    created_at: string;
}

// 表格请求参数模型
export interface RequestTableParams extends RequestPageModel {
    hobby: string;
}