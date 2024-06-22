<!--
* @Description: 密码强度检测
* @Version: 1.0.0
* @Author: Leo https://github.com/lfcleo
* @Date: 2024-05-25 11:08:02
* @LastEditTime: 2024-05-25 11:08:02
-->
<template>
    <div class="fc-password-strength">
        <div class="fc-password-strength-bar" :class="`fc-password-strength-level-${level}`"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ modelValue: string }>();

const level = ref(0);

const strength = (v: string) => {
    let _level = 0;
    const has_length = v.length >= 6;           //长度
    const has_number = /\d/.test(v);            //包含数字
    const has_lowercase = /[a-z]/.test(v);      //包含小写英文
    const has_uppercase = /[A-Z]/.test(v);      //包含大写英文
    const no_continuity = !/(\w)\1{2}/.test(v); //没有连续的字符3位
    const has_special = /[`~!@#$%^&*()_+<>?:"{},./;'[\]]/.test(v);      //包含特殊字符

    if (v.length <= 0) {
        _level = 0;
        level.value = _level;
        return;
    }
    if (!has_length) {
        _level = 1;
        level.value = _level;
        return;
    }
    if (has_number) _level += 1;
    if (has_lowercase) _level += 1;
    if (has_uppercase) _level += 1;
    if (no_continuity) _level += 1;
    if (has_special) _level += 1;
    level.value = _level;
};

watch(() => props.modelValue, (newValue) => {
    strength(newValue);
}, { immediate: true });

</script>


<style scoped>
.fc-password-strength {
    height: 5px;
    width: 100%;
    background: var(--el-color-info-light-5);
    border-radius: 5px;
    position: relative;
    margin: 10px 0;
}

.fc-password-strength:before {
    left: 20%;
}

.fc-password-strength:after {
    right: 20%;
}

.fc-password-strength:before,
.fc-password-strength:after {
    position: absolute;
    content: "";
    display: block;
    width: 20%;
    height: inherit;
    border: 5px solid var(--el-bg-color-overlay);
    border-top: 0;
    border-bottom: 0;
    z-index: 1;
    background-color: transparent;
    box-sizing: border-box;
}

.fc-password-strength-bar {
    position: absolute;
    height: inherit;
    width: 0%;
    border-radius: inherit;
    transition: width .5s ease-in-out, background .25s;
    background: transparent;
}

.fc-password-strength-level-1 {
    width: 20%;
    background-color: var(--el-color-error);
}

.fc-password-strength-level-2 {
    width: 40%;
    background-color: var(--el-color-error);
}

.fc-password-strength-level-3 {
    width: 60%;
    background-color: var(--el-color-warning);
}

.fc-password-strength-level-4 {
    width: 80%;
    background-color: var(--el-color-success);
}

.fc-password-strength-level-5 {
    width: 100%;
    background-color: var(--el-color-success);
}
</style>
