<template>
    <el-container class="page-user">
        <el-aside style="width: 240px;">
            <el-container>
                <el-header style="height: auto;display: block;padding-top: 20px;">
                    <div class="user-info-top">
                        <el-avatar :size="70" src="/img/avatar.jpg"></el-avatar>
                        <h2>{{ authStore.userInfo.userName }}</h2>
                        <p>
                            <el-tag effect="dark" round size="large" disable-transitions>超级管理员</el-tag>
                        </p>
                    </div>
                </el-header>
                <el-main class="nopadding">
                    <el-menu class="menu" :default-active="selectTitle">
                        <el-menu-item-group v-for="group in menu" :key="group.groupName" :title="group.groupName">
                            <el-menu-item v-for="item in group.list" :key="item.title" :index="item.title"
                                @click="openPage(item)">
                                <el-icon v-if="item.icon">
                                    <component :is="item.icon" />
                                </el-icon>
                                <template #title>
                                    <span>{{ item.title }}</span>
                                </template>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-menu>
                </el-main>
            </el-container>
        </el-aside>
        <el-main>
            <Suspense>
                <template #default>
                    <component :is="selectComponent" />
                </template>
                <template #fallback>
                    <el-skeleton :rows="3" />
                </template>
            </Suspense>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { DefineComponent, defineAsyncComponent, ref, markRaw } from 'vue'
import { useAuthStore } from "@/store/modules/auth";

const authStore = useAuthStore()

const account = defineAsyncComponent(() => import('./components/account.vue'))
const setting = defineAsyncComponent(() => import('./components/setting.vue'))
const pushSettings = defineAsyncComponent(() => import('./components/pushSettings.vue'))
const password = defineAsyncComponent(() => import('./components/password.vue'))
const space = defineAsyncComponent(() => import('./components/space.vue'))
const logs = defineAsyncComponent(() => import('./components/logs.vue'))
const upToEnterprise = defineAsyncComponent(() => import('./components/upToEnterprise.vue'))

const selectTitle = ref("账号信息")
const selectComponent = ref<DefineComponent>(markRaw(account) as DefineComponent)

interface MenuModel {
    groupName: string;
    list: ListModel[];
}

interface ListModel {
    icon: string;
    title: string;
    component: DefineComponent;
}

const menu = [
    {
        groupName: "基本设置",
        list: [
            {
                icon: "Postcard",
                title: "账号信息",
                component: account
            },
            {
                icon: "Operation",
                title: "个人设置",
                component: setting
            },
            {
                icon: "Lock",
                title: "密码",
                component: password
            },
            {
                icon: "Bell",
                title: "通知设置",
                component: pushSettings
            }
        ]
    },
    {
        groupName: "数据管理",
        list: [
            {
                icon: "Coin",
                title: "存储空间信息",
                component: space
            },
            {
                icon: "Clock",
                title: "操作日志",
                component: logs
            }
        ]
    },
    {
        groupName: "账号升级",
        list: [
            {
                icon: "OfficeBuilding",
                title: "升级为企业账号",
                component: upToEnterprise
            }
        ]
    }
] as MenuModel[]

const openPage = (item: ListModel) => {
    selectTitle.value = item.title
    selectComponent.value = markRaw(item.component)
}
</script>