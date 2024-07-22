
/**
 * 角色模型
 */
export interface RoleModel {
    id: number;
    name: string;
    code: string;
    notes: string;
}

/**
 * API模型
 */
export interface ApiModel {
    id: number;
    method: string;
    name: string;
    path: string;
    description: string;
}

/**
 * 用户列表的用户模型
 */
export interface UserModel {
    userId: number;
    userName: string;
    avatar: string;
    email: string;
    phone: string;
    status: boolean;
    roles: string[];
}

/**
 * 字典分类列表模型
 */
export interface DictCateModel {
    id: number;
    name: string;
    code: string;
}

/**
 * 字典详情列表模型
 */
export interface DictInfoModel {
    id: number;
    name: string;
    key: string;
}