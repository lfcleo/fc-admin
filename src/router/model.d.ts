import 'vue-router'

// 为了确保这个文件被当作一个模块，添加至少一个 `export` 声明
export { }

declare module 'vue-router' {
    interface RouteMeta {
        /** 菜单和面包屑对应的图标 */
        icon?: string;
        /** 路由标题 (用作 document.title || 菜单的名称) */
        title: string;
        /** 菜单栏高亮,默认激活菜单的 index */
        active?: string;
        /** 此菜单类型，MENU=菜单，LINK=外链，BUTTON=按钮 */
        type: string;
        /** 是否在菜单中隐藏 */
        isHide?: boolean;
        /** 菜单是否全屏 (示例：数据大屏页面) */
        isFull?: boolean;
        /** 菜单是否固定在标签页中 (首页通常是固定项) */
        isAffix?: boolean;
        /** 是否缓存路由 */
        isKeepAlive?: boolean;
        /** 角色权限控制 */
        role?: string[];
        /** 标签，会在菜单栏中显示红色角标 */
        tag?: string;
    }
}