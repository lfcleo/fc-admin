import { RouteRecordRaw } from "vue-router";
//系统静态路由
export const systemRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: import.meta.env.VITE_DASHBOARD_URL || '/dashboard',
    },
    {
        name: "layout",
        path: "/",
        component: () => import('@/layout/index.vue'),
        redirect: import.meta.env.VITE_DASHBOARD_URL || '/dashboard',
    },
    {
        path: "/404",
        component: () => import('@/layout/other/404.vue'),
    },
    {
        path: "/500",
        component: () => import('@/layout/other/500.vue'),
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import('@/layout/other/404.vue'),
    }
]

//auth静态路由
export const systemAuthRoutes: RouteRecordRaw[] = [
    {
        path: "/login",
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: "登录",
            type: "MENU"
        }
    },
    {
        path: "/user_register",
        component: () => import('@/views/login/userRegister.vue'),
        meta: {
            title: "注册",
            type: "MENU"
        }
    },
    {
        path: "/reset_password",
        component: () => import('@/views/login/resetPassword.vue'),
        meta: {
            title: "重置密码",
            type: "MENU"
        }
    }
]