<template>
    <header class="adminui-header">
        <div class="adminui-header-left">
            <div class="logo-bar">
                <img class="logo" src="/img/logo-r.png">
                <span>{{ appTitle }}</span>
            </div>
            <ul v-if="!sysGlobalStore.sysIsMobile" class="nav">
                <li v-for="item in menuList" :key="item.name" :class="pmenu.path == item.path ? 'active' : ''"
                    @click="showMenu(item)" v-show="!item.meta.isHide">
                    <el-icon>
                        <component :is="item.meta.icon || 'Menu'" />
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </li>
            </ul>
        </div>
        <div class="adminui-header-right">
            <userbar></userbar>
        </div>
    </header>
    <section class="aminui-wrapper">
        <div v-if="!sysGlobalStore.sysIsMobile" class="aminui-side"
            :class="{ 'not-aside': nextMenu.length == 0, 'isCollapse': sysGlobalStore.sysMenuIsCollapse }">
            <div v-if="!sysGlobalStore.sysMenuIsCollapse && pmenu" class="adminui-side-top">
                <h2>{{ pmenu.meta?.title }}</h2>
            </div>
            <div class="adminui-side-scroll">
                <el-scrollbar>
                    <el-menu :default-active="route.path" router :collapse="sysGlobalStore.sysMenuIsCollapse"
                        :unique-opened="sysGlobalStore.sysmenuUniqueOpened" :collapse-transition="false">
                        <navMenu :navMenus="nextMenu"></navMenu>
                    </el-menu>
                </el-scrollbar>
            </div>
            <div class="adminui-side-bottom" v-if="nextMenu.length > 0"
                @click="sysGlobalStore.sysMenuIsCollapse = !sysGlobalStore.sysMenuIsCollapse">
                <el-icon>
                    <Expand v-if="sysGlobalStore.sysMenuIsCollapse" />
                    <Fold v-else />
                </el-icon>
            </div>
        </div>
        <Side-m :menu="menuList" v-if="sysGlobalStore.sysIsMobile"></Side-m>
        <div class="aminui-body">
            <Topbar v-if="!sysGlobalStore.sysIsMobile"></Topbar>
            <Tags v-if="!sysGlobalStore.sysIsMobile && sysGlobalStore.sysLayoutTags">
            </Tags>
            <div class="adminui-main" id="adminui-main">
                <router-view v-slot="{ Component }">
                    <transition appear name="fade-transform" mode="out-in">
                        <keep-alive :include="sysKeepAliveStore.list">
                            <component :is="Component" :key="route.fullPath" v-if="isRouterShow" />
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
            <div class="powered-bottom">
                2024 © Powered by <a href="https://github.com/lfcleo" target="_blank">FC-Admin</a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import { useRoute } from "vue-router";
import { useSysGlobalStore } from "@/store/system/global";
import { useSysKeepAliveStore } from "@/store/system/keepAlive";
import navMenu from "../components/navMenu.vue"
import SideM from '../components/sideM.vue';
import Topbar from '../components/topbar.vue';
import userbar from '../components/userbar.vue';
import Tags from "../components/tags.vue";

const route = useRoute()
const sysGlobalStore = useSysGlobalStore()
const sysKeepAliveStore = useSysKeepAliveStore()
const appTitle = import.meta.env.VITE_VUE_TITLE

// 注入刷新页面方法
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
provide("refresh", refreshCurrentPage);

defineProps<{ menuList: Menu.MenuOptions[], pmenu: Menu.MenuOptions, nextMenu: Menu.MenuOptions[] }>();
const emit = defineEmits(['selectOneMenu'])

const showMenu = (item: Menu.MenuOptions) => {
    emit('selectOneMenu', item)
}
</script>