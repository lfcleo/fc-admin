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
            component: () => import("@/views/setting/menu/index.vue"),
            meta: {
                icon: "Menu",
                title: "菜单管理",
                role: ["admin"],    //用户角色含有“admin”才会显示
                tag: "1.0.1"
            }
        },
        {
            name: "settingApi",
            path: "/setting/api",
            component: () => import("@/views/setting/api/index.vue"),
            meta: {
                icon: "Platform",
                title: "接口管理",
                role: ["admin"],    //用户角色含有“admin”才会显示
                tag: "1.0.1"
            }
        },
        {
            name: "settingRole",
            path: "/setting/role",
            component: () => import("@/views/setting/role/index.vue"),
            meta: {
                icon: "Avatar",
                title: "角色管理",
                tag: "1.0.1"
            }
        },
        {
            name: "settingUser",
            path: "/setting/user",
            component: () => import("@/views/setting/user/index.vue"),
            meta: {
                icon: "UserFilled",
                title: "用户管理",
                tag: "1.0.1"
            }
        },
        {
            name: "settingDict",
            path: "/setting/dict",
            component: () => import("@/views/setting/dict/index.vue"),
            meta: {
                icon: "Memo",
                title: "字典管理",
                tag: "1.0.1"
            }
        }
    ]
} as RouteRecordRaw