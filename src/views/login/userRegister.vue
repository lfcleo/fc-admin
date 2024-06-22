<template>
    <common-page title="注册新账号">
        <el-steps :active="stepActive" simple finish-status="success">
            <el-step title="基础信息" />
            <el-step title="详细信息" />
            <el-step title="完成注册" />
        </el-steps>
        <el-form v-if="stepActive == 0" ref="stepForm_0" :model="form" :rules="rules" :label-width="120">
            <el-form-item label="登录账号" prop="user">
                <el-input v-model="form.user" placeholder="请输入登录账号"></el-input>
                <div class="el-form-item-msg">登录账号将作为登录时的唯一凭证</div>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
                <el-input v-model="form.password" type="password" show-password placeholder="请输入登录密码"></el-input>
                <fc-password-strength v-model="form.password"></fc-password-strength>
                <div class="el-form-item-msg">请输入包含英文、数字的8位以上密码</div>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
                <el-input v-model="form.password2" type="password" show-password placeholder="请再一次输入登录密码"></el-input>
            </el-form-item>
            <el-form-item label="" prop="agree">
                <el-checkbox v-model="form.agree" label="">已阅读并同意</el-checkbox><span class="link"
                    @click="showAgree = true">《平台服务协议》</span>
            </el-form-item>
        </el-form>
        <el-form v-if="stepActive == 1" ref="stepForm_1" :model="form" :rules="rules" :label-width="120">
            <el-form-item label="真实姓名" prop="userName">
                <el-input v-model="form.userName" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
            <el-form-item label="账号类型" prop="userType">
                <el-radio-group v-model="form.userType">
                    <el-radio-button value="1">个人开发者</el-radio-button>
                    <el-radio-button value="2">企业开发者</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="开通类别" prop="open">
                <el-checkbox-group v-model="form.open">
                    <el-checkbox value="1">云存储API</el-checkbox>
                    <el-checkbox value="2">云检索API</el-checkbox>
                    <el-checkbox value="3">Javescript API</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <div v-if="stepActive == 2">
            <el-result icon="success" title="注册成功" sub-title="可以使用登录账号以及手机号登录系统">
                <template #extra>
                    <el-button type="primary" @click="goLogin">前去登录</el-button>
                </template>
            </el-result>
        </div>
        <el-form style="text-align: center;">
            <el-button v-if="stepActive > 0 && stepActive < 2" @click="pre">上一步</el-button>
            <el-button v-if="stepActive < 1" type="primary" @click="next(stepForm_0)">下一步</el-button>
            <el-button v-if="stepActive == 1" type="primary" @click="save(stepForm_1)">提交</el-button>
        </el-form>
        <el-dialog v-model="showAgree" title="平台服务协议" :width="800" destroy-on-close>
            平台服务协议
            <template #footer>
                <el-button @click="showAgree = false">取消</el-button>
                <el-button type="primary" @click="showAgree = false; form.agree = true;">我已阅读并同意</el-button>
            </template>
        </el-dialog>
    </common-page>
</template>

<script setup lang="ts">
import commonPage from './components/commonPage.vue'
import { type FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue';
import router from '@/router'

// 定义表单数据类型
interface FormData {
    user: string;
    password: string;
    password2: string;
    agree: boolean;
    userName: string;
    email: string;
    userType: string;
    open: string[]; // 假设open是一个字符串数组，根据实际类型调整
}

const stepActive = ref(0)
const showAgree = ref(false)
const form = reactive<FormData>({
    user: "",
    password: "",
    password2: "",
    agree: false,
    userName: "",
    email: "",
    userType: "1",
    open: []
})
const rules = reactive<FormRules<FormData>>({
    user: [
        { required: true, message: '请输入账号名' }
    ],
    password: [
        { required: true, message: '请输入密码' }
    ],
    password2: [
        { required: true, message: '请再次输入密码' },
        {
            validator: (_rule, value, callback) => {
                if (value !== form.password) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            }
        }
    ],
    agree: [
        {
            validator: (_rule, value, callback) => {
                if (!value) {
                    callback(new Error('请阅读并同意协议'));
                } else {
                    callback();
                }
            }
        }
    ],
    userName: [
        { required: true, message: '请输入真实姓名' }
    ],
    email: [
        { required: true, message: '请输入邮箱地址' }
    ],
    userType: [
        { required: true, message: '请选择账户类型' }
    ],
    open: [
        { required: true, message: '请选择开通类别' }
    ]
})

const stepForm_0 = ref<FormInstance>()
const stepForm_1 = ref<FormInstance>()

const pre = () => {
    stepActive.value -= 1
}

const next = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    // 验证表单  
    await formEl.validate((valid) => {
        if (!valid) return
        stepActive.value += 1

    })
}
const save = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    // 验证表单  
    await formEl.validate((valid) => {
        if (!valid) return
        stepActive.value += 1

    })
}
const goLogin = () => {
    router.replace({
        path: '/login'
    })
}
</script>

<style scoped></style>
