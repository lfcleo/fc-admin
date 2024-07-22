<template>
    <el-container>
        <el-header>
            <div class="left-panel">
                <el-button class="addBtn" type="primary" icon="Plus" @click="addApiClick">新增</el-button>
                <el-button type="danger" plain icon="Delete"
                    :disabled="fcTableRef?.selectedList.length == 0">删除</el-button>
            </div>
            <div class="right-panel">
                <el-input placeholder="搜索的标识" clearable></el-input>
                <el-button type="primary" icon="Search"></el-button>
            </div>
        </el-header>
        <el-main class="nopadding">
            <fc-table ref="fcTableRef" :indent="20" :requestApi="getApiListApi" :columns="columns">
                <!-- 表格操作 -->
                <template #options="scope">
                    <el-button type="primary" icon="Edit" link @click="editClick(scope.row)">编辑</el-button>
                    <el-popconfirm title="确定要删除吗?" @confirm="deleteClick(scope.row)">
                        <template #reference>
                            <el-button type="danger" link>删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </fc-table>
        </el-main>

        <el-dialog v-model="dialogFormVisible" :title="formData.id ? '编辑接口' : '新建接口'" width="500"
            @closed="dialogClosed">
            <el-form :model="formData">
                <el-form-item label="标识名称" prop="name">
                    <el-input v-model="formData.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="请求路径" prop="path">
                    <el-input v-model="formData.path" autocomplete="off" />
                </el-form-item>
                <el-form-item label="请求方式" prop="method">
                    <el-select v-model="formData.method" placeholder="选择一种请求方式">
                        <el-option label="GET" value="GET" />
                        <el-option label="POST" value="POST" />
                        <el-option label="PUT" value="PUT" />
                        <el-option label="DELETE" value="DELETE" />
                    </el-select>
                </el-form-item>
                <el-form-item label="接口描述" prop="description">
                    <el-input v-model="formData.description" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </el-container>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { getApiListApi } from '@/api/modules/system';
import { ColumnProps, FcTableInstance } from "@/components/fcTable/model"
import { ApiModel } from "@/models/systemModel";
import { ElMessage } from 'element-plus';

const columns = reactive<ColumnProps<ApiModel>[]>([
    { type: "selection", fixed: "left", width: 50 },
    { prop: "id", label: "ID", width: 80 },
    { prop: "name", label: "标识", width: 300 },
    { prop: "path", label: "请求路径", width: 300 },
    { prop: "method", label: "请求方式", width: 300 },
    { prop: "description", label: "描述" },
    { prop: "options", label: "操作", width: 280, fixed: "right" }
]);
const fcTableRef = ref<FcTableInstance>();  // fcTabel 实例
const dialogFormVisible = ref(false)
const formData = ref<ApiModel>({
    id: 0,
    name: '',
    path: '',
    method: '',
    description: '',
})

const addApiClick = () => {
    dialogFormVisible.value = true
}

const editClick = (row: ApiModel) => {
    formData.value = row
    dialogFormVisible.value = true
}

const dialogClosed = () => {
    formData.value = {
        id: 0,
        name: '',
        path: '',
        method: '',
        description: '',
    }
}

// 删除
const deleteClick = (row: ApiModel) => {
    ElMessage({
        type: "error",
        message: "点击了删除“" + row.name + "”数据"
    });
}

</script>

<style scoped></style>