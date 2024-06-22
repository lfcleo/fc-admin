<template>
    <div class="adminui-tags">
        <div class="tabs-menu">
            <el-tabs v-model="activeName" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
                <el-tab-pane v-for="item in sysViewTagsStore.list" :key="item.name" :name="item.name"
                    :label="item.meta.title" :closable="item.meta.isAffix ? false : true">
                    <template #label>
                        <div style="display: flex;align-items: center;"
                            @contextmenu.prevent="openContextMenu($event, item)">
                            <el-icon v-if="item.meta.icon">
                                <component :is="item.meta.icon"></component>
                            </el-icon>
                            &nbsp;
                            <span>{{ item.meta.title }}</span>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>

            <transition name="el-zoom-in-top">
                <ul v-if="contextMenuVisible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu"
                    id="contextmenu" ref="contextmenuRef">
                    <li @click="refresh(selectTab)">
                        <el-icon>
                            <Refresh />
                        </el-icon>{{ $t("tabs.refresh") }}
                    </li>
                    <hr>
                    <li @click="tabCurrentTab(selectTab)"
                        :class="selectTab && selectTab.meta.isAffix ? 'disabled' : ''">
                        <el-icon>
                            <Remove />
                        </el-icon>{{ $t("tabs.closeCurrent") }}
                    </li>
                    <li @click="tabRemoveOthers(selectTab)">
                        <el-icon>
                            <CircleClose />
                        </el-icon>{{
                            $t("tabs.closeOther") }}
                    </li>
                    <hr>
                    <li @click="maximize(selectTab)">
                        <el-icon>
                            <FullScreen />
                        </el-icon>最大化
                    </li>
                </ul>
            </transition>

            <el-dropdown trigger="click" :teleported="false">
                <el-icon class="more-button">
                    <arrow-down />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            @click="refresh(sysViewTagsStore.list.find(item => item.path === route.path))">
                            <el-icon class="iconfont">
                                <Refresh />
                            </el-icon>
                            {{ $t("tabs.refresh") }}
                        </el-dropdown-item>
                        <el-dropdown-item
                            @click="tabCurrentTab(sysViewTagsStore.list.find(item => item.path === route.path))"
                            :disabled="route.path == appDashboard ? true : false">
                            <el-icon>
                                <Remove />
                            </el-icon>{{ $t("tabs.closeCurrent") }}
                        </el-dropdown-item>
                        <el-dropdown-item divided @click="tabRemoves('left')">
                            <el-icon>
                                <DArrowLeft />
                            </el-icon>{{ $t("tabs.closeLeft") }}
                        </el-dropdown-item>
                        <el-dropdown-item @click="tabRemoves('right')">
                            <el-icon>
                                <DArrowRight />
                            </el-icon>{{ $t("tabs.closeRight") }}
                        </el-dropdown-item>
                        <el-dropdown-item divided
                            @click="tabRemoveOthers(sysViewTagsStore.list.find(item => item.path === route.path))">
                            <el-icon>
                                <CircleClose />
                            </el-icon>{{ $t("tabs.closeOther") }}
                        </el-dropdown-item>
                        <el-dropdown-item @click="tabRemoveAll">
                            <el-icon>
                                <FolderDelete />
                            </el-icon>{{ $t("tabs.closeAll") }}
                        </el-dropdown-item>
                        <el-dropdown-item divided
                            @click="maximize(sysViewTagsStore.list.find(item => item.path === route.path))">
                            <el-icon>
                                <FullScreen />
                            </el-icon>{{ $t("tabs.maximize") }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, inject, nextTick } from 'vue';
import { onClickOutside } from "@vueuse/core";
import Sortable from 'sortablejs'
import { useRoute } from "vue-router";
import router from '@/router';
import type { TabsPaneContext } from 'element-plus'
import { useSysViewTagsStore } from "@/store/system/viewTags";
import { useSysKeepAliveStore } from "@/store/system/keepAlive";

const sysViewTagsStore = useSysViewTagsStore()
const sysKeepAliveStore = useSysKeepAliveStore()
const activeName = ref('')
const route = useRoute();
const appDashboard = import.meta.env.VITE_DASHBOARD_URL
const contextmenuRef = ref();
const contextMenuVisible = ref(false)
const left = ref(0)
const top = ref(0)
const selectTab = ref<Menu.MenuOptions>()

watch(route, (newValue) => {
    if (newValue) {
        activeName.value = newValue.name as string
    }
}, { immediate: true });

onMounted(() => {
    tabsDrop()
})

// tabs 拖拽排序
const tabsDrop = () => {
    Sortable.create(document.querySelector(".el-tabs__nav") as HTMLElement, {
        draggable: ".el-tabs__item",
        animation: 300,
        onEnd({ newIndex, oldIndex }) {
            if (oldIndex && newIndex) {
                const elementToMove = sysViewTagsStore.list.splice(oldIndex, 1)[0];
                sysViewTagsStore.list.splice(newIndex, 0, elementToMove);
            }
        }
    });
};

const tabClick = (tab: TabsPaneContext) => {
    if (activeName.value == tab.props.name) return
    const selectMenu = sysViewTagsStore.list.find(item => item.name === tab.props.name);
    router.push(selectMenu?.path as string)
}

const refreshCurrentPage: Function = inject("refresh") as Function;
const refresh = (tab?: Menu.MenuOptions) => {
    if (!tab) return
    contextMenuVisible.value = false;
    setTimeout(() => {
        if (tab.meta?.isKeepAlive) {
            sysKeepAliveStore.list = sysKeepAliveStore.list.filter(item => item !== tab.name);
        }
        if (tab.path != route.path) {
            router.push({ path: tab.path })
        }
        refreshCurrentPage(false);
        nextTick(() => {
            tab.meta?.isKeepAlive && sysKeepAliveStore.addKeepAliveName(tab.name);
            refreshCurrentPage(true);
        });
    }, 0);
};

const maximize = (tab?: Menu.MenuOptions) => {
    if (!tab) return
    if (tab.path != route.path) {
        router.push({ path: tab.path })
    }
    document.getElementById('app')?.classList.add('aminui', 'main-maximize')
};

const tabCurrentTab = (tab?: Menu.MenuOptions) => {
    if (!tab || tab.meta.isAffix) return
    tabRemove(tab.name as string);
};

const tabRemove = (targetName: string) => {
    contextMenuVisible.value = false;
    sysViewTagsStore.list.forEach((tab, index) => {
        if (tab.name === targetName) {
            if (targetName == activeName.value) {
                const nextTab = sysViewTagsStore.list[index + 1] || sysViewTagsStore.list[index - 1]
                router.push({ path: nextTab.path })
            }
        }
    })
    sysViewTagsStore.list = sysViewTagsStore.list.filter(item => item.name !== targetName);
    sysKeepAliveStore.removeKeepAliveName(targetName)
}

const tabRemoves = (type: "left" | "right") => {
    sysViewTagsStore.closeTabsOnSide(route.path, type)
    sysKeepAliveStore.removeKeepAliveNames(sysViewTagsStore.list)
}

const tabRemoveOthers = (tab?: Menu.MenuOptions) => {
    if (!tab) return
    contextMenuVisible.value = false;
    sysViewTagsStore.closeTabs(tab.path)
    sysKeepAliveStore.removeKeepAliveNames(sysViewTagsStore.list)
    if (tab.path != route.path) {
        router.push({ path: tab.path })
    }
}

const tabRemoveAll = () => {
    sysViewTagsStore.closeTabs()
    sysKeepAliveStore.removeKeepAliveNames(sysViewTagsStore.list)
    router.push({ path: appDashboard })
}

const openContextMenu = (e: MouseEvent, tab: Menu.MenuOptions) => {
    contextMenuVisible.value = false;
    if (!tab) return
    selectTab.value = tab
    left.value = e.clientX + 1;
    top.value = e.clientY + 1;
    contextMenuVisible.value = true;
    //FIX 右键菜单边缘化位置处理
    nextTick(() => {
        let sp = document.getElementById("contextmenu") as HTMLElement
        if (document.body.offsetWidth - e.clientX < sp.offsetWidth) {
            left.value = document.body.offsetWidth - sp.offsetWidth + 1;
            top.value = e.clientY + 1;
        }
    })
}

onClickOutside(contextmenuRef, () => { contextMenuVisible.value = false }, {
    detectIframe: true
});

</script>

<style scoped>
.adminui-tags .tabs-menu {
    position: relative;
    width: 100%;
}

.adminui-tags .tabs-menu .el-dropdown {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
}

.adminui-tags .tabs-menu .el-dropdown .more-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 43px;
    height: 35px;
    cursor: pointer;
    border-left: 1px solid var(--el-border-color-light);
    transition: all 0.3s;
}

.adminui-tags .tabs-menu .el-dropdown .more-button:hover {
    background-color: #e6f5f3;
}

.adminui-tags .tabs-menu :deep(.el-tabs) .el-tabs__header {
    box-sizing: border-box;
    margin: 0;
    height: 35px;
}

.adminui-tags .tabs-menu :deep(.el-tabs) .el-tabs__header .el-tabs__nav-wrap {
    position: absolute;
    width: calc(100% - 50px);
    height: 35px;
}

.adminui-tags .tabs-menu :deep(.el-tabs) .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-prev {
    height: 35px;
    line-height: 35px;
}

.adminui-tags .tabs-menu :deep(.el-tabs) .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-next {
    height: 35px;
    line-height: 35px;
}

.adminui-tags .tabs-menu :deep(.el-tabs) .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav {
    display: flex;
    border: none;
}

.adminui-tags .tabs-menu :deep(.el-tabs) .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav .el-tabs__item {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #afafaf;
    border: none;
    height: 35px;
    font-size: 13px;
}

.adminui-tags .tabs-menu :deep(.el-tabs) .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav .el-tabs__item.is-active {
    color: #fff;
    background-color: var(--el-color-primary) !important;
}

.contextmenu {
    position: fixed;
    margin: 0;
    border-radius: 0px;
    background: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color-light);
    box-shadow: 0 2px 13px 0 rgba(0, 0, 0, .1);
    z-index: 3000;
    list-style-type: none;
}

.contextmenu hr {
    border: none;
    height: 1px;
    font-size: 0px;
    background-color: var(--el-border-color-light);
}

.contextmenu li {
    display: flex;
    align-items: center;
    cursor: pointer;
    line-height: 30px;
    padding: 1px 17px;
    color: #606266;
}

.contextmenu li i {
    font-size: 14px;
    margin-right: 10px;
}

.contextmenu li:hover {
    background-color: #ecf5ff;
    color: #66b1ff;
}

.contextmenu li.disabled {
    cursor: not-allowed;
    color: #bbb;
    background: transparent;
}

.tags-tip {
    padding: 5px;
}

.tags-tip p {
    margin-bottom: 10px;
}

.dark .contextmenu li {
    color: var(--el-text-color-primary);
}
</style>