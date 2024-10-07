<!--
* @Description: 图标选择器
* @Version: 1.0.0
* @Author: Leo https://github.com/lfcleo
* @Date: 2024-06-09 10:23:33
* @LastEditTime: 2024-06-09 10:23:33
-->
<template>
    <div class="fc-icon-select">
        <div class="fc-icon-select__wrapper" :class="{ 'hasValue': selectValue }" @click="open">
            <el-input :prefix-icon="selectValue" v-model="selectValue" :disabled="disabled" readonly
                v-if="selectValue"></el-input>
            <el-input :disabled="disabled" readonly v-else>
                <template #prefix>无</template>
            </el-input>
        </div>
        <el-dialog title="图标选择器" v-model="dialogVisible" :width="760" :close-on-click-modal="false" destroy-on-close
            append-to-body>
            <div class="fc-icon-select__dialog" style="margin: 10px 0 10px 0;">
                <el-form :rules="{}">
                    <el-form-item prop="searchText">
                        <el-input class="fc-icon-select__search-input" prefix-icon="Search" v-model="searchText"
                            placeholder="搜索" size="large" clearable />
                    </el-form-item>
                </el-form>
                <el-tabs @tab-change="handleTabChange">
                    <el-tab-pane v-for="(item, index) in tabs" :key="item" lazy>
                        <template #label>
                            {{ item }}
                            <el-tag size="small" type="info" v-if="!searchText">
                                {{ selectTabIndex == index ? data.length : dataList[index].length }}
                            </el-tag>
                        </template>
                        <div class="fc-icon-select__list">
                            <el-scrollbar>
                                <ul @click="selectIcon">
                                    <el-empty v-if="data.length == 0" :image-size="100" description="未查询到相关图标" />
                                    <li v-for="icon in data" :key="icon">
                                        <span :data-icon="icon"></span>
                                        <component :is="icon" />
                                    </li>
                                </ul>
                            </el-scrollbar>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <template #footer>
                <el-button @click="clear" text>清除</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed, watch } from 'vue'
import { tabs, dataList } from './config'

interface iconSelectProps {
    modelValue?: string;
    disabled?: boolean;
}

const props = withDefaults(defineProps<iconSelectProps>(), {
    modelValue: '',
    disabled: false,
});

const selectValue = ref(props.modelValue);
const dialogVisible = ref(false);
const searchText = ref('');
const selectTabIndex = ref(0);
const emit = defineEmits(['update:modelValue']);

watch(props, ({ modelValue }) => {
    selectValue.value = modelValue;
}, { immediate: true });

watch(selectValue, (val) => {
    emit('update:modelValue', val);
});

// 防止tab切换选择图标后，关闭再打开图标列表不更新情况
watch(dialogVisible, () => {
    selectTabIndex.value = 0
})

const open = () => {
    if (props.disabled) {
        return;
    }
    dialogVisible.value = true;
};

const handleTabChange = (tabName: string | number) => {
    selectTabIndex.value = tabName as number
};

const selectIcon = (e: MouseEvent) => {
    if (!e.target) return
    selectValue.value = (e.target as HTMLSpanElement).dataset.icon as string;
    emit('update:modelValue', selectValue.value);
    selectValue.value = "";
    dialogVisible.value = false;

};

// 清除选中的图标
const clear = () => {
    selectValue.value = "";
    dialogVisible.value = false;
};

// 图标数据，根据搜索字符串筛选
const data = computed(() => {
    if (!searchText.value) {
        return dataList[selectTabIndex.value];
    } else {
        const filteredArray = dataList[selectTabIndex.value].filter((str: string) => str.toLowerCase().includes(searchText.value.toLowerCase()));
        return filteredArray
    }
});

</script>

<style scoped>
.fc-icon-select {
    display: inline-flex;
}

.fc-icon-select__wrapper {
    cursor: pointer;
    display: inline-flex;
}

.fc-icon-select__wrapper:deep(.el-input__wrapper).is-focus {
    box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset;
}

.fc-icon-select__wrapper:deep(.el-input__inner) {
    flex-grow: 0;
    width: 0;
}

.fc-icon-select__wrapper:deep(.el-input__icon) {
    margin: 0;
    font-size: 16px;
}

.fc-icon-select__wrapper.hasValue:deep(.el-input__icon) {
    color: var(--el-text-color-regular);
}

.fc-icon-select__list {
    height: 270px;
    overflow: auto;
}

.fc-icon-select__list li {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 5px;
    padding: 25px;
    vertical-align: top;
    transition: all 0.1s;
    border-radius: 4px;
    position: relative;

    &:hover {
        transform: scale(0.88);
    }
}

.fc-icon-select__list li span {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    cursor: pointer;
}

.fc-icon-select__list li i {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 26px;
    color: #6d7882;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
}

.fc-icon-select__list li:hover {
    box-shadow: 0 0 1px 4px var(--el-color-primary);
    background: var(--el-color-primary-light-9);
}

.fc-icon-select__list li:hover i {
    color: var(--el-color-primary);
}
</style>