<template>
    <el-container>
        <el-header>
            <div class="left-panel">
                <el-button v-role="['admin']" class="addBtn" type="primary" icon="Plus"
                    @click="addRoleClick">新增</el-button>
                <el-button type="danger" plain icon="Delete"
                    :disabled="fcTableRef?.selectedList.length == 0">删除</el-button>
            </div>
            <div class="right-panel">
                <el-input placeholder="搜索的角色名称" clearable></el-input>
                <el-button type="primary" icon="Search"></el-button>
            </div>
        </el-header>
        <el-main class="nopadding">
            <fc-table ref="fcTableRef" rowKey="name" :requestApi="getRoleListApi" :columns="columns">
                <template #options="scope">
                    <div v-if="scope.row.id != 1">
                        <el-button type="primary" icon="Edit" link @click="editClick(scope.row)">编辑信息</el-button>
                        <el-button type="primary" icon="Setting" link @click="editRoleClick(scope.row)">设置权限</el-button>
                        <el-popconfirm title="确定要删除吗?" @confirm="deleteClick(scope.row)">
                            <template #reference>
                                <el-button type="danger" link>删除</el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </template>
            </fc-table>
        </el-main>

        <!-- 弹出框 -->
        <el-dialog v-model="dialogFormVisible" :title="formData.id ? '编辑角色' : '新建角色'" width="500"
            @closed="dialogClosed">
            <el-form :model="formData" label-width="auto">
                <el-form-item label="标识" prop="code">
                    <el-input v-model="formData.code" autocomplete="off" />
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="formData.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="备注" prop="notes">
                    <el-input v-model="formData.notes" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
                </div>
            </template>
        </el-dialog>

        <!-- 抽屉视图 -->
        <el-drawer v-model="editViewVisible" :size="800" :with-header="false" destroy-on-close>
            <form-view :roleID="selectRoleID"></form-view>
        </el-drawer>
    </el-container>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { ColumnProps, FcTableInstance } from "@/components/fcTable/model"
import { getRoleListApi } from '@/api/modules/system';
import { RoleModel } from "@/models/systemModel";
import { ElMessage } from 'element-plus';
import FormView from "./components/form.vue"

const fcTableRef = ref<FcTableInstance>();  // fcTabel 实例
const dialogFormVisible = ref(false)
const editViewVisible = ref(false)
const selectRoleID = ref(0)

// 列表多选屏蔽id=1的数据，防止删除
const selectable = (row: RoleModel): boolean => {
    if (row.id == 1) return false
    return true
}

// 表格配置项
const columns = reactive<ColumnProps<RoleModel>[]>([
    { type: "selection", fixed: "left", width: 50, selectable: selectable },
    { prop: "id", label: "ID", align: "left", width: 100 },
    { prop: "code", label: "角色标识" },
    { prop: "name", label: "角色名称" },
    { prop: "notes", label: "备注" },
    { prop: "options", label: "操作", width: 280, fixed: "right" }
]);

const formData = ref<RoleModel>({
    id: 0,
    name: '',
    code: '',
    notes: ''
})

// 新增角色
const addRoleClick = () => {
    dialogFormVisible.value = true
}

// 编辑信息
const editClick = (row: RoleModel) => {
    formData.value = row
    dialogFormVisible.value = true
}

// 编辑权限
const editRoleClick = (row: RoleModel) => {
    selectRoleID.value = row.id
    editViewVisible.value = true
}

// 删除角色
const deleteClick = (row: RoleModel) => {
    ElMessage({
        type: "error",
        message: "点击了删除“" + row.name + "”数据"
    });
}

// 关闭dialog，重新赋值
const dialogClosed = () => {
    formData.value = {
        id: 0,
        name: '',
        code: '',
        notes: ''
    }
}

</script>

<style scoped></style>