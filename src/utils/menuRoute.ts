import { RouteRecordRaw, } from 'vue-router';

// 自动导入全部静态路由
const staticModules: Record<string, any> = import.meta.glob(
    ["../router/modules/**/*.ts", "!../router/modules/**/system.ts"],
    { eager: true }
);
let staticRoutes = [] as RouteRecordRaw[]
Object.keys(staticModules).forEach(key => {
    if (staticModules[key].default) {
        staticRoutes.push(staticModules[key].default);
    }
});

export default {
    /**
     * @description 使用递归扁平化菜单，方便添加动态路由
     * @param {Array} menuList 菜单列表
     * @returns {Array}
     */
    getFlatMenuList(menuList: Menu.MenuOptions[]): Menu.MenuOptions[] {
        let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
        return newMenuList.flatMap(item => [item, ...(item.children ? this.getFlatMenuList(item.children) : [])]);
    },
    /**
     * @description 本地静态路由
     * @returns {Array}
     */
    staticRoutes(): RouteRecordRaw[] {
        return staticRoutes
    },
    /**
     * @description 使用递归扁平化静态路由
     * @param {Array} routes 路由列表
     * @returns {Array}
     */
    getFlatStaticRoutesList(routes: RouteRecordRaw[]): RouteRecordRaw[] {
        return routes.reduce((flattened: RouteRecordRaw[], route) => {
            // 将当前路由直接添加到扁平化数组中  
            flattened.push(route);

            // 如果存在子路由，则递归调用 flattenRoutes 函数  
            if (route.children && route.children.length > 0) {
                return flattened.concat(this.getFlatStaticRoutesList(route.children));
            }

            // 如果没有子路由，直接返回当前扁平化数组  
            return flattened;
        }, []); // 初始的扁平化数组为空数组  
    },
    //过滤静态路由权限
    convertAndFilterRoutes(routes: RouteRecordRaw[], userRoles: string[]): Menu.MenuOptions[] {
        return routes.map(routeRecord => {
            const menuOptions: Menu.MenuOptions | null = {
                path: routeRecord.path,
                name: routeRecord.name as string,
                meta: {
                    ...routeRecord.meta, // 假设 meta 字段可以直接映射  
                } as Menu.MetaProps,
                children: routeRecord.children ? this.convertAndFilterRoutes(routeRecord.children, userRoles) : undefined,
            };
            // 检查 role 权限  
            if (menuOptions?.meta?.role && !menuOptions.meta.role.some(role => userRoles.includes(role))) {
                // 如果没有权限，返回 null  
                return null;
            }
            return menuOptions;
        }).filter(route => route !== null) as Menu.MenuOptions[];
    },
    // 查找树
    treeFind(tree: Menu.MenuOptions[], func: (node: Menu.MenuOptions) => boolean): Menu.MenuOptions | null {
        for (const data of tree) {
            if (func(data)) return data;
            if (data.children) {
                const res = this.treeFind(data.children, func);
                if (res) return res;
            }
        }
        return null;
    }

}