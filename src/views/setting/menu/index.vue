<template>
    <el-container>
        <el-header>
            <el-button class="addBtn" type="primary" icon="Plus" @click="addMenuClick()">新增</el-button>
            <el-alert title="使用fcTable展示了动态路由菜单，配置和关于是静态路由没有展示。" type="success"></el-alert>
        </el-header>
        <el-main class="nopadding">
            <fc-table ref="fcTableRef" rowKey="name" :indent="20" :requestApi="getMenuListApi" :columns="columns">
                <!-- 菜单标题 -->
                <template #meta.title="scope">
                    <span>{{ scope.row.meta.title }}</span>
                    <span v-if="scope.row.meta?.tag" class="menu-tag">{{ scope.row.meta.tag }}</span>
                </template>
                <!-- 菜单图标 -->
                <template #meta.icon="scope">
                    <el-icon :size="18">
                        <component :is="scope.row.meta.icon"></component>
                    </el-icon>
                </template>
                <!-- 表格操作 -->
                <template #options="scope">
                    <el-button type="primary" icon="Plus" link @click="addMenuClick()">添加子菜单</el-button>
                    <el-button type="primary" icon="Edit" link @click="editClick(scope.row)">编辑</el-button>
                    <el-popconfirm title="确定要删除吗?" @confirm="deleteClick(scope.row)">
                        <template #reference>
                            <el-button type="danger" link>删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </fc-table>
        </el-main>

        <el-drawer v-model="addViewVisible" :size="1400" :with-header="false" destroy-on-close>
            <form-view :parentMenu="[{ title: '根路由', id: 0 }]" :menu-model="selectMenu!"
                @submit="() => { addViewVisible = false }" @cancel="() => { addViewVisible = false }"></form-view>
        </el-drawer>
    </el-container>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { ColumnProps } from "@/components/fcTable/model"
import { getMenuListApi } from '@/api/modules/system';
import { ElMessage } from 'element-plus';
import FormView from "./components/form.vue"

// 表格配置项
const columns = reactive<ColumnProps<Menu.MenuOptions>[]>([
    { prop: "meta.title", label: "菜单标题", align: "left" },
    { prop: "meta.icon", label: "菜单图标" },
    { prop: "name", label: "菜单名称" },
    { prop: "path", label: "菜单路径", width: 300 },
    { prop: "component", label: "组件路径", width: 300 },
    { prop: "options", label: "操作", width: 280, fixed: "right" }
]);

const addViewVisible = ref(false)
const selectMenu = ref<Menu.MenuOptions>()
const initMenu = ref<Menu.MenuOptions>({
    path: '',
    name: '',
    redirect: '',
    component: '',
    meta: {
        icon: '',
        title: '',
        active: '',
        type: 'MENU',
        isHide: false,
        isFull: false,
        isAffix: false,
        isKeepAlive: false,
        role: [],
        tag: ''
    }
})

// 新增菜单
const addMenuClick = () => {
    selectMenu.value = JSON.parse(JSON.stringify(initMenu.value))
    addViewVisible.value = true
}

// 编辑
const editClick = (row: Menu.MenuOptions) => {
    selectMenu.value = row
    addViewVisible.value = true
}

// 删除
const deleteClick = (row: Partial<Menu.MenuOptions> = {}) => {
    ElMessage({
        type: "error",
        message: "点击了删除“" + row.meta?.title + "”数据"
    });
}

</script>

<style scoped>
.addBtn {
    margin-right: 20px;
}
</style>