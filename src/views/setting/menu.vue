<template>
    <el-container>
        <el-header>
            <el-alert title="使用fcTable展示了动态路由菜单，配置和关于是静态路由没有展示。" type="success"></el-alert>
        </el-header>
        <el-main class="nopadding">
            <fc-table ref="fcTableRef" rowKey="name" :indent="20" :requestApi="getMenuListApi" :columns="columns">
                <!-- 菜单图标 -->
                <template #meta.icon="scope">
                    <el-icon :size="18">
                        <component :is="scope.row.meta.icon"></component>
                    </el-icon>
                </template>
            </fc-table>
        </el-main>
    </el-container>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
import { ColumnProps } from "@/components/fcTable/model"
import { getMenuListApi } from '@/api/modules/auth';

// 表格配置项
const columns = reactive<ColumnProps<Menu.MenuOptions>[]>([
    { prop: "meta.title", label: "菜单名称", align: "left" },
    { prop: "meta.icon", label: "菜单图标" },
    { prop: "name", label: "菜单 name" },
    { prop: "path", label: "菜单路径", width: 300 },
    { prop: "component", label: "组件路径", width: 300 },
    { prop: "operation", label: "操作", width: 250, fixed: "right" }
]);
</script>

<style scoped></style>