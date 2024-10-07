<template>
    <template v-for="navMenu in navMenus" :key="navMenu.path">
        <template v-if="!navMenu.meta.isHide && navMenu.meta.type != 'BUTTON'">
            <el-menu-item v-if="!hasChildren(navMenu)" :index="navMenu.path">
                <a v-if="navMenu.meta && navMenu.meta.type == 'LINK'" :href="navMenu.path" target="_blank"
                    @click.stop='() => { }'></a>
                <el-icon v-if="navMenu.meta && navMenu.meta.icon">
                    <component :is="navMenu.meta.icon || 'Menu'" />
                </el-icon>
                <template #title>
                    <span>{{ navMenu.meta?.title }}</span>
                    <span v-if="navMenu.meta?.tag && !sysGlobalStore.sysMenuIsCollapse" class="menu-tag">{{
                        navMenu.meta.tag }}</span>
                </template>
            </el-menu-item>
            <el-sub-menu v-else :index="navMenu.path">
                <template #title>
                    <el-icon v-if="navMenu.meta && navMenu.meta.icon">
                        <component :is="navMenu.meta.icon || 'Menu'" />
                    </el-icon>
                    <span>{{ navMenu.meta?.title }}</span>
                    <span v-if="navMenu.meta?.tag && !sysGlobalStore.sysMenuIsCollapse" class="menu-tag">{{
                        navMenu.meta.tag }}</span>
                </template>
                <navMenu :navMenus="navMenu.children"></navMenu>
            </el-sub-menu>
        </template>
    </template>
</template>

<script setup lang="ts">
import { useSysGlobalStore } from "@/store/system/global";

const sysGlobalStore = useSysGlobalStore()

defineProps({
    navMenus: Array as () => Array<Menu.MenuOptions>
});

const hasChildren = (item: Menu.MenuOptions) => {
    return item.children && !item.children.every(item => item.meta.isHide || item.meta.type == 'BUTTON')
}
</script>
