// 部门模型
export interface DepartmentModel {
    id: string;
    name: string;
    children: DepartmentChild[];
}

export interface DepartmentChild {
    id: string;
    name: string;
}