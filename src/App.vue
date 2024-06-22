<template>
    <el-config-provider :locale="messages[locale]" :size="config.size" :zIndex="config.zIndex" :button="config.button">
        <router-view></router-view>
    </el-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import colorTool from '@/utils/color';
import { useI18n } from "vue-i18n";
import { useSysGlobalStore } from "@/store/system/global.js";
import DisableDevtool from 'disable-devtool';

const { locale, messages } = useI18n()
const sysGlobalStore = useSysGlobalStore()

const isAllowDebug = import.meta.env.VITE_BAN_DEBUG

// 响应式数据  
const config = ref({
    size: 'default',
    zIndex: 2000,
    button: {
        autoInsertSpace: false
    }
});

// 组件创建时执行  
onMounted(() => {
    // 设置主题颜色  
    const app_color = sysGlobalStore.sysColor
    if (app_color) {
        document.documentElement.style.setProperty('--el-color-primary', app_color);
        for (let i = 1; i <= 9; i++) {
            document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, colorTool.lighten(app_color, i / 10));
        }
        for (let i = 1; i <= 9; i++) {
            document.documentElement.style.setProperty(`--el-color-primary-dark-${i}`, colorTool.darken(app_color, i / 10));
        }
    }
    // 设置暗黑模式
    document.documentElement.classList[sysGlobalStore.sysDark ? 'add' : 'remove']('dark');
    // 是否禁止调试
    if (isAllowDebug == 'true') {
        DisableDevtool({
            url: 'about:blank',
            timeOutUrl: 'about:blank',
            disableMenu: false
        });
    }
});
</script>

<style lang="scss">
@import '@/style/style.scss';
</style>
