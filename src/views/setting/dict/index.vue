<template>
    <el-container>
        <el-aside>
            <el-container>
                <el-main class="nopadding">
                    <fc-tree-filter :tree-props="{ label: 'name' }" show-search :showAll="false"
                        :request-api="getDictListApi" :default-value="departmentId" @change="changeTreeFilter">
                        <template #option="scope">
                            <span class="custom-tree-node">
                                <span class="code">{{ scope.row.data.code }}</span>
                                <span class="do">
                                    <el-button-group>
                                        <el-button icon="Edit" size="small"
                                            @click.stop="dictCateClick(scope.row.data)"></el-button>
                                        <el-button icon="Delete" size="small"
                                            @click.stop="deleteCateClick(scope.row.data)"></el-button>
                                    </el-button-group>
                                </span>
                            </span>
                        </template>
                    </fc-tree-filter>
                </el-main>
                <el-footer>
                    <el-button type="primary" icon="Plus" style="width: 100%;" @click="dictCateClick()">字典分类</el-button>
                </el-footer>
            </el-container>
        </el-aside>
        <el-container>
            <el-header>
                <div class="left-panel">
                    <el-button class="addBtn" type="primary" icon="Plus" @click="infoClick()">新增</el-button>
                    <el-button type="danger" plain icon="Delete"
                        :disabled="fcTableRef?.selectedList.length == 0">删除</el-button>
                </div>
            </el-header>
            <el-main class="nopadding">
                <fc-table ref="fcTableRef" :indent="20" :requestApi="getDictInfoApi" :columns="columns">
                    <!-- 表格操作 -->
                    <template #options="scope">
                        <el-button type="primary" icon="Edit" link @click="infoClick(scope.row)">编辑</el-button>
                        <el-popconfirm title="确定要删除吗?" @confirm="deleteInfoClick(scope.row)">
                            <template #reference>
                                <el-button type="danger" link>删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </fc-table>
            </el-main>
        </el-container>
        <!-- 新建/编辑字典分类弹窗 -->
        <dialog-cate ref="dialogCate" :formData="selectCateModel" @dialogClosed="cateDialogClosed"></dialog-cate>
        <!-- 新建/编辑字典详情弹窗 -->
        <dialog-info ref="dialogInfo" :formData="selectInfoModel" @dialogClosed="infoDialogClosed"></dialog-info>
    </el-container>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { ElMessage } from "element-plus";
import { getDictListApi, getDictInfoApi } from '@/api/modules/system';
import { DictCateModel, DictInfoModel } from "@/models/systemModel";
import { ColumnProps, FcTableInstance } from "@/components/fcTable/model"
import DialogCate from "./components/dialogCate.vue"
import DialogInfo from "./components/dialogInfo.vue"

const departmentId = ref(1);        //fcTreeFilter默认选中
const changeTreeFilter = (val: number) => {
    ElMessage.success(`你选择了 id 为 ${val} 的数据`);
    departmentId.value = val;
};

//table表格配置
const columns = reactive<ColumnProps<DictInfoModel>[]>([
    { type: "selection", fixed: "left", width: 50 },
    { prop: "id", label: "ID", width: 80 },
    { prop: "name", label: "名称" },
    { prop: "key", label: "键值" },
    { prop: "options", label: "操作", width: 280, fixed: "right" }
]);
const fcTableRef = ref<FcTableInstance>();  // fcTabel 实例
// 选中的字典分类/新建字典分类
const selectCateModel = ref<DictCateModel>({
    id: 0,
    name: '',
    code: '',
})
// 选中的字典详情/新建字典详情
const selectInfoModel = ref<DictInfoModel>({
    id: 0,
    name: '',
    key: '',
})
const dialogCate = ref<InstanceType<typeof DialogCate>>();      //新建/编辑字典分类弹窗实例
const dialogInfo = ref<InstanceType<typeof DialogCate>>();      //新建/编辑字典详情弹窗实例

// 编辑字典分类
const dictCateClick = (row?: DictCateModel) => {
    selectCateModel.value = row || JSON.parse(JSON.stringify(selectCateModel.value))
    dialogCate.value!.dialogFormVisible = true
}

// 删除字典分类
const deleteCateClick = (row: DictCateModel) => {
    ElMessage.error(`删除 id 为 ${row.id} 的字典分类数据`);
}

// 新建/编辑字典分类弹窗关闭，初始化数据
const cateDialogClosed = () => {
    selectCateModel.value = {
        id: 0,
        name: '',
        code: '',
    }
}

// 编辑字典详情
const infoClick = (row?: DictInfoModel) => {
    selectInfoModel.value = row || JSON.parse(JSON.stringify(selectInfoModel.value))
    dialogInfo.value!.dialogFormVisible = true
}

// 删除字典详情
const deleteInfoClick = (row: DictInfoModel) => {
    ElMessage.error(`删除 id 为 ${row.id} 的字典详情数据`);
}

// 新建/编辑字典详情弹窗关闭，初始化数据
const infoDialogClosed = () => {
    selectCateModel.value = {
        id: 0,
        name: '',
        code: '',
    }
}
</script>

<style scoped>
.type {
    font-size: 12px;
    color: #999;
}

.custom-tree-node .code {
    font-size: 12px;
    color: #999;
}

.custom-tree-node .do {
    display: none;
}

.custom-tree-node:hover .code {
    display: none;
}

.custom-tree-node:hover .do {
    display: inline-block;
}
</style>