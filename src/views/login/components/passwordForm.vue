<template>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="0" size="large" @keyup.enter="login">
        <el-form-item prop="user">
            <el-input v-model="form.user" prefix-icon="User" clearable :placeholder="$t('login.userPlaceholder')">
                <template #append>
                    <el-select v-model="userType" style="width: 130px;">
                        <el-option :label="$t('login.admin')" value="admin"></el-option>
                        <el-option :label="$t('login.user')" value="user"></el-option>
                    </el-select>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="form.password" prefix-icon="Lock" clearable show-password
                :placeholder="$t('login.PWPlaceholder')"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 10px;">
            <el-col :span="12">
                <el-checkbox :label="$t('login.rememberMe')" v-model="form.autologin"></el-checkbox>
            </el-col>
            <el-col :span="12" class="login-forgot">
                <router-link to="/reset_password">{{ $t('login.forgetPassword') }}？</router-link>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width: 100%;" :loading="islogin" round @click="login(loginForm)">
                {{ $t('login.signIn') }}
            </el-button>
        </el-form-item>
        <div class="login-reg">
            {{ $t('login.noAccount') }}
            <router-link to="/user_register">{{ $t('login.createAccount') }}</router-link>
        </div>
    </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { ElMessage, type FormInstance, FormRules } from 'element-plus'
import { useI18n } from "vue-i18n";
import router from '@/router'
import encryptionTool from '@/utils/encryption'
import { loginApi, getMenuApi } from '@/api/modules/auth'
import { useAuthStore } from "@/store/modules/auth";
import { useMenuStore } from "@/store/modules/menu";

interface FormData {
    user: string;
    password: string;
    autologin: boolean;
}

const { t } = useI18n()
const authStore = useAuthStore()
const menuStore = useMenuStore()
const userType = ref('admin');
const islogin = ref(false);
const form = reactive<FormData>({
    user: 'admin',
    password: '123456',
    autologin: false
});

const rules = reactive<FormRules<FormData>>({
    user: [
        { required: true, message: t('login.userError'), trigger: 'blur' }
    ],
    password: [
        { required: true, message: t('login.PWError'), trigger: 'blur' }
    ]
})
const loginForm = ref<FormInstance>()

// 使用 watch 函数来观察 userType 的变化  
watch(userType, (newVal) => {
    if (newVal === 'admin') {
        form.user = 'admin';
        form.password = 'admin';
    } else if (newVal === 'user') {
        form.user = 'user';
        form.password = 'user';
    }
});

const login = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    // 验证表单 
    await formEl.validate(async (valid) => {
        if (!valid) return
        islogin.value = true;
        // 准备请求数据  
        const data = {
            username: form.user,
            password: encryptionTool.MD5(form.password)
        };

        try {
            // 获取 token  
            const authData = await loginApi(data);
            authStore.token = authData.data.token
            authStore.userInfo = authData.data.userInfo

            // 获取菜单  
            let menuData = await getMenuApi();
            if (menuData.data.menu.length === 0) {
                islogin.value = false;
                alert("当前用户无任何菜单权限，请联系系统管理员")
                return
            }
            menuStore.list = menuData.data.menu
            menuStore.permissions = menuData.data.permissions

            router.replace({ path: '/' });
            ElMessage.success("Login Success 登录成功");
            islogin.value = false;
        } catch (error) {
            islogin.value = false;
        }
    })
}
</script>

<style></style>
