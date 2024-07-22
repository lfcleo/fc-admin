<template>
    <el-container>
        <el-header>
            <div class="demo-form-inline">
                <fc-query :formItems="formItems" @search="handleSearch" @enterKey="handleSearch"
                    @reset="handleReset"></fc-query>
            </div>
        </el-header>
        <el-main class="nopadding">
            <fc-table ref="fcTableRef" rowKey="name" :initParam="requestParam" :requestApi="getTableList"
                :columns="columns">
                <template #status="scope">
                    <el-switch v-model="scope.row.status" />
                </template>
                <template #created_at="scope">
                    <!-- 使用了自定义指令，时间转为年月日时分 -->
                    <div v-timeYMDHM="scope.row.created_at"></div>
                </template>
                <!-- 表格操作 -->
                <template #options="scope">
                    <el-button type="success" plain @click="showClick(scope.row)">查看</el-button>
                    <el-button type="primary" plain @click="showClick(scope.row)">编辑</el-button>
                    <el-button type="danger" plain @click="deleteClick(scope.row)">删除</el-button>
                </template>
            </fc-table>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ColumnProps, FcTableInstance } from "@/components/fcTable/model"
import { TableListModel } from "@/models/tableModel"
import { getTabelDataApi } from '@/api/modules/table';
import { ElMessageBox } from "element-plus";

// 查询器配置
const formItems = ref<any>([
    {
        type: 'select',
        label: '类型',
        field: 'hobby',
        options: [
            {
                value: '1',
                label: '爱好',
            }
        ]
    }
])
// 表格配置项
const columns = reactive<ColumnProps<TableListModel>[]>([
    { type: "selection", fixed: "left", width: 70 },
    { prop: "id", label: "ID", width: 100 },
    { prop: "name", label: "名称", width: 180 },
    { prop: "status", label: "状态", width: 280 },
    { prop: "created_at", label: "创建时间" },
    { prop: "options", label: "操作", fixed: "right", width: 280 },
]);
// fcTabel 实例
const fcTableRef = ref<FcTableInstance>();
// 如果表格需要初始化请求参数，直接定义传给 fcTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const requestParam = reactive({
    "test": 0
})

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getTabelDataApi"
const getTableList = (params: any) => {
    let newParams = JSON.parse(JSON.stringify(params));
    return getTabelDataApi(newParams);
};

// 查询
const handleSearch = (formData: any) => {
    fcTableRef.value!.searchParam = formData
    fcTableRef.value!.search()
}
// 初始化状态
const handleReset = () => {
    fcTableRef.value?.reset()
}

const showClick = (row: Partial<TableListModel> = {}) => {
    console.log(row)
    ElMessageBox.confirm(`用户ID=${row.id}。。。等，控制台查看。`, "数据信息", { type: "warning" }).then(() => {
    }).catch(() => {
    })
}

// 删除选项
const deleteClick = (row: Partial<TableListModel> = {}) => {
    for (let i = 0; i < fcTableRef.value!.tableData.length; i++) {
        if (fcTableRef.value!.tableData[i].id === row.id) {
            // 使用 splice 方法从数组中删除对象  
            fcTableRef.value!.tableData.splice(i, 1);
            // 找到后退出循环
            break;
        }
    }
}

</script>

<style scoped>
.demo-form-inline {
    margin-top: 18px;
    width: 100%;
}

.demo-form-inline .el-select {
    --el-select-width: 180px;
}
</style>