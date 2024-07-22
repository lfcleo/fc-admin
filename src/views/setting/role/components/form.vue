<template>
    <el-container>
        <el-main class="nopadding">
            <el-tabs v-model="activeName">
                <el-tab-pane class="pane" label="菜单列表" name="one">
                    <fc-tree-filter :border="true" ref="fcTFMenuRef" multiple :request-api="getMenuList1Api"
                        :default-value="treeFilterValue1.departmentId" @change="changeTreeFilter1">
                        <template #default="scope">
                            <span>{{ scope.row.data.meta.title }}</span>
                        </template>
                        <template #option="scope">
                            <div>{{ scope.row.data.name }}</div>
                        </template>
                    </fc-tree-filter>
                </el-tab-pane>
                <el-tab-pane label="API权限" name="two">
                    <fc-table ref="fcTableRef" :indent="20" :requestApi="getApiList1Api" :columns="columns"
                        :pagination="false">
                    </fc-table>
                </el-tab-pane>
            </el-tabs>
        </el-main>
        <el-footer style="text-align: center;">
            <el-button v-role="['admin']" class="addBtn" type="primary">提 交</el-button>
        </el-footer>
    </el-container>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import FcTreeFilter from '@/components/fcTreeFilter/index.vue'
import { getMenuList1Api, getApiList1Api } from '@/api/modules/system';
import { ColumnProps, FcTableInstance } from "@/components/fcTable/model"
import { ApiModel } from "@/models/systemModel";

interface PropsModel {
    roleID: number,
}

defineProps<PropsModel>();

const activeName = ref('one')

// 表格配置项
const columns = reactive<ColumnProps<ApiModel>[]>([
    { type: "selection", fixed: "left", width: 50 },
    { prop: "description", label: "接口描述" },
    { prop: "name", label: "接口标识" }
]);
const fcTFMenuRef = ref<InstanceType<typeof FcTreeFilter>>()    // fcTreeFilter 实例
const fcTableRef = ref<FcTableInstance>();                      // fcTabel 实例


const treeFilterValue1 = reactive({ departmentId: ["首页"] });
const changeTreeFilter1 = (val: string[]) => {
    treeFilterValue1.departmentId = val;
};


</script>

<style scoped>
/* .el-tabs--card {
    height: calc(100vh - 155px);
} */

.el-tab-pane {
    height: calc(100vh - 155px);
}
</style>