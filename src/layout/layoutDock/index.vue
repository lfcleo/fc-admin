<template>
    <header class="adminui-header">
        <div class="adminui-header-left">
            <div class="logo-bar">
                <img class="logo" src="/img/logo-r.png">
                <span>{{ appTitle }}</span>
            </div>
        </div>
        <div class="adminui-header-right">
            <div v-if="!sysGlobalStore.sysIsMobile" class="adminui-header-menu">
                <el-menu mode="horizontal" :default-active="route.path" router background-color="#222b45"
                    text-color="#fff" active-text-color="var(--el-color-primary)">
                    <navMenu :navMenus="menuList"></navMenu>
                </el-menu>
            </div>
            <Side-m :menu="menuList" v-if="sysGlobalStore.sysIsMobile"></Side-m>
            <userbar></userbar>
        </div>
    </header>
    <section class="aminui-wrapper">
        <div class="aminui-body el-container">
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
import userbar from '../components/userbar.vue';
import Tags from "../components/tags.vue";

const route = useRoute()
const sysGlobalStore = useSysGlobalStore()
const sysKeepAliveStore = useSysKeepAliveStore()
const appTitle = import.meta.env.VITE_VUE_APP_TITLE

// 注入刷新页面方法
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
provide("refresh", refreshCurrentPage);

defineProps<{ menuList: Menu.MenuOptions[], pmenu: Menu.MenuOptions, nextMenu: Menu.MenuOptions[] }>();
const emit = defineEmits(['selectOneMenu'])
</script>