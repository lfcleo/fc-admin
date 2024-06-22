import { RouteRecordRaw } from "vue-router";

export default {
    name: "setting",
    path: "/setting",
    require: "/setting/menu",
    meta: {
        icon: "Setting",
        title: "配置"
    },
    children: [
        {
            name: "settingMenu",
            path: "/setting/menu",
            component: () => import("@/views/setting/menu.vue"),
            meta: {
                icon: "Menu",
                title: "菜单管理",
                role: ["admin"]
            }
        }
    ]
} as RouteRecordRaw