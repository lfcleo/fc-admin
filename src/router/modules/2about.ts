import { RouteRecordRaw } from "vue-router";

export default {
    name: "about",
    path: "/about",
    component: () => import("@/views/about/index.vue"),
    meta: {
        icon: "WarningFilled",
        title: "关于",
        type: "MENU"
    }
} as RouteRecordRaw