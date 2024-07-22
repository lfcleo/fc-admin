import http from "@/api";
import { ResultPage } from "../utils/models";
import { RoleModel, ApiModel, UserModel, DictCateModel, DictInfoModel } from "@/models/systemModel";

// 获取菜单列表
export const getMenuListApi = () => {
    return http.get<ResultPage<Menu.MenuOptions[]>>('/v1/menuList');
};

// 获取菜单列表（不带分页）
export const getMenuList1Api = () => {
    return http.get<Menu.MenuOptions[]>('/v1/menuList1');
};

// 获取角色列表
export const getRoleListApi = () => {
    return http.get<ResultPage<RoleModel[]>>('/v1/roleList');
};

// 获取角色列表（不带分页）
export const getRoleList1Api = () => {
    return http.get<RoleModel[]>('/v1/roleList1');
};

// 获取API列表
export const getApiListApi = () => {
    return http.get<ResultPage<ApiModel[]>>('/v1/aipList');
};

// 获取API列表 （不带分页）
export const getApiList1Api = () => {
    return http.get<ApiModel[]>('/v1/aipList1');
};

// 获取用户列表
export const getUserListApi = () => {
    return http.get<ResultPage<UserModel[]>>('/v1/userList');
};

// 获取字典分类列表
export const getDictListApi = () => {
    return http.get<DictCateModel[]>('/v1/dictList');
};

// 获取字典详情列表
export const getDictInfoApi = () => {
    return http.get<ResultPage<DictInfoModel>>('/v1/dictInfo');
};