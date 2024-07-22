<template>
    <el-main>
        <el-card shadow="never">
            <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="表格" prop="list">
                    <fc-form-table stripe ref="ftRef" :data="form.list" :columns="columns"
                        :data-template="dataTemplate">
                        <template #time="scope">
                            <el-time-select v-model="scope.row.time"></el-time-select>
                        </template>
                        <template #type="scope">
                            <el-select v-model="scope.row.type" placeholder="请选择">
                                <el-option v-for="item in typeDic" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </template>
                        <template #val="scope">
                            <el-input v-model="scope.row.val" placeholder="请输入内容"></el-input>
                        </template>
                        <template #checked="scope">
                            <el-checkbox v-model="scope.row.checked"></el-checkbox>
                        </template>
                        <template #open="scope">
                            <el-switch v-model="scope.row.open"></el-switch>
                        </template>
                    </fc-form-table>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="never" header="方法" style="margin-top: 15px;">
            <el-button type="primary" @click="pushRow">外部插入行</el-button>
            <el-button type="primary" @click="deleteRow">外部删除第一行</el-button>
        </el-card>

        <el-dialog v-model="dialogVisible" title="提交的数据内容" width="500">
            <span>{{ form }}</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </el-main>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { FTColumnProps } from '@/components/fcFormTable/index.vue'
import FcFormTable from '@/components/fcFormTable/index.vue'
import type { FormInstance } from 'element-plus'

interface formModle {
    title: string;
    list: ftModel[];
}

interface ftModel {
    id: number | null;
    time: string;
    type: string;
    val: string;
    open: boolean;
    checked: boolean;
}

// 表单表格配置项
const columns = reactive<FTColumnProps<ftModel>[]>([
    { type: "sort", label: "", width: 80 },
    { prop: "id", label: "ID", width: 80 },
    { prop: "time", label: "时间", width: 180 },
    { prop: "type", label: "类型", width: 180 },
    { prop: "val", label: "数量" },
    { prop: "checked", label: "checked", width: 85 },
    { prop: "open", label: "开关", width: 80, },
]);

const dataTemplate = reactive<ftModel>({
    id: null,
    time: '',
    type: '',
    val: '',
    open: false,
    checked: false,
});

const form = reactive<formModle>({
    title: "标题",
    list: [
        {
            id: 3,
            time: '09:00',
            type: '1',
            val: '100',
            open: true,
            checked: true
        },
        {
            id: 4,
            time: '10:00',
            type: '0',
            val: '50',
            open: false,
            checked: true
        }
    ]
});

const typeDic = reactive([
    {
        label: "全局",
        value: "0"
    },
    {
        label: "局部",
        value: "1"
    }
]);

const rules = reactive({
    title: [
        { required: true, message: '请上传', trigger: 'blur' }
    ]
});
const ruleFormRef = ref<FormInstance>()                 //form实例
const ftRef = ref<InstanceType<typeof FcFormTable>>();  //fc-form-table实例
const dialogVisible = ref(false)

// 方法  
const submitForm = () => {
    dialogVisible.value = true
}

// 外部插入行
const pushRow = () => {
    // 使用这个也可以 ftRef.value?.tableData.push(dataTemplate)
    ftRef.value?.addRow(dataTemplate)
}

// 外部删除行
const deleteRow = () => {
    ftRef.value?.delRow(0)
}  
</script>

<style scoped></style>