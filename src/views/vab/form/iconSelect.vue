<template>
    <el-main>
        <el-alert title="支持扩展的图标选择器,除了默认的图标组还可以在 @/components/fcIconSelect/config.ts 中定义更多的图标组" type="success"
            style="margin-bottom:20px;"></el-alert>
        <el-card shadow="never">
            <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="图标" prop="icon">
                    <fc-icon-select v-model="form.icon" :disabled="disabled"></fc-icon-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="save(ruleFormRef)">保存</el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                    <el-button @click="setdisabled">{{ disabled ? '移除禁用' : '设为禁用' }}</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-main>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { ElMessage, type FormInstance, FormRules } from 'element-plus'

interface FormData {
    icon: string;
}

const form = reactive<FormData>({
    icon: '',
});

const ruleFormRef = ref<FormInstance>()

const disabled = ref(false)
const rules = reactive<FormRules<FormData>>({
    icon: [
        { required: true, message: '请选择图标', trigger: 'change' }
    ]
})

const save = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (!valid) return
        ElMessage.success("请看控制台输出");
        console.log(form);
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const setdisabled = () => {
    disabled.value = !disabled.value
}

</script>

<style scoped></style>