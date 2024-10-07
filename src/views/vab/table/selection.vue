<template>
    <el-container>
        <el-header>
            <div class="left-panel">
                <el-button type="primary" @click="showSectionClick">查看选中的行数据（多选）</el-button>
                <el-button type="primary" @click="showSectionKeyClick">查看根据rowKey选中的行数据（多选）</el-button>
                <el-button type="primary" @click="isSelectClick">是否选中了数据（多选）</el-button>
            </div>
        </el-header>
        <el-main class="nopadding">
            <fc-table stripe ref="fcTableRef" rowKey="name" :requestApi="getTableList" :columns="columns">
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
import { ElMessage, ElMessageBox } from "element-plus";
import router from '@/router';

// 表格配置项
const columns = reactive<ColumnProps<TableListModel>[]>([
    { type: "selection", fixed: "left", width: 50 },
    { type: "index", label: "序号", width: 80 },
    { prop: "id", label: "ID", width: 100 },
    { prop: "name", label: "名称", width: 200 },
    { prop: "status", label: "状态", width: 200 },
    { prop: "created_at", label: "创建时间" },
    { prop: "options", label: "操作", fixed: "right", width: 280 },
]);
// fcTabel 实例
const fcTableRef = ref<FcTableInstance>();

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getTabelDataApi"
const getTableList = (params: any) => {
    let newParams = JSON.parse(JSON.stringify(params));
    return getTabelDataApi(newParams);
};

// 查看选中的行数据（多选）
const showSectionClick = () => {
    console.log(fcTableRef.value?.selectedList)
    ElMessageBox.confirm(`选中了${fcTableRef.value?.selectedList.length}条数据，在控制台查看。`, "选中的行数据（多选）").then(() => {
    }).catch(() => {
    })
}

// 查看选中的行数据（多选）
const showSectionKeyClick = () => {
    console.log(fcTableRef.value?.selectedListKeys)
    ElMessageBox.confirm(`选中了${fcTableRef.value?.selectedListKeys.length}条数据，在控制台查看。选中的数据根据rowKey值确定的。默认为id。`, "选中的行数据（多选）").then(() => {
    }).catch(() => {
    })
}

//是否选中了数据（多选）
const isSelectClick = () => {
    console.log(fcTableRef.value?.isSelected)
    let msg: string = fcTableRef.value?.isSelected ? '选中了数据' : '没有选中数据'
    ElMessage.success(msg);
}

// 查看选项
const showClick = (row: Partial<TableListModel> = {}) => {
    router.push(
        {
            path: `/vab/table/detail/${row.id}`,
            query: {
                name: row.name,
            }
        }
    );
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

<style scoped></style>