<template>
    <el-container>
        <fc-tree-filter show-search :tree-props="treeProps" title="树形筛选器(单选)" :request-api="getDepartmentDataApi"
            :default-value="treeFilterValue.departmentId" @change="changeTreeFilter">
        </fc-tree-filter>

        <div style="width: 10px;"></div>

        <fc-tree-filter title="树形筛选器(多选)" multiple :border="true" :tree-props="treeProps"
            :request-api="getDepartmentDataApi" :default-value="treeFilterValue1.departmentId"
            @change="changeTreeFilter1">
        </fc-tree-filter>

        <div style="width: 10px;"></div>

        <fc-tree-filter ref="fcTreeFilterRef" show-search :tree-props="treeProps" title="树形筛选器(插槽)"
            :request-api="getDepartmentDataApi" :default-value="treeFilterValue2.departmentId"
            @change="changeTreeFilter2">
            <template #option="scope" class="custom-tree-node">
                <el-button-group>
                    <el-button type="success" icon="View" size="small" @click.stop="showClick(scope)" />
                    <el-button type="danger" icon="Delete" size="small" @click.stop="deleteClick(scope)" />
                </el-button-group>
            </template>
        </fc-tree-filter>

        <div style="width: 10px;"></div>

        <el-main style="background-color: #fff;">
            <div>查看数据使用：treeData</div>
            <div>查看全部数据使用：treeAllData</div>
            <div>使用el-tree的ref使用：treeRef</div>
            <div>动态数据重新获取数据：getData()</div>
            <div>父子不互相关联：checkStrictly（同官方check-strictly属性）</div>
            <div>数据加载状态：loading</div>
        </el-main>
    </el-container>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { ElMessage } from "element-plus";
import { getDepartmentDataApi } from '@/api/modules/table';
import FcTreeFilter from '@/components/fcTreeFilter/index.vue'

const treeProps = {
    label: 'name'   //指定显示字段为name
}

const treeFilterValue = reactive({ departmentId: "1" });
const changeTreeFilter = (val: string) => {
    ElMessage.success(`你选择了 id 为 ${val} 的数据`);
    treeFilterValue.departmentId = val;
};

const treeFilterValue1 = reactive({ departmentId: ["1", "11"] });
const changeTreeFilter1 = (val: string[]) => {
    ElMessage.success(`你选择了 id 为 ${JSON.stringify(val)} 的数据`);
    treeFilterValue1.departmentId = val;
};

const fcTreeFilterRef = ref<InstanceType<typeof FcTreeFilter>>()    // fcTreeFilter 实例
const treeFilterValue2 = reactive({ departmentId: "1" });
const changeTreeFilter2 = (val: string) => {
    ElMessage.success(`你选择了 id 为 ${val} 的数据`);
    treeFilterValue2.departmentId = val;
};
const showClick = (scope: any) => {
    ElMessage.success(`插槽按钮的数据id：${scope.row.data.id}`);
}
const deleteClick = (scope: any) => {
    if (scope.row.data.id == "0") {
        fcTreeFilterRef.value!.treeAllData = []
        return
    }
    const parent = scope.row.node.parent
    const children = parent.data.children || parent.data
    const index = children.findIndex((d: any) => d.id === scope.row.data.id)
    children.splice(index, 1)
    fcTreeFilterRef.value!.treeAllData = [...fcTreeFilterRef.value!.treeAllData]
}
</script>

<style scoped></style>