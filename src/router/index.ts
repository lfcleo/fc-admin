import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/store/modules/auth";
import { useMenuStore } from "@/store/modules/menu.ts";
import NProgress from 'nprogress'
import { systemRoutes, systemAuthRoutes } from './modules/system'
import menuTool from "@/utils/menuRoute"

//扁平化本地静态路由
export const staticRoutes = menuTool.getFlatStaticRoutesList(menuTool.staticRoutes())

// 引入 views 文件夹下所有 vue 文件，排除components文件夹
const modules = import.meta.glob(["@/views/**/*.vue", '!@/views/**/components']);

const router = createRouter({
    history: createWebHashHistory(),
    routes: [...systemRoutes, ...systemAuthRoutes],
    strict: false,
    scrollBehavior: () => ({ left: 0, top: 0 })
});

//判断是否已加载过动态/静态路由
var isGetRouter = false;

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    // 1.NProgress 开始
    NProgress.start();

    // 2.动态设置标题
    document.title = to.meta.title ? `${to.meta.title} - ${import.meta.env.VITE_VUE_TITLE}` : `${import.meta.env.VITE_VUE_TITLE}`

    // 3.判断是访访问的是静态auth路由，有 Token 就在当前页面，没有 Token 重置路由到登陆页
    if (systemAuthRoutes.some(authRoute => authRoute.path.toLocaleLowerCase() === to.path.toLocaleLowerCase())) {
        if (authStore.token) return next(from.fullPath);
        resetRouter();
        isGetRouter = false;
        return next();
    }

    // 4.判断是否有 Token，没有重定向到 login 页面
    if (!authStore.token) return next({ path: '/login', replace: true });

    // 5.添加静态/动态路由
    if (!isGetRouter) {
        // 添加静态路由
        staticRoutes.forEach(item => {
            if (item.meta?.isFull) {
                router.addRoute(item as unknown as RouteRecordRaw);
            } else {
                router.addRoute("layout", item as unknown as RouteRecordRaw);
            }
        })
        //添加动态路由
        let apiMenu = menuTool.getFlatMenuList(useMenuStore().list)
        apiMenu.forEach(item => {
            item.children && delete item.children;
            if (item.component && typeof item.component == "string") {
                item.component = modules["/src/views" + item.component + ".vue"];
            }
            if (item.meta.isFull) {
                router.addRoute(item as unknown as RouteRecordRaw);
            } else {
                router.addRoute("layout", item as unknown as RouteRecordRaw);
            }
        })
        isGetRouter = true;
        return next({ ...to, replace: true });
    }

    // 6.正常访问页面
    next();
});

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
    let apiMenu = menuTool.getFlatMenuList(useMenuStore().list)
    apiMenu.forEach(route => {
        const { name } = route;
        if (name && router.hasRoute(name)) router.removeRoute(name);
    });
};

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
    NProgress.done();
    const fetchResourcesErrors = ['Failed to fetch dynamically imported module', 'Importing a module script failed']
    if (fetchResourcesErrors.some((item) => error?.message && error.message?.includes(item))) {
        window.location.reload()
        return
    }
    console.warn("路由错误", error.message);
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
    NProgress.done();
});

export default router;
