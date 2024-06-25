import http from "@/api";
import { AuthRequestModel, AuthModel, MenuPermissionsModel } from "@/models/authModel";

// 用户登录
export const loginApi = (params: AuthRequestModel) => {
    return http.post<AuthModel>('/token', params);
};

// 获取菜单列表及权限
export const getMenuApi = () => {
    return http.get<MenuPermissionsModel>('/menu');
};

// 获取菜单列表
export const getMenuListApi = () => {
    return http.get<MenuPermissionsModel>('/menuList');
};

// 图片上传(多图上传必须传{ cancel: false })
export const uploadImg = (params: FormData) => {
    return http.post<string>('/upload', params, { cancel: false });
};

// 视频上传
export const uploadVideo = (params: FormData) => {
    return http.post<string>('/upload', params, { cancel: false });
};