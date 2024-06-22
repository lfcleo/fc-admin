<!--
* @Description: 趋势标记
* @Version: 1.0.0
* @Author: Leo https://github.com/lfcleo
* @Date: 2024-05-25 11:08:02
* @LastEditTime: 2024-05-25 11:08:02
-->
<template>
    <span class="fc-trend" :class="'fc-trend--' + type">
        <el-icon v-if="iconType == 'P'" class="fc-trend-icon"><el-icon-top /></el-icon>
        <el-icon v-if="iconType == 'N'" class="fc-trend-icon"><el-icon-bottom /></el-icon>
        <el-icon v-if="iconType == 'Z'" class="fc-trend-icon"><el-icon-right /></el-icon>
        <em class="fc-trend-prefix">{{ prefix }}</em>
        <em class="fc-trend-value">{{ modelValue }}</em>
        <em class="fc-trend-suffix">{{ suffix }}</em>
    </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    modelValue: { type: Number, default: 0 },
    prefix: { type: String, default: '' },
    suffix: { type: String, default: '' },
    reverse: { type: Boolean, default: false }
});

const iconType = computed(() => {
    if (props.modelValue == 0) {
        return 'Z'
    } else if (props.modelValue < 0) {
        return 'N'
    } else if (props.modelValue > 0) {
        return 'P'
    }
});

const type = computed(() => {
    if (props.modelValue == 0) {
        return 'Z'
    } else if (props.modelValue < 0) {
        return props.reverse ? 'P' : 'N'
    } else if (props.modelValue > 0) {
        return props.reverse ? 'N' : 'P'
    }
});  
</script>

<style scoped>
.fc-trend {
    display: flex;
    align-items: center;
}

.fc-trend-icon {
    margin-right: 2px;
}

.fc-trend em {
    font-style: normal;
}

.fc-trend-prefix {
    margin-right: 2px;
}

.fc-trend-suffix {
    margin-left: 2px;
}

.fc-trend--P {
    color: #f56c6c;
}

.fc-trend--N {
    color: #67c23a;
}

.fc-trend--Z {
    color: #555;
}
</style>