<template>
    <el-card shadow="never" header="语言主题">
        <el-form ref="form" label-width="120px" style="margin-top:20px;">
            <el-form-item :label="$t('user.nightmode')">
                <el-switch v-model="sysGlobalStore.sysDark" inline-prompt active-icon="el-icon-moon"
                    inactive-icon="el-icon-sunny"></el-switch>
                <div class="el-form-item-msg">{{ $t('user.nightmode_msg') }}</div>
            </el-form-item>
            <el-form-item label="主题颜色">
                <el-color-picker v-model="sysGlobalStore.sysColor" :predefine="colorList">></el-color-picker>
            </el-form-item>
            <el-form-item :label="$t('user.language')">
                <el-select v-model="sysGlobalStore.sysLang">
                    <el-option label="简体中文" value="zh-cn"></el-option>
                    <el-option label="English" value="en"></el-option>
                </el-select>
                <div class="el-form-item-msg">{{ $t('user.language_msg') }}</div>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useSysGlobalStore } from "@/store/system/global.js";

const sysGlobalStore = useSysGlobalStore()
const colorList = reactive(['#409EFF', '#009688', '#536dfe', '#ff5c93', '#c62f2f', '#fd726d']);

</script>