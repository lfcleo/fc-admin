<!--
* @Description: 查询组件
* @Version: 1.0.0
* @Author: Leo https://github.com/lfcleo
* @Date: 2024-06-18 12:55:32
* @LastEditTime: 2024-06-18 12:55:32
-->
<template>
    <el-form :inline="true" :model="form" style="width: 100%;">
        <el-row>
            <el-col :sm="12" :md="8" :lg="6" v-for="(item, index) in formItems.slice(
        0,
        conditionFold ? showItemLength : formItems.length
    )" :key="index">
                <el-form-item :label="item.label + '：'" :prop="`[${index}]value`">
                    <template v-if="item.type == 'input'">
                        <el-input v-model="form[item.field]" :placeholder="item.placeholder || '请输入' + item.label"
                            :options="item.options" @keyup.enter="onEnterKey" clearable></el-input>
                    </template>
                    <template v-else-if="item.type == 'select'">
                        <el-select :style="{ width: '100%' }" v-model="form[item.field]"
                            :placeholder="item.placeholder || '请选择' + item.label" :multiple="item.selectMultiple"
                            clearable>
                            <el-option v-for="option in item.options" :key="option.value" :label="option.label"
                                :value="option.value" />
                        </el-select>
                    </template>
                    <template v-if="item.type == 'date'">
                        <el-date-picker v-model="form[item.field]" :placeholder="item.placeholder || '请选择' + item.label"
                            :type="item.dateType" :value-format="item.dateFormat || 'YYYY-MM-DD'"
                            :shortcuts="item.dateShortcuts" :disabled-date="item.dateDisabled"
                            :default-value="item.dateDefaultValue" :default-Time="item.dateDefaultTime" />
                    </template>
                </el-form-item>
            </el-col>
            <el-col :sm="12" :md="8" :lg="6">
                <el-form-item>
                    <el-button type="primary" icon="Search" @click="search">搜索</el-button>
                    <el-button @click="reset">重置</el-button>
                    <el-button v-if="formItems.length > showItemLength" type="primary" link @click="areConditionFold">
                        {{ conditionFold ? '展开' : '收起' }}
                        <el-icon v-if="conditionFold">
                            <ArrowDown />
                        </el-icon>
                        <el-icon v-else>
                            <ArrowUp />
                        </el-icon>
                    </el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { ElInput } from 'element-plus';

// 查询组件类型,输入框/下拉选择器/日期选择器/日期范围选择器
type queryItemType = "input" | "select" | "date";

interface queryItemModel {
    type: queryItemType,
    label: string,
    field: string,
    placeholder?: string,
    options?: Array<{ label: string, value: string | number }>,  // select数据，仅type=select有效
    selectMultiple?: boolean,                                    // select是否多选，仅type=select有效
    dateType?: string,      // 日期选择器类型，'year' | 'years' |'month' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange'
    dateFormat?: string,    // 日期格式，"YYYY-MM-DD hh:mm:ss"这种，默认"YYYY-MM-DD"
    dateShortcuts?: [],     // 日期快捷选项。
    dateDisabled?: (data: Date) => boolean,
    dateDefaultValue?: Date, // 日期默认值，new Date()类型
    dateDefaultTime?: Date,  // 显示日期默认时间，new Date()类型
}

interface FcQueryProps {
    formItems: queryItemModel[],
    showItemLength?: number;
}

const props = withDefaults(defineProps<FcQueryProps>(), {
    showItemLength: 3,
});

const emit = defineEmits(['search', 'reset', 'enterKey']);

const conditionFold = ref(true)
const form = ref<Record<string, any>>({});

props.formItems.forEach(item => {
    form.value[item.field] = '';
});

const search = () => {
    emit('search', form.value);
};

const reset = () => {
    props.formItems.forEach(item => {
        form.value[item.field] = '';
    });
    emit('reset');
};

const onEnterKey = () => {
    emit('enterKey', form.value);
};

const areConditionFold = () => {
    conditionFold.value = !conditionFold.value
}
</script>

<style scoped>
.el-form-item {
    display: flex;
}
</style>