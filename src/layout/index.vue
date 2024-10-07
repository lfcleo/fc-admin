<template>
    <component :is="LayoutComponents[sysGlobalStore.sysLayout]" :menuList="menuList" :pmenu="pmenu" :nextMenu="nextMenu"
        @selectOneMenu="selectOneMenu" />
    <!-- 退出最大化 -->
    <div class="main-maximize-exit" @click="exitMaximize">
        <el-icon>
            <Close />
        </el-icon>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, type Component } from 'vue';
import { useI18n } from "vue-i18n";
import { useRoute } from 'vue-router';
import router from '@/router';
import colorTool from '@/utils/color'
import { useSysGlobalStore } from "@/store/system/global";
import { useSysViewTagsStore } from "@/store/system/viewTags";
import { useSysKeepAliveStore } from "@/store/system/keepAlive";
import { useMenuStore } from "@/store/modules/menu";
import { useAuthStore } from '@/store/modules/auth';
import LayoutDefault from "./layoutDefault/index.vue"
import LayoutHeader from "./layoutHeader/index.vue"
import LayoutMenu from "./layoutMenu/index.vue"
import LayoutDock from "./layoutDock/index.vue"
import menuTool from '@/utils/menuRoute'

const { locale } = useI18n()
const route = useRoute();
const menuStore = useMenuStore();
const authStore = useAuthStore();
const sysGlobalStore = useSysGlobalStore();
const sysViewTagsStore = useSysViewTagsStore()
const sysKeepAliveStore = useSysKeepAliveStore()
const menuList = ref<Menu.MenuOptions[]>([])
const pmenu = ref<Menu.MenuOptions>()
const nextMenu = ref<Menu.MenuOptions[]>([])
const viewTag = ref<Menu.MenuOptions>()

const LayoutComponents: Record<string, Component> = {
    default: LayoutDefault, //默认布局
    header: LayoutHeader,   //通栏布局
    menu: LayoutMenu,       //经典布局
    dock: LayoutDock         //功能坞布局
};

watch(route, (val) => {
    //添加keepAlive
    if (val.meta.isKeepAlive) {
        sysKeepAliveStore.addKeepAliveName(val.name as string)
    }
    showThis()
})

onMounted(() => {
    onLayoutResize();
    window.addEventListener('resize', onLayoutResize);
    const staticMenus = menuTool.convertAndFilterRoutes(menuTool.staticRoutes(), authStore.userInfo.roles)
    menuList.value = [...menuStore.list, ...staticMenus]
    showThis()
})

const showThis = () => {

    let temp = findOutermostByPath(menuList.value, route.matched[route.matched.length - 1].path)

    if (temp) {
        pmenu.value = temp
    } else {
        pmenu.value = menuList.value[0]
    }
    if (pmenu.value.children && pmenu.value.children.length > 0) {
        nextMenu.value = filterUrl(pmenu.value.children)
    } else {
        nextMenu.value = []
    }
    //添加面包屑
    menuStore.breadcrumbList = findActivePath(pmenu.value, route.matched[route.matched.length - 1].path)
    //添加标签tags
    if (!sysViewTagsStore.list.some(tagItem => tagItem.path == viewTag.value?.path)) {
        sysViewTagsStore.list.push({
            name: viewTag.value?.name,
            path: viewTag.value?.path,
            meta: viewTag.value?.meta
        } as Menu.MenuOptions)
    }
}

//监听视图大小
const onLayoutResize = () => {
    document.body.clientWidth < 992 ? sysGlobalStore.sysIsMobile = true : sysGlobalStore.sysIsMobile = false
}
//退出最大化
const exitMaximize = () => {
    document.getElementById('app')?.classList.remove('main-maximize')
}
//选择一级菜单
const selectOneMenu = (item: Menu.MenuOptions) => {
    pmenu.value = item
    if (pmenu.value.children && pmenu.value.children.length > 0) {
        nextMenu.value = filterUrl(pmenu.value.children)
    } else {
        nextMenu.value = []
        router.push({ path: pmenu.value.path })
    }
}
//转换外部链接的路由
const filterUrl = (map: Menu.MenuOptions[]): Menu.MenuOptions[] => {
    let newMap = [] as Menu.MenuOptions[]
    map.forEach(item => {
        //递归循环
        if (item.children && item.children.length > 0) {
            item.children = filterUrl(item.children)
        }
        newMap.push(item)
    })
    return newMap;
}

// 根据页面路径查找最外层菜单
function findOutermostByPath(menuOptions: Menu.MenuOptions[], activePath: string): Menu.MenuOptions | null {
    for (const route of menuOptions) {
        // 检查当前路径是否匹配
        if (route.path === activePath) {
            viewTag.value = route
            return route;
        }
        // 如果当前路由有子路由，递归查找
        if (route.children && route.children.length > 0) {
            const matchedChild = findOutermostByPath(route.children, activePath);
            if (matchedChild) {
                // 返回匹配的子路由的父级，即最外层数据
                return route;
            }
        }
    }
    // 如果没有找到匹配的，返回null
    return null;
}

// 根据页面路径查找面包屑
function findActivePath(menu: Menu.MenuOptions, activePath: string, result: Menu.MenuOptions[] = []): Menu.MenuOptions[] {
    if (menu.path === activePath) {
        result.unshift(menu);
        return result;
    }
    // 如果存在子菜单，递归查找  
    if (menu.children) {
        for (const child of menu.children) {
            const found = findActivePath(child, activePath, result);
            if (found.length > 0) {
                result.unshift(menu);
                return found;
            }
        }
    }
    return result;
}

//使用watch 监听每一个对象
const watchs = (() => {
    return Object.keys(sysGlobalStore.$state).map((key: string) => {
        return watch(() => sysGlobalStore.$state[key], (newVal) => {
            switch (key) {
                case 'sysLayout':
                    document.body.setAttribute('data-layout', newVal);
                    break;

                case 'sysDark':
                    document.documentElement.classList[newVal ? 'add' : 'remove']('dark');
                    break;

                case 'sysLang':
                    locale.value = newVal
                    break;

                case 'sysColor':
                    document.documentElement.style.setProperty('--el-color-primary', newVal);

                    for (let i = 1; i <= 9; i++) {
                        document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, colorTool.lighten(newVal, i / 10));
                    }

                    for (let i = 1; i <= 9; i++) {
                        document.documentElement.style.setProperty(`--el-color-primary-dark-${i}`, colorTool.darken(newVal, i / 10));
                    }
                    break;

                default:
                    break;
            }
        }, { immediate: true })
    })
});

let watchEffects = watchs();

sysGlobalStore.$subscribe((_mutation, state) => {
    if (Object.keys(state).length !== watchEffects.length) {
        // 清空watch
        watchEffects.forEach(e => e());
        // 重新监听对象的每一个属性
        watchEffects = watchs()
    }
});

</script>