<template>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="0" size="large" @keyup.enter="login">
        <el-form-item prop="phone">
            <el-input v-model="form.phone" prefix-icon="Iphone" clearable :placeholder="$t('login.mobilePlaceholder')">
                <template #prepend>+86</template>
            </el-input>
        </el-form-item>
        <el-form-item prop="yzm" style="margin-bottom: 35px;">
            <div class="login-msg-yzm">
                <el-input v-model="form.yzm" prefix-icon="Unlock" clearable
                    :placeholder="$t('login.smsPlaceholder')"></el-input>
                <el-button @click="getYzm" :disabled="disabled">
                    {{ $t('login.smsGet') }}
                    <span v-if="disabled">({{ countDownNumber }})</span>
                </el-button>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width: 100%;" :loading="islogin" round @click="login">
                {{ $t('login.signIn') }}
            </el-button>
        </el-form-item>
        <div class="login-reg">
            {{ $t('login.noAccount') }} <router-link to="/user_register">{{ $t('login.createAccount') }}</router-link>
        </div>
    </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage, type FormInstance, FormRules } from 'element-plus'
import { useI18n } from "vue-i18n";

interface FormData {
    phone: string;
    yzm: string;
}

const { t } = useI18n()
// 定义响应式数据  
const form = reactive<FormData>({
    phone: '',
    yzm: '',
});

const rules = reactive<FormRules<FormData>>({
    phone: [
        { required: true, message: t('login.mobileError') }
    ],
    yzm: [
        { required: true, message: t('login.smsError') }
    ]
})

const disabled = ref(false);
const countDownNumber = ref(0);
const islogin = ref(false);
const loginForm = ref<FormInstance>()
// 定义定时器变量并初始化为null
let timer: number | null = null;

const getYzm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    // 验证表单  
    const validateResult = await formEl.validateField("phone")
    if (!validateResult) {
        return false;
    }

    ElMessage.success(t('login.smsSent'));

    disabled.value = true;
    countDownNumber.value = 60;
    timer = window.setInterval(() => {
        countDownNumber.value -= 1;
        if (countDownNumber.value < 1) {
            if (timer) {
                clearInterval(timer);
            }
            disabled.value = false;
            countDownNumber.value = 0;
        }
    }, 1000);
}

const login = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    // 验证表单 
    await formEl.validate((valid) => {
        if (!valid) return
    })
}
</script>

<style></style>
