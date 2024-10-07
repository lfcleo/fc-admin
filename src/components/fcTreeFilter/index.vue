<!--
* @Description: 树形筛选器
* @Version: 1.0.0
* @Author: Leo https://github.com/lfcleo
* @Date: 2024-06-11 13:01:32
* @LastEditTime: 2024-06-11 13:01:32
-->
<template>
    <div class="card filter" :style="{ border: border ? `1px solid var(--el-border-color-light)` : `0px` }">
        <h4 v-if="title" class="title">
            {{ title }}
        </h4>
        <el-input v-if="showSearch" v-model="filterText" placeholder="输入关键字进行过滤" clearable />
        <el-scrollbar :style="{ height: title || showSearch ? `calc(100% - 95px)` : `100%` }" v-loading="loading">
            <el-tree ref="treeRef" default-expand-all :node-key="name" :data="multiple ? treeData : treeAllData"
                :show-checkbox="multiple" :check-strictly="checkStrictly" :current-node-key="!multiple ? selected : ''"
                :highlight-current="!multiple" :expand-on-click-node="false" :check-on-click-node="multiple"
                :props="treeProps" :filter-node-method="filterNode" :default-checked-keys="multiple ? selected : []"
                @node-click="handleNodeClick" @check="handleCheckChange">
                <template #default="scope">
                    <div class="custom-tree-node">
                        <span class="el-tree-node__label">
                            <slot :row="scope">
                                {{ scope.node.label }}
                            </slot>
                        </span>
                        <span style="margin-left: 30px;margin-right: 8px;">
                            <slot name="option" :row="scope"></slot>
                        </span>
                    </div>
                </template>
            </el-tree>
        </el-scrollbar>
    </div>
</template>

<script setup lang='ts'>
import { ref, watch, onBeforeMount, nextTick } from "vue";
import { ElTree } from "element-plus";

// 接收父组件参数并设置默认值
interface TreeFilterProps {
    requestApi?: (data?: any) => Promise<any>;  // 请求分类数据的 api ==> 非必传
    data?: { [key: string]: any }[];            // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
    title?: string;                             // treeFilter 标题 ==> 非必传
    border?: boolean;                           // 是否显示边框
    name?: string;                              // 选择的id ==> 非必传，默认为 “id”
    multiple?: boolean;                         // 是否为多选 ==> 非必传，默认为 false
    defaultValue?: any;                         // 默认选中的值 ==> 非必传
    showSearch?: boolean;                       // 是否显示搜索框 ==> 默认不显示
    showAll?: boolean;                          // 是否显示选择全部 ==> 默认显示
    treeProps?: any;
}
const props = withDefaults(defineProps<TreeFilterProps>(), {
    name: "id",
    border: false,
    multiple: false,
    showSearch: false,
    showAll: true,
    treeProps: {
        children: "children",
        label: "label",
    }
});

const loading = ref(false)
const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = ref<{ [key: string]: any }[]>([]);
const treeAllData = ref<{ [key: string]: any }[]>([]);

const selected = ref();
const checkStrictly = ref(false);
const setSelected = () => {
    if (props.multiple) {
        selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
    } else {
        selected.value = typeof props.defaultValue === "number" ? props.defaultValue : 0;
    }
};

onBeforeMount(() => {
    setSelected();
    if (props.requestApi) {
        getData()
    }
});

// 获取数据
const getData = async () => {
    try {
        loading.value = true
        const { data } = await props.requestApi!();
        treeData.value = data;
        if (props.showAll) {
            treeAllData.value = [{ id: 0, [props.treeProps.label]: "全部" }, ...data];
        } else {
            treeAllData.value = [...data];
        }
        loading.value = false
    } catch (error) {
        loading.value = false
    }
}

// 使用 nextTick 防止打包后赋值不生效，开发环境是正常的
watch(
    () => props.defaultValue,
    () => nextTick(() => setSelected()),
    { deep: true, immediate: true }
);

watch(
    () => props.data,
    () => {
        if (props.data?.length) {
            treeData.value = props.data;
            if (props.showAll) {
                treeAllData.value = [{ id: 0, [props.treeProps.label]: "全部" }, ...props.data];
            } else {
                treeAllData.value = [...props.data];
            }
        }
    },
    { deep: true, immediate: true }
);

const filterText = ref("");
watch(filterText, val => {
    treeRef.value!.filter(val);
});

// 过滤
const filterNode = (value: string, _data: { [key: string]: any }, node: any) => {
    if (!value) return true;
    let parentNode = node.parent,
        labels = [node.label],
        level = 1;
    while (level < node.level) {
        labels = [...labels, parentNode.label];
        parentNode = parentNode.parent;
        level++;
    }
    return labels.some(label => label.indexOf(value) !== -1);
};

// emit
const emit = defineEmits<{
    change: [value: any];
    selectClick: [value: any];
}>();

// 单选
const handleNodeClick = (data: { [key: string]: any }) => {
    if (props.multiple) return;
    // emit("change", data[props.name]);
    emit("selectClick", data);
};

// 多选
const handleCheckChange = () => {
    emit("change", treeRef.value?.getCheckedKeys());
};

// 暴露给父组件使用
defineExpose({ treeData, treeAllData, treeRef, getData, checkStrictly, loading });
</script>

<style scoped lang="scss">
.card {
    box-sizing: border-box;
    padding: 20px;
    overflow-x: hidden;
    background-color: var(--el-bg-color);
    border-radius: 6px;
    box-shadow: 0 0 12px rgb(0 0 0 / 5%);
}

.filter {
    box-sizing: border-box;
    height: 100%;
    padding: 18px;
    // margin-right: 10px;

    .title {
        margin: 0 0 15px;
        font-size: 18px;
        font-weight: bold;
        color: var(--el-color-info-dark-2);
        letter-spacing: 0.5px;
    }

    .el-input {
        margin: 0 0 15px;
    }

    .el-scrollbar {
        :deep(.el-tree) {
            height: 80%;
            overflow: auto;

            .el-tree-node__content {
                height: 33px;
            }
        }

        :deep(.el-tree--highlight-current) {
            .el-tree-node.is-current>.el-tree-node__content {
                background-color: var(--el-color-primary-light-7);

                .is-leaf {
                    color: transparent;
                }
            }
        }
    }
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>