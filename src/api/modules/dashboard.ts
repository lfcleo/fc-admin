import http from "@/api";
import { ECOption } from '@/components/fcEcharts/config';

// 获取菜单列表
export const getDashboardDataApi = () => {
    return http.get<ECOption>('/apiv1/dashboard');
};