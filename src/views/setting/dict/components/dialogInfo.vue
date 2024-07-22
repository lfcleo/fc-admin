<template>
    <el-dialog v-model="dialogFormVisible" :title="formData.id ? '编辑详情' : '新建详情'" width="500" destroy-on-close
        @closed="dialogClosed">
        <el-form :model="formData" label-width="auto">
            <el-form-item label="标识" prop="code">
                <el-input v-model="formData.key" autocomplete="off" />
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="formData.name" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { ref, toRefs } from 'vue'
import { DictInfoModel } from "@/models/systemModel";

interface PropsModel {
    formData: DictInfoModel,
}

const props = defineProps<PropsModel>()
const dialogFormVisible = ref(false)
const { formData } = toRefs(props)

const emit = defineEmits(['dialogClosed']);
// 关闭dialog
const dialogClosed = () => {
    emit('dialogClosed')
}

// 暴露给父组件使用
defineExpose({ dialogFormVisible });
</script>

<style scoped></style>