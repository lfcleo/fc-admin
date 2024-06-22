<template>
    <div>
        <el-alert
            title="异步组件动态加载使用了正处于试验阶段的<Suspense>组件, 其API和使用方式可能会改变. https://cn.vuejs.org/guide/built-ins/suspense.html#suspense"
            type="warning" show-icon style="margin-bottom: 15px;" />

        <el-card shadow="never" header="个人信息">
            <el-form ref="form" :model="formValue" label-width="120px" style="margin-top:20px;">
                <el-form-item label="账号">
                    <el-input v-model="formValue.user" disabled></el-input>
                    <div class="el-form-item-msg">账号信息用于登录，系统不允许修改</div>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formValue.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="formValue.sex" placeholder="请选择">
                        <el-option label="保密" value="0"></el-option>
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="个性签名">
                    <el-input v-model="formValue.about" type="textarea"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const formValue = reactive({
    user: "administrator@fcadmin.com",
    name: "FC-Admin",
    sex: "0",
    about: "天黑路滑，社会复杂。"
})
</script>