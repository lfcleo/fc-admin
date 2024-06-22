<!--
* @Description: 统计数值
* @Version: 1.0.0
* @Author: Leo https://github.com/lfcleo
* @Date: 2024-05-25 11:08:02
* @LastEditTime: 2024-05-25 11:08:02
-->
<template>
    <div class="fc-statistic">
        <div class="fc-statistic-title">
            {{ title }}
            <el-tooltip v-if="tips" effect="light">
                <template #content>
                    <div style="width: 200px;line-height: 2;">
                        {{ tips }}
                    </div>
                </template>
                <el-icon class="fc-statistic-tips"><el-icon-question-filled /></el-icon>
            </el-tooltip>
        </div>
        <div class="fc-statistic-content">
            <span v-if="prefix" class="fc-statistic-content-prefix">{{ prefix }}</span>
            <span class="fc-statistic-content-value">{{ cmtValue }}</span>
            <span v-if="suffix" class="fc-statistic-content-suffix">{{ suffix }}</span>
        </div>
        <div v-if="description || $slots.default" class="fc-statistic-description">
            <slot>
                {{ description }}
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 声明 props  
const props = defineProps({
    title: {
        type: String,
        required: true,
        default: ""
    },
    value: {
        type: String,
        required: true,
        default: ""
    },
    prefix: {
        type: String,
        default: ""
    },
    suffix: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    tips: {
        type: String,
        default: ""
    },
    groupSeparator: {
        type: Boolean,
        default: false
    }
})

const groupSeparator = (num: number | string): string => {
    const numStr = typeof num === 'number' ? num.toString() : num;
    const [integerPart, decimalPart = ''] = numStr.split('.');
    const formattedIntegerPart = integerPart.replace(/(\d)(?=(\d{3})+$)/g, '$&,').replace(/,$/, '');
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
}

// 计算属性  
const cmtValue = computed(() => {
    return props.groupSeparator ? groupSeparator(props.value) : props.value
})  
</script>

<style scoped>
.fc-statistic-title {
    font-size: 13px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}

.fc-statistic-tips {
    margin-left: 5px;
}

.fc-statistic-content {
    font-size: 20px;
}

.fc-statistic-content-value {
    font-weight: bold;
}

.fc-statistic-content-prefix {
    margin-right: 5px;
}

.fc-statistic-content-suffix {
    margin-left: 5px;
    font-size: 13px;
}

.fc-statistic-description {
    margin-top: 10px;
    color: #999;
}

.dark .fc-statistic-content {
    color: #fff;
}
</style>
